import { IResultSet, ResultSet } from './ResultSet';
import { IResultSetMetaData, ResultSetMetaData } from './ResultSetMetadata';
import { getInstance, events } from './jinst';

const java = getInstance();

export interface IStatement {
  setTimeSync(index: number, time: any): void;
  setTimestampSync(index: number, timestamp: any): void;
  setStringSync(index: number, value: string): void;
  setLongSync(index: number, longValue: any): void;
  setIntSync(index: number, value: number): void;
  setDoubleSync(index: number, value: number): void;
  setFloatSync(index: number, value: number): void;
  setDateSync(index: number, date: any): void;
  setByteSync(index: any, val: any): void;
  setBytesSync(index: any, val: any): void;
  setBooleanSync(index: number, val: boolean): void;
  getMetaDataPromise(): Promise<IResultSetMetaData>;
  setBigDecimalSync(index: number, bigdecimalValue: any): void;
  clearParametersSync(): void;
  executeBatchSync(): number[];
  clearBatchSync(): void;
  addBatchSync(sql: string): void;
  executeBatchPromise(): Promise<number[]>;
  executeUpdatePromise(sql: string): Promise<number>;
  executeQueryPromise(sql: string): Promise<IResultSet>;
  executePromise(sql: string): Promise<boolean>;
  addBatchPromise(sql: string): Promise<void>;
  clearBatchPromise(): Promise<void>;
  cancelPromise(): Promise<void>;
  closePromise(): Promise<void>;
  getFetchSizeSync(): number;
  setFetchSizeSync(rows: number): void;
  getMaxRowsSync(): number;
  setMaxRowsSync(max: number): void;
  getQueryTimeoutSync(): number;
  setQueryTimeoutSync(seconds: number): void;
  getGeneratedKeysPromise(): Promise<IResultSet>;
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
    this.s = statement;
  }

  addBatch(sql: string): Promise<void> {
    return this.s.addBatchPromise(sql);
  }

  addBatchSync(sql: string): void {
    return this.s.addBatchSync(sql);
  }

  clearBatchSync(): void {
    return this.s.clearBatchSync();
  }

  clearBatch(): Promise<void> {
    return this.s.clearBatchPromise();
  }

  executeBatch(): Promise<number[]> {
    return this.s.executeBatchPromise();
  }

  executeBatchSync(): number[] {
    return this.s.executeBatchSync();
  }

  async cancel(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.s
        .cancelPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async close(): Promise<void> {
    return this.s.closePromise();
  }

  async executeUpdate(sql: string): Promise<number> {
    return this.s.executeUpdatePromise(sql);
  }

  async executeQuery(sql: string): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.s
        .executeQueryPromise(sql)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  async execute(sql: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.s
        .executePromise(sql)
        .then((result: boolean) => {
          resolve(result);
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
        .getGeneratedKeysPromise()
        .then((resultset: IResultSet) => {
          resolve(new ResultSet(resultset));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  clearParameters(): void {
    return this.s.clearParametersSync();
  }

  setTime(index: number, value: string): void {
    const time = value
      ? java.callStaticMethodSync('java.sql.Time', 'valueOf', value)
      : null;
    return this.s.setTimeSync(index, time);
  }
  setTimestamp(index: number, value: string): void {
    const timestamp = value
      ? java.callStaticMethodSync('java.sql.Timestamp', 'valueOf', value)
      : null;
    return this.s.setTimestampSync(index, timestamp);
  }
  setString(index: number, value: string): void {
    return this.s.setStringSync(index, value);
  }
  setLong(index: number, value: string): void {
    const longValue = value ? java.newInstanceSync('java.lang.Long', value) : 0;
    return this.s.setLongSync(index, longValue);
  }
  setInt(index: number, value: number): void {
    return this.s.setIntSync(index, value);
  }
  setDouble(index: number, value: number): void {
    return this.s.setDoubleSync(index, value);
  }
  setFloat(index: number, value: number): void {
    return this.s.setFloatSync(index, value);
  }
  setDate(index: number, value: string): void {
    const date = value
      ? java.callStaticMethodSync('java.sql.Date', 'valueOf', value)
      : null;
    return this.s.setDateSync(index, date);
  }
  setByte(index: any, val: any): void {
    return this.s.setByteSync(index, val);
  }
  setBytes(index: any, val: any): void {
    return this.s.setBytesSync(index, val);
  }
  setBoolean(index: number, val: boolean): void {
    return this.s.setBooleanSync(index, val);
  }
  async getMetaData(): Promise<ResultSetMetaData> {
    return new Promise((resolve, reject) => {
      this.s
        .getMetaDataPromise()
        .then((result: IResultSetMetaData) => {
          return resolve(new ResultSetMetaData(result));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  setBigDecimal(index: number, value: string): void {
    const bigdecimalValue = value
      ? java.newInstanceSync('java.math.BigDecimal', value)
      : 0;
    return this.s.setBigDecimalSync(index, bigdecimalValue);
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
