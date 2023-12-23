import {
  isJvmCreated,
  addOption,
  setupClasspath,
  getInstance,
  getClasspath,
  events,
  getOptions,
  getOnJvmCreated,
} from '../src/jinst';

import { JDBC } from '../src/jdbc';

const config = {
  url: 'jdbc:sqlite:sample.db',
  user: 'SA',
  password: '',
  drivername: 'org.sqlite.JDBC',
};

// Tests
describe('jinst', () => {
  it('should be able to determine if the JVM is created', () => {
    expect(isJvmCreated()).toBe(false);
  });

  it('should be able to add an option to the JVM', () => {
    addOption('-Xrs');
    expect(getOptions()).toContain('-Xrs');
  });

  it('should be able to add an entry to the classpath', () => {
    setupClasspath([
      './drivers/sqlite-jdbc.jar',
      './drivers/slf4j-api-1.7.36.jar',
    ]);
    expect(getClasspath()).toContain('./drivers/sqlite-jdbc.jar');
  });

  it('should be able to get the Java instance', () => {
    const java = getInstance();
    expect(java).toBeDefined();
  });

  it('should be able to emit events', () => {
    events.on('jvmCreated', () => {
      // Do something
    });

    // Trigger the event
    getOnJvmCreated();

    // Verify that the event was emitted
    expect(events.listenerCount('jvmCreated')).toBe(1);
  });

  it('should be able to create a JDBC connection', async () => {
    if (!isJvmCreated()) {
      addOption('-Xrs');
      setupClasspath([
        './drivers/sqlite-jdbc.jar',
        './drivers/slf4j-api-1.7.36.jar',
      ]);
    }
    const db = new JDBC(config);
    expect(db).toBeDefined();
    const connobj = await db.reserve();

    const { conn } = connobj;
    expect(conn).toBeDefined();

    const statement = await conn.createStatement();
    expect(statement).toBeDefined();

    const result = await statement.executeQuery('select 1');
    expect(result).toBeDefined();

    // Release the connection)

    db.release(connobj);
    expect(conn.isClosedSync()).toBe(false);

    db.purge();
  });
});
