import { times, each as _each } from 'async';
import { v4 } from 'uuid';
import { logger } from './helper';
import { getInstance, isJvmCreated, addOption, events } from './jinst';
import {
  getConnection,
  getConnectionSync,
  registerDriver,
} from './drivermanager';
import { DataSource } from './datasource';
import { Connection } from './connection';

const java = getInstance();

if (!isJvmCreated()) {
  addOption('-Xrs');
}

function isDS(drivername: string) {
  return drivername.toLowerCase().includes('datasource');
}

export class Pool {
  url: string;
  user: string;
  password: string;
  props: any;
  drivername: string;
  minpoolsize: number;
  maxpoolsize: number;
  keepalive: {
    interval: number;
    query: string;
    enabled: boolean;
  };
  maxidle: number;
  logging: any;
  pool: any;
  reserved: any;

  constructor(config: {
    url: any;
    user?: string;
    password?: string;
    drivername?: string;
    minpoolsize?: number;
    maxpoolsize?: number;
    maxidle?: number;
    properties?: object;
    keepalive?: {
      interval: number;
      query: string;
      enabled: boolean;
    };
    logging?: any;
  }) {
    this.url = config.url;
    this.props = (function (config) {
      const Properties = java.import('java.util.Properties');
      const properties = new Properties();

      for (const name in config.properties) {
        properties.putSync(name, config.properties[name]);
      }

      // NOTE: https://docs.oracle.com/javase/7/docs/api/java/util/Properties.html#getProperty(java.lang.String)
      // if property does not exist it returns 'null' in the new java version, so we can check to support
      // older versions as well
      if (config.user && !properties.getPropertySync('user')) {
        properties.putSync('user', config.user);
      }

      if (config.password && !properties.getPropertySync('password')) {
        properties.putSync('password', config.password);
      }

      return properties;
    })(config);
    this.user = config.user ? config.user : '';
    this.password = config.password ? config.password : '';
    this.drivername = config.drivername ? config.drivername : '';
    this.minpoolsize = config.minpoolsize ? config.minpoolsize : 1;
    this.maxpoolsize = config.maxpoolsize ? config.maxpoolsize : 1;
    this.keepalive = config.keepalive
      ? config.keepalive
      : {
          interval: 60000,
          query: 'select 1',
          enabled: false,
        };
    this.maxidle = (!this.keepalive.enabled && config.maxidle) || null;
    this.logging = config.logging
      ? config.logging
      : {
          level: 'error',
        };
    this.pool = [];
    this.reserved = [];
  }
  status() {
    const status: any = {};
    return new Promise((resolve) => {
      status.available = this.pool.length;
      status.reserved = this.reserved.length;
      status.pool = connStatus([], this.pool);
      status.rpool = connStatus([], this.reserved);
      return resolve(status);
    });
  }

  keepaliveConnection(conn, query) {
    conn.createStatement((err, statement) => {
      if (err) return logger.error(err);
      statement.execute(query, (err) => {
        if (err) return logger.error(err);
        logger.silly('%s - Keep-Alive', new Date().toUTCString());
      });
    });
  }

  addConnection(callback) {
    if (isDS(this.drivername)) {
      const conn = new DataSource(
        this.drivername,
        this.url,
        this.user,
        this.password,
      ).getConnectionDS();
      const connobj = {
        uuid: v4(),
        conn: new Connection(conn),
        keepalive: this.keepalive.enabled
          ? setInterval(
              this.keepaliveConnection,
              this.keepalive.interval,
              conn,
              this.keepalive.query,
            )
          : false,
        lastIdle: this.maxidle ? new Date().getTime() : null,
      };

      return callback(null, connobj);
    }
    getConnection(this.url, this.props, (err, conn) => {
      if (err) {
        return callback(err);
      }
      const connobj = {
        uuid: v4(),
        conn: new Connection(conn),
        keepalive: this.keepalive.enabled
          ? setInterval(
              this.keepaliveConnection,
              this.keepalive.interval,
              conn,
              this.keepalive.query,
            )
          : false,
        lastIdle: this.maxidle ? new Date().getTime() : null,
      };

      return callback(null, connobj);
    });
  }

