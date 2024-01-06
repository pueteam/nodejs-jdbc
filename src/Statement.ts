import PromisifyAll from './PromisifyAll';
import { IResultSet, ResultSet } from './ResultSet';
import { getInstance, events } from './jinst';

const java = getInstance();

export interface IStatement {
  executeBatchSync(): number[];
  clearBatchSync(): void;
  addBatchSync(sql: string): void;
  executeBatchAsync(): Promise<number[]>;
  executeUpdateAsync(sql: string): Promise<number>;
  executeQueryAsync(sql: string): Promise<IResultSet>;
  execute(sql: string): Promise<number | IResultSet>;
  addBatchAsync(sql: string): Promise<void>;
  clearBatchAsync(): Promise<void>;
  cancelAsync(): Promise<void>;
  closeAsync(): Promise<void>;
  getFetchSizeSync(): number;
  setFetchSizeSync(rows: number): void;
  getMaxRowsSync(): number;
  setMaxRowsSync(max: number): void;
  getQueryTimeoutSync(): number;
  setQueryTimeoutSync(seconds: number): void;
  getGeneratedKeysAsync(): Promise<IResultSet>;
}

export class Statement {
  protected s: IStatement;
  static CLOSE_CURRENT_RESULT: any;
  static KEEP_CURRENT_RESULT: any;
  static CLOSE_ALL_RESULTS: any;
  static SUCCESS_NO_INFO: any;
  static EXECUTE_FAILED: any;
  static RETURN_GENERATED_KEYS: any;
  static NO_GENERATED_KEYS: any;

  constructor(statement: IStatement) {
    this.s = PromisifyAll(statement) as IStatement;
  }

  addBatch(sql: string): Promise<void> {
    return this.s.addBatchAsync(sql);
  }

  addBatchSync(sql: string): void {
    return this.s.addBatchSync(sql);
  }

  clearBatchSync(): void {
    return this.s.clearBatchSync();
  }

  clearBatch(): Promise<void> {
    return this.s.clearBatchAsync();
  }

  executeBatch(): Promise<number[]> {
    return this.s.executeBatchAsync();
  }

  executeBatchSync(): number[] {
    return this.s.executeBatchSync();
  }

  async cancel(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.s
        .cancelAsync()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.s
        .closeAsync()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async executeUpdate(sql: string): Promise<number> {
    return this.s.executeUpdateAsync(sql);
  }

  async executeQuery(sql: string): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.s
        .executeQueryAsync(sql)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  async execute(sql: string): Promise<number | ResultSet> {
    return new Promise((resolve, reject) => {
      this.s
        .execute(sql)
        .then((result: IResultSet) => {
          resolve(new ResultSet(result));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getFetchSize(): number {
    return this.s.getFetchSizeSync();
  }

  setFetchSize(rows): void {
    return this.s.setFetchSizeSync(rows);
  }

  getMaxRows(): number {
    return this.s.getMaxRowsSync();
  }

  setMaxRows(max: number): void {
    return this.s.setMaxRowsSync(max);
  }

  getQueryTimeout(): number {
    return this.s.getQueryTimeoutSync();
  }

  setQueryTimeout(seconds: number): void {
    return this.s.setQueryTimeoutSync(seconds);
  }

  async getGeneratedKeys(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.s
        .getGeneratedKeysAsync()
        .then((resultset: IResultSet) => {
          resolve(new ResultSet(resultset));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  clearParameters(arg0: (err: any) => any) {
    throw new Error('Method not implemented.');
  }

  setTimestamp(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setTime(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setString(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setLong(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setInt(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setFloat(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setDouble(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setDate(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setBytes(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setByte(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  setBoolean(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
  getMetaData(arg0: (err: any, result: any) => any) {
    throw new Error('Method not implemented.');
  }
  setBigDecimal(index: any, val: any, arg2: (err: any) => any) {
    throw new Error('Method not implemented.');
  }
}

events.once('initialized', () => {
  // The constant indicating that the current ResultSet object should be closed
  // when calling getMoreResults.
  Statement.CLOSE_CURRENT_RESULT = java.getStaticFieldValue(
    'java.sql.Statement',
    'CLOSE_CURRENT_RESULT',
  );

  // The constant indicating that the current ResultSet object should not be
  // closed when calling getMoreResults.
  Statement.KEEP_CURRENT_RESULT = java.getStaticFieldValue(
    'java.sql.Statement',
    'KEEP_CURRENT_RESULT',
  );

  // The constant indicating that all ResultSet objects that have previously been
  // kept open should be closed when calling getMoreResults.
  Statement.CLOSE_ALL_RESULTS = java.getStaticFieldValue(
    'java.sql.Statement',
    'CLOSE_ALL_RESULTS',
  );

  // The constant indicating that a batch statement executed successfully but that
  // no count of the number of rows it affected is available.
  Statement.SUCCESS_NO_INFO = java.getStaticFieldValue(
    'java.sql.Statement',
    'SUCCESS_NO_INFO',
  );

  // The constant indicating that an error occured while executing a batch
  // statement.
  Statement.EXECUTE_FAILED = java.getStaticFieldValue(
    'java.sql.Statement',
    'EXECUTE_FAILED',
  );

  // The constant indicating that generated keys should be made available for
  // retrieval.
  Statement.RETURN_GENERATED_KEYS = java.getStaticFieldValue(
    'java.sql.Statement',
    'RETURN_GENERATED_KEYS',
  );

  // The constant indicating that generated keys should not be made available for
  // retrieval.
  Statement.NO_GENERATED_KEYS = java.getStaticFieldValue(
    'java.sql.Statement',
    'NO_GENERATED_KEYS',
  );
});
