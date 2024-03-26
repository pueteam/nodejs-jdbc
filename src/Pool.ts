import { v4 as uuidv4 } from 'uuid';
import { logger } from './Helper';
import { getInstance, isJvmCreated, addOption, events } from './jinst';
import {
  getConnection,
  getConnectionSync,
  registerDriver,
} from './DriverManager';
import { DataSource } from './DataSource';
import { Connection } from './Connection';

const java = getInstance();

if (!isJvmCreated()) {
  addOption('-Xrs');
}

function isDS(drivername: string) {
  return drivername.toLowerCase().includes('datasource');
}

function setProperties(config: IJDBConfig) {
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
}

export interface ConnObj {
  uuid: string;
  conn: Connection;
  keepalive: boolean;
  lastIdle: number;
}

export interface IJDBConfig {
  url: any;
  user?: string;
  password?: string;
  drivername?: string;
  minpoolsize?: number;
  maxpoolsize?: number;
  maxidle?: number;
  properties?: object;
  props?: object;
  keepalive?: {
    interval: number;
    query: string;
    enabled: boolean;
  };
  logging?: any;
}

export class Pool {
  private config: IJDBConfig;
  pool: any;
  reserved: any;

  constructor(config: IJDBConfig) {
    this.validateConfig(config);
    this.pool = [];
    this.reserved = [];
  }

  validateConfig(config: IJDBConfig) {
    this.config = config;
    this.config.props = setProperties(config);
    this.config.user = config.user ? config.user : '';
    this.config.password = config.password ? config.password : '';
    this.config.drivername = config.drivername ? config.drivername : '';
    this.config.minpoolsize = config.minpoolsize ? config.minpoolsize : 1;
    this.config.maxpoolsize = config.maxpoolsize ? config.maxpoolsize : 1;
    this.config.keepalive = config.keepalive
      ? config.keepalive
      : {
          interval: 60000,
          query: 'select 1',
          enabled: false,
        };
    this.config.maxidle =
      (!this.config.keepalive.enabled && config.maxidle) || null;
    this.config.logging = config.logging
      ? config.logging
      : {
          level: 'error',
        };
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

  keepaliveConnection(conn: Connection, query: string) {
    conn
      .createStatement()
      .then((statement) => {
        statement
          .execute(query)
          .then(() => {
            logger.silly('%s - Keep-Alive', new Date().toUTCString());
          })
          .catch((err) => {
            logger.error('Error executing query' + err);
          });
      })
      .catch((error) => {
        logger.error('Error creating statement' + error);
      });
  }

  addConnection(): Promise<any> {
    return new Promise((resolve) => {
      if (isDS(this.config.drivername)) {
        const conn = new DataSource(
          this.config.drivername,
          this.config.url,
          this.config.user,
          this.config.password,
        ).getConnectionDS();
        const c = new Connection(conn);
        const connobj = {
          uuid: uuidv4(),
          conn: c,
          keepalive: this.config.keepalive.enabled
            ? setInterval(
                this.keepaliveConnection,
                this.config.keepalive.interval,
                c,
                this.config.keepalive.query,
              )
            : false,
          lastIdle: this.config.maxidle ? new Date().getTime() : null,
        };

        return resolve(connobj);
      }
      const conn = getConnectionSync(this.config.url, this.config.props);
      const c = new Connection(conn);
      const connobj = {
        uuid: uuidv4(),
        conn: c,
        keepalive: this.config.keepalive.enabled
          ? setInterval(
              this.keepaliveConnection,
              this.config.keepalive.interval,
              c,
              this.config.keepalive.query,
            )
          : false,
        lastIdle: this.config.maxidle ? new Date().getTime() : null,
      };

      return resolve(connobj);
    });
  }

  addConnectionSync() {
    const conn = isDS(this.config.drivername)
      ? new DataSource(
          this.config.drivername,
          this.config.url,
          this.config.user,
          this.config.password,
        ).getConnectionDS()
      : getConnectionSync(this.config.url, this.config.props);
    const c = new Connection(conn);
    const connobj = {
      uuid: uuidv4(),
      conn: c,
      keepalive: this.config.keepalive.enabled
        ? setInterval(
            this.keepaliveConnection,
            this.config.keepalive.interval,
            c,
            this.config.keepalive.query,
          )
        : false,
      lastIdle: this.config.maxidle ? new Date().getTime() : null,
    };

    return connobj;
  }

  _addConnectionsOnInitialize() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.config.minpoolsize; i++) {
        this.addConnection()
          .then((conn: ConnObj) => {
            this.pool.push(conn);
          })
          .catch((err) => {
            return reject(err);
          });
      }
      resolve(null);
    });
  }
  async initialize(): Promise<any> {
    logger.level = this.config.logging.level;
    if (this.config.drivername && !isDS(this.config.drivername)) {
      const driver = await java.newInstancePromise(this.config.drivername);
      await registerDriver(driver);
    } else {
      await this._addConnectionsOnInitialize();
    }
    events.emit('initialized');
  }
  reserve(): Promise<ConnObj> {
    let conn = null;
    return new Promise((resolve, reject) => {
      this._closeIdleConnections();

      if (this.pool.length > 0) {
        conn = this.pool.shift();

        if (conn.lastIdle) {
          conn.lastIdle = new Date().getTime();
        }

        this.reserved.unshift(conn);
      } else if (this.reserved.length < this.config.maxpoolsize) {
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
    if (!this.config.maxidle) {
      return;
    }

    closeIdleConnectionsInArray(this.pool, this.config.maxidle);
    closeIdleConnectionsInArray(this.reserved, this.config.maxidle);
  }
  release(conn: ConnObj) {
    return new Promise((resolve, reject) => {
      if (typeof conn === 'object') {
        const { uuid } = conn;
        this.reserved = this.reserved.filter((c: ConnObj) => c.uuid !== uuid);

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
      for (const conn of conns) {
        if (typeof conn === 'object' && conn.conn !== null) {
          conn.conn.close();
        }
      }

      this.pool = [];
      this.reserved = [];

      resolve(void 0);
    });
  }
}

const connStatus = function (acc, pool) {
  acc = pool.reduce((conns, connobj: ConnObj) => {
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

function closeIdleConnectionsInArray(array: Array<ConnObj>, maxIdle: number) {
  const time = new Date().getTime();
  const maxLastIdle = time - maxIdle;

  for (let i = array.length - 1; i >= 0; i--) {
    const conn = array[i];
    if (typeof conn === 'object' && conn.conn !== null) {
      if (conn.lastIdle < maxLastIdle) {
        conn.conn.close();
        array.splice(i, 1);
      }
    }
  }
}