  addConnectionSync() {
    const conn = isDS(this.drivername)
      ? new DataSource(
          this.drivername,
          this.url,
          this.user,
          this.password,
        ).getConnectionDS()
      : getConnectionSync(this.url, this.props);
    const connobj = {
      uuid: v4(),
      conn: new Connection(conn),
      keepalive: this.keepalive.enabled
        ? setInterval(
            this.keepaliveConnection,
            this.keepalive.interval,
            conn,
            this.keepalive.query,
          )
        : false,
      lastIdle: this.maxidle ? new Date().getTime() : null,
    };

    return connobj;
  }

  _addConnectionsOnInitialize() {
    return new Promise((resolve, reject) => {
      times(
        this.minpoolsize,
        (n, next) => {
          this.addConnection((err, conn) => {
            next(err, conn);
          });
        },
        (err, conns) => {
          if (err) {
            return reject(err);
          }
          conns.forEach((conn) => {
            this.pool.push(conn);
          });
          return resolve(null);
        },
      );
    });
  }
  initialize(callback) {
    logger.level = this.logging.level;

    // If a drivername is supplied, initialize the via the old method,
    // Class.forName()
    if (this.drivername && !isDS(this.drivername)) {
      java.newInstance(this.drivername, (err, driver) => {
        if (err) {
          return callback(err);
        }
        registerDriver(driver, (err) => {
          if (err) {
            return callback(err);
          }
          this._addConnectionsOnInitialize();
        });
      });
    } else {
      this._addConnectionsOnInitialize();
    }

    events.emit('initialized');
  }
  reserve(): Promise<any> {
    let conn = null;
    return new Promise((resolve, reject) => {
      this._closeIdleConnections();

      if (this.pool.length > 0) {
        conn = this.pool.shift();

        if (conn.lastIdle) {
          conn.lastIdle = new Date().getTime();
        }

        this.reserved.unshift(conn);
      } else if (this.reserved.length < this.maxpoolsize) {
        try {
          conn = this.addConnectionSync();
          this.reserved.unshift(conn);
        } catch (err) {
          logger.error(err);
          conn = null;
          return reject(err);
        }
      }

      if (conn === null) {
        reject(new Error('No more pool connections available'));
      } else {
        resolve(conn);
      }
    });
  }
  _closeIdleConnections() {
    if (!this.maxidle) {
      return;
    }

    closeIdleConnectionsInArray(this.pool, this.maxidle);
    closeIdleConnectionsInArray(this.reserved, this.maxidle);
  }
  release(conn) {
    return new Promise((resolve, reject) => {
      if (typeof conn === 'object') {
        const { uuid } = conn;
        this.reserved = this.reserved.filter((c) => c.uuid !== uuid);

        if (conn.lastIdle) {
          conn.lastIdle = new Date().getTime();
        }

        this.pool.unshift(conn);
        return resolve(null);
      }
      return reject(new Error('INVALID CONNECTION'));
    });
  }
  purge() {
    const conns = this.pool.concat(this.reserved);

    return new Promise((resolve) => {
      _each(
        conns,
        (conn, done) => {
          if (typeof conn === 'object' && conn.conn !== null) {
            conn.conn.close(() => {
              // we don't want to prevent other connections from being closed
              done();
            });
          } else {
            done();
          }
        },
        () => {
          this.pool = [];
          this.reserved = [];

          resolve(void 0);
        },
      );
    });
  }
}

const connStatus = function (acc, pool) {
  acc = pool.reduce((conns, connobj) => {
    const { conn } = connobj;
    const closed = conn.isClosedSync();
    const readonly = conn.isReadOnlySync();
    const valid = conn.isValidSync(1000);
    conns.push({
      uuid: connobj.uuid,
      closed,
      readonly,
      valid,
    });
    return conns;
  }, acc);
  return acc;
};

function closeIdleConnectionsInArray(array, maxIdle) {
  const time = new Date().getTime();
  const maxLastIdle = time - maxIdle;

  for (let i = array.length - 1; i >= 0; i--) {
    const conn = array[i];
    if (typeof conn === 'object' && conn.conn !== null) {
      if (conn.lastIdle < maxLastIdle) {
        conn.conn.close(() => {});
        array.splice(i, 1);
      }
    }
  }
}
