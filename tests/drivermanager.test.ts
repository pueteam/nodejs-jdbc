import {
  getConnection,
  getConnectionSync,
  getLoginTimeout,
  setLoginTimeout,
} from '../src/DriverManager';
import {
  isJvmCreated,
  addOption,
  setupClasspath,
  getInstance,
} from '../src/jinst';

const config = {
  url: 'jdbc:sqlite:sample.db',
  user: 'SA',
  password: '',
  drivername: 'org.sqlite.JDBC',
};

const java = getInstance();

describe('DriverManager', () => {
  beforeAll(() => {
    if (!isJvmCreated()) {
      addOption('-Xrs');
      setupClasspath([
        './drivers/sqlite-jdbc.jar',
        './drivers/slf4j-api-1.7.36.jar',
      ]);
    }
  });

  it('should be able to get a connection', () => {
    getConnection(config.url, config.user, (err, conn) => {
      expect(conn).toBeDefined();
      expect(err).toBeNull();
    });
  });

  it('should be able to get a connection with properties', () => {
    const Properties = java.import('java.util.Properties');
    const props = new Properties();
    props.putSync('user', config.user);
    props.putSync('password', config.password);
    getConnection(config.url, props, (err, conn) => {
      expect(conn).toBeDefined();
      expect(err).toBeNull();
    });
  });

  it('should be able to get a connection synchronously', () => {
    const Properties = java.import('java.util.Properties');
    const props = new Properties();
    props.putSync('user', config.user);
    props.putSync('password', config.password);
    const conn = getConnectionSync(config.url, props);
    expect(conn).toBeDefined();
  });

  it('should be able to set the login timeout', () => {
    const seconds = 60;
    setLoginTimeout(seconds, (err, result) => {
      expect(result).toBe(true);
      expect(err).toBeNull();
    });
  });

  it('should be able to get the login timeout', () => {
    getLoginTimeout((err, seconds) => {
      expect(err).toBeNull();
      expect(seconds).toBeDefined();
    });
  });
  /*
  it('should be able to register a driver', () => {
    const driver = 'org.sqlite.JDBC';
    registerDriver(driver, (err, result) => {
      expect(result).toBe(true);
      expect(err).toBeNull();
    });
  });
*/
});
