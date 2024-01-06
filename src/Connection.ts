import { CallableStatement, ICallableStatement } from './CallableStatement';
import { getInstance, isJvmCreated, addOption } from './jinst';
import { IPreparedStatement, PreparedStatement } from './PreparedStatement';
import { IStatement, Statement } from './Statement';
import { SQLWarning } from './sqlwarning';
import { DatabaseMetaData } from './DatabaseMetadata';
import PromisifyAll from './PromisifyAll';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const java = getInstance();

if (!isJvmCreated()) {
  addOption('-Xrs');
}

export interface IConnection {
  abortAsync(executor: any): Promise<any>;
  clearWarningsSync(): void;
  closeAsync(): Promise<void>;
  commitAsync(): Promise<void>;
  createArrayOf(typename: any, objarr: any, callback: any): any;
  createBlob(callback: any): any;
  createClob(callback: any): any;
  createNClob(callback: any): any;
  createSQLXML(callback: any): any;
  createStatementAsync(): Promise<IStatement>;
  createStruct(typename: any, attrarr: any, callback: any): any;
  getAutoCommitSync(): boolean;
  getCatalogAsync(): Promise<string>;
  getClientInfoAsync(name?: string): Promise<string>;
  getHoldabilityAsync(): Promise<any>;
  getMetaDataAsync(): Promise<DatabaseMetaData>;
  getNetworkTimeoutSync(): number;
  getSchemaSync(): string;
  getTransactionIsolationAsync(): Promise<any>;
  getTypeMapAsync(): Promise<any>;
  getWarningsAsync(): Promise<SQLWarning>;
  isClosedSync(): boolean;
  isReadOnlySync(): boolean;
  isValidAsync(timeout: any): Promise<boolean>;
  isValidSync(timeout: any): boolean;
  nativeSQL(sql: any): Promise<string>;
  prepareCallAsync(sql: any): Promise<CallableStatement>;
  prepareStatementAsync(sql: any): Promise<IPreparedStatement>;
  releaseSavepointAsync(savepoint: any): Promise<void>;
  rollbackAsync(savepoint: any): Promise<void>;
  setAutoCommitSync(autoCommit: any): void;
  setCatalogSync(catalog: any): void;
  setClientInfoAsync(props: any, name: string, value: string): Promise<void>;
  setHoldabilitySync(holdability: any): void;
  setNetworkTimeoutSync(executor: any, timeout: any): void;
  setReadOnlySync(readOnly: any): void;
  setSavepointSync(): any;
  setSavepointSync(name: any): any;
  setSchemaSync(schema: any): void;
  setTransactionIsolationSync(level: any): void;
  setTypeMapSync(map: any): void;
}

export class Connection {
  private conn: any;
  private txniso: any;
  constructor(connection: IConnection) {
    this.conn = PromisifyAll(connection) as IConnection;
    this.txniso = (function () {
      const txniso = [];

      txniso[
        java.getStaticFieldValue('java.sql.Connection', 'TRANSACTION_NONE')
      ] = 'TRANSACTION_NONE';
      txniso[
        java.getStaticFieldValue(
          'java.sql.Connection',
          'TRANSACTION_READ_COMMITTED',
        )
      ] = 'TRANSACTION_READ_COMMITTED';
      txniso[
        java.getStaticFieldValue(
          'java.sql.Connection',
          'TRANSACTION_READ_UNCOMMITTED',
        )
      ] = 'TRANSACTION_READ_UNCOMMITTED';
      txniso[
        java.getStaticFieldValue(
          'java.sql.Connection',
          'TRANSACTION_REPEATABLE_READ',
        )
      ] = 'TRANSACTION_REPEATABLE_READ';
      txniso[
        java.getStaticFieldValue(
          'java.sql.Connection',
          'TRANSACTION_SERIALIZABLE',
        )
      ] = 'TRANSACTION_SERIALIZABLE';

      return txniso;
    })();
  }

  async abort(executor: any): Promise<any> {
    return this.conn.abortAsync(executor);
  }

  clearWarnings(): void {
    return this.conn.clearWarningsSync();
  }

  async close(): Promise<void> {
    return this.conn.closeAsync();
  }

