import { IResultSet, ResultSet } from './ResultSet';
import { IResultSetMetaData, ResultSetMetaData } from './ResultSetMetadata';
import { logger } from './Helper';
import { getInstance } from './jinst';

export interface IPreparedStatement {
  addBatchPromise(): Promise<void>;
  clearParametersPromise(): Promise<void>;
  executePromise(): Promise<IResultSet>;
  executeBatchPromise(): Promise<void>;
  executeQueryPromise(): Promise<IResultSet>;
  executeUpdatePromise(): Promise<number>;
  getMetaDataPromise(): Promise<IResultSetMetaData>;
  getParameterMetaDataPromise(): Promise<IResultSetMetaData>;
  setBigDecimalSync(index: number, bigdecimalValue: any): void;
  setBooleanSync(index: number, val: boolean): unknown;
  setByteSync(index: any, val: any): unknown;
  setBytesSync(index: any, val: any): unknown;
  setDateSync(index: number, date: any): void;
  setDoubleSync(index: number, value: number): void;
  setFloatSync(index: number, value: number): void;
  setIntSync(index: number, value: number): void;
  setLongSync(index: number, longValue: any): void;
  setStringSync(index: number, value: string): void;
  setTimeSync(index: number, time: any): void;
  setTimestampSync(index: number, timestamp: any): void;
}

const java = getInstance();

export class PreparedStatement {
  protected ps: IPreparedStatement;

  constructor(ps: IPreparedStatement) {
    this.ps = ps;
  }

  async addBatch(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ps
        .addBatchPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async clearParameters(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ps
        .clearParametersPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async execute(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.ps
        .executePromise()
        .then((result: IResultSet) => {
          resolve(new ResultSet(result));
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async executeBatch(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ps
        .executeBatchPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async executeQuery(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.ps
        .executeQueryPromise()
        .then((result: IResultSet) => {
          return resolve(new ResultSet(result));
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async executeUpdate(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.ps
        .executeUpdatePromise()
        .then((result: number) => {
          return resolve(result);
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async getMetaData(): Promise<ResultSetMetaData> {
    return new Promise((resolve, reject) => {
      this.ps
        .getMetaDataPromise()
        .then((result: IResultSetMetaData) => {
          return resolve(new ResultSetMetaData(result));
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async getParameterMetaData(): Promise<ResultSetMetaData> {
    return new Promise((resolve, reject) => {
      this.ps
        .getParameterMetaDataPromise()
        .then((result: IResultSetMetaData) => {
          return resolve(new ResultSetMetaData(result));
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  setArray(index, val, callback) {
    callback(new Error('NOT IMPLEMENTED'));
  }
  setAsciiStream(index, val, length, callback) {
    // length is optional, or can be int or long.
    callback(new Error('NOT IMPLEMENTED'));
  }
  // val must be a java.math.BigDecimal
  setBigDecimal(index: number, value: string): void {
    const bigdecimalValue = value
      ? java.newInstanceSync('java.math.BigDecimal', value)
      : 0;
    return this.ps.setBigDecimalSync(index, bigdecimalValue);
  }

  setBinaryStream(index, val, length, callback) {
    // length is optional, or can be int or long.
    callback(new Error('NOT IMPLEMENTED'));
  }
  setBlob(index, val, length, callback) {
    // length is optional.  Must be java.lang.Long if supplied, only valid with
    // InputStream.
    // val can be java.sql.Blob or java.io.InputStream
    callback(new Error('NOT IMPLEMENTED'));
  }
  setBoolean(index: number, val: boolean) {
    return this.ps.setBooleanSync(index, val);
  }
  setByte(index: any, val: any) {
    return this.ps.setByteSync(index, val);
  }
  setBytes(index: any, val: any) {
    return this.ps.setBytesSync(index, val);
  }

  setCharacterStream(index, val, length, callback) {
    // length is optional, or can be int or long.
    // val must be a java.io.Reader
    callback(new Error('NOT IMPLEMENTED'));
  }
  setClob(index, val, length, callback) {
    // length is optional, must be a long, only valid with a java.io.Reader.
    // val can be a java.io.Reader or a java.sql.Clob
    callback(new Error('NOT IMPLEMENTED'));
  }
  setDate(index: number, value: string): void {
    const date = value
      ? java.callStaticMethodSync('java.sql.Date', 'valueOf', value)
      : null;
    return this.ps.setDateSync(index, date);
  }
  setDouble(index: number, value: number): void {
    return this.ps.setDoubleSync(index, value);
  }
  setFloat(index: number, value: number): void {
    return this.ps.setFloatSync(index, value);
  }
  setInt(index: number, value: number): void {
    return this.ps.setIntSync(index, value);
  }
  setLong(index: number, value: string): void {
    const longValue = value ? java.newInstanceSync('java.lang.Long', value) : 0;
    return this.ps.setLongSync(index, longValue);
  }
  setString(index: number, value: string): void {
    return this.ps.setStringSync(index, value);
  }
  setTime(index: number, value: string): void {
    const time = value
      ? java.callStaticMethodSync('java.sql.Time', 'valueOf', value)
      : null;
    return this.ps.setTimeSync(index, time);
  }
  setTimestamp(index: number, value: string): void {
    const timestamp = value
      ? java.callStaticMethodSync('java.sql.Timestamp', 'valueOf', value)
      : null;
    return this.ps.setTimestampSync(index, timestamp);
  }
}
