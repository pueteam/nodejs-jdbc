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
import { ConnObj } from 'src/Pool';
import { Statement } from 'src/Statement';

const config = {
  url: 'jdbc:sqlite:tests/sample.db',
  user: 'SA',
  password: '',
};

let connobj: ConnObj;
let statement: Statement;
let db: JDBC;

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
    db = new JDBC(config);
    expect(db).toBeDefined();
    await db.initialize();
    connobj = await db.reserve();
  });

  it('should be able to get the status of a JDBC connection', async () => {
    if (!isJvmCreated()) {
      addOption('-Xrs');
      setupClasspath([
        './drivers/sqlite-jdbc.jar',
        './drivers/slf4j-api-1.7.36.jar',
      ]);
    }
    const status = await db.status();
    expect(status).toBeDefined();
  });

  it('should be able to select some values', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    const status = conn.isValidSync(1500);
    expect(status).toBe(true);

    statement = await conn.createStatement();
    expect(statement).toBeDefined();

    const rs = await statement.executeQuery('select id from test where id = 1');
    expect(rs).toBeDefined();
    const result: any[] = rs.toObjArray();
    expect(result[0].id).toBe(1);
  });

  it('should be able to use execute', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    statement = await conn.createStatement();
    expect(statement).toBeDefined();

    const rs = await statement.execute('select id from test where id = 1');
    expect(rs).toBe(true);
  });

  it('should be able to update a value', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    statement = await conn.createStatement();
    expect(statement).toBeDefined();

    const rs = await statement.executeUpdate(
      'update test set id = 2 where id = 2',
    );
    expect(rs).toBe(0);
  });

  it('should be able to insert a value', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    statement = await conn.createStatement();
    expect(statement).toBeDefined();

    const rs = await statement.executeUpdate('insert into test (id) values(3)');
    expect(rs).toBe(1);
  });

  it('should be able to delete a value', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    statement = await conn.createStatement();
    expect(statement).toBeDefined();

    const rs = await statement.executeUpdate('delete from test where id = 3');
    expect(rs).toBe(1);
  });

  it('should be able to get some database metadata', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();
    const dmb = await conn.getMetaData();
    expect(dmb).toBeDefined();
    const schemas = await dmb.getSchemas();
    expect(schemas).toBeDefined();
    expect(schemas.toObjArray().length).toBe(0);
    const tables = await dmb.getTables(null, null, 'test');
    expect(tables).toBeDefined();
    expect(tables.toObjArray().length).toBe(1);
    const columns = await dmb.getColumns(null, null, 'test', null);
    expect(columns).toBeDefined();
    const c: any[] = columns.toObjArray();
    expect(c[0].COLUMN_NAME).toBe('id');
    expect(c[0].DATA_TYPE).toBe(4);
    expect(c[0].TYPE_NAME).toBe('INTEGER');
    expect(c[0].COLUMN_SIZE).toBe(2000000000);
    expect(c[0].DECIMAL_DIGITS).toBe(0);
    expect(c[0].IS_NULLABLE).toBe('YES');
    expect(c[0].IS_AUTOINCREMENT).toBe('NO');
    expect(c[0].IS_GENERATEDCOLUMN).toBe('NO');
  });

  it('should be able to insert a value using prepared statements', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    const pstatement = await conn.prepareStatement(
      'insert into test (id) values(?)',
    );
    expect(pstatement).toBeDefined();

    pstatement.setInt(1, 4);
    pstatement.addBatch();
    pstatement.setInt(1, 5);
    pstatement.addBatch();

    const rs = await pstatement.executeBatch();
    expect(rs).toBeUndefined();
  });

  it('should be able to delete a value generated using prepared statements', async () => {
    const { conn } = connobj;
    expect(conn).toBeDefined();

    const pstatement = await conn.prepareStatement(
      'delete from test where id = ?',
    );
    expect(pstatement).toBeDefined();

    pstatement.setInt(1, 4);
    pstatement.addBatch();
    pstatement.setInt(1, 5);
    pstatement.addBatch();
    const rs = await pstatement.executeBatch();
    expect(rs).toBeUndefined();
  });

  it('should be able to release the connection', async () => {
    // Release the connection)

    db.release(connobj);
    const { conn } = connobj;
    await conn.close();
    expect(conn.isClosedSync()).toBe(true);

    db.purge();
  });
});