  async commit(): Promise<void> {
    return this.conn.commitAsync();
  }

  createArrayOf(typename, objarr, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  createBlob(callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  createClob(callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  createNClob(callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  createSQLXML(callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  async createStatement(): Promise<Statement> {
    return this.conn
      .createStatementAsync()
      .then((statement: IStatement) => new Statement(statement));
  }

  createStruct(typename, attrarr, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }

  getAutoCommit(): boolean {
    return this.conn.getAutoCommitSync();
  }

  async getCatalog(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.conn
        .getCatalogAsync()
        .then((result: string | PromiseLike<string>) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async getClientInfo(name?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.conn
        .getClientInfoAsync()
        .then((result: string | PromiseLike<string>) => {
          if (name) {
            resolve(result[name]);
          } else {
            resolve(result);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async getHoldability(): Promise<any> {
    return this.conn.getHoldabilityAsync();
  }

  async getMetaData(): Promise<DatabaseMetaData> {
    return new Promise((resolve, reject) => {
      this.conn
        .getMetaDataAsync()
        .then((dbm: any) => {
          resolve(new DatabaseMetaData(dbm));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getNetworkTimeout(): number {
    return this.conn.getNetworkTimeoutSync();
  }

  async getSchema(): Promise<any> {
    return this.conn.getSchemaSync();
  }

  async getTransactionIsolation(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.conn
        .getTransactionIsolationAsync()
        .then((txniso) => {
          resolve(this.txniso[txniso]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getTypeMap(): Promise<any> {
    return this.conn.getTypeMapAsync();
  }

  async getWarnings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.conn
        .getWarnings()
        .then((sqlwarning) => {
          resolve(new SQLWarning(sqlwarning));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  isClosed(): boolean {
    return this.conn.isClosedSync();
  }

  isClosedSync(): boolean {
    return this.conn.isClosedSync();
  }

  isReadOnly(): boolean {
    return this.conn.isReadOnlySync();
  }

  isReadOnlySync() {
    return this.conn.isReadOnlySync();
  }

  async isValid(timeout: number): Promise<boolean> {
    return this.conn.isValidAsync(timeout);
  }

  isValidSync(timeout: number): boolean {
    return this.conn.isValidSync(timeout);
  }

  nativeSQL(sql, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }

  async prepareCall(call: string): Promise<CallableStatement> {
    return this.conn
      .prepareCallAsync(call)
      .then(
        (callableStatement: ICallableStatement) =>
          new CallableStatement(callableStatement),
      );
  }

  async prepareStatement(sql: string): Promise<PreparedStatement> {
    return this.conn
      .prepareStatementAsync(sql)
      .then(
        (prepareStatement: IPreparedStatement) =>
          new PreparedStatement(prepareStatement),
      );
  }

  async releaseSavepoint(savepoint: any): Promise<void> {
    return this.conn.releaseSavepointAsync(savepoint);
  }
  async rollback(savepoint: any): Promise<void> {
    return this.conn.rollbackAsync(savepoint);
  }

  setAutoCommit(autoCommit: boolean): void {
    return this.conn.setAutoCommitSync(autoCommit);
  }

  setCatalog(catalog: string): void {
    return this.conn.setCatalogSync(catalog);
  }
  async setClientInfo(props: any, name: string, value: string): Promise<void> {
    return this.conn.setClientInfoAsync(props, name, value);
  }

  setHoldability(holdability: any): any {
    return this.conn.setHoldabilitySync(holdability);
  }

  setNetworkTimeout(executor, ms): any {
    return this.conn.setNetworkTimeoutSync(executor, ms);
  }
  setReadOnly(readonly: boolean): void {
    return this.conn.setReadOnlySync(readonly);
  }
  setSavepoint(name: string): any {
    this.conn.setSavepointSync(name);
  }
  setSchema(schema: string): void {
    return this.conn.setSchemaSync(schema);
  }

  setTransactionIsolation(txniso: any): any {
    return this.conn.setTransactionIsolationSync(txniso);
  }

  setTypeMap(map: any): any {
    return this.conn.setTypeMapSync(map);
  }
}
