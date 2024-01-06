import { IResultSet, ResultSet } from './ResultSet';
import { ResultSetMetaData } from './ResultSetMetadata';
import { logger } from './Helper';
import { getInstance } from './jinst';

export interface IPreparedStatement {
  addBatch(): Promise<void>;
  clearParameters(): Promise<void>;
  execute(): Promise<ResultSet>;
  executeBatch(): Promise<void>;
  executeQuery(): Promise<IResultSet>;
  executeUpdate(): Promise<number>;
  getMetaData(): Promise<ResultSetMetaData>;
  getParameterMetaData(): Promise<ResultSetMetaData>;
  setArray(index, val, callback): void;
  setAsciiStream(index, val, length, callback): void;
  setBigDecimal(index: number, value: string): void;
  setBinaryStream(index, val, length, callback): void;
  setBlob(index, val, length, callback): void;
  setBoolean(index: number, val: boolean): void;
  setByte(index: any, val: any): void;
  setBytes(index: any, val: any): void;
  setCharacterStream(index, val, length, callback): void;
  setClob(index, val, length, callback): void;
  setDate(index: number, value: string): void;
  setDouble(index: number, value: number): void;
  setFloat(index: number, value: number): void;
  setInt(index: number, value: number): void;
  setLong(index: number, value: number): void;
  setTimestamp(index: number, value: string): void;
  setTime(index: number, value: string): void;
  setString(index: number, value: string): void;
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
        .addBatch()
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
        .clearParameters()
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
        .execute()
        .then((result: ResultSet | PromiseLike<ResultSet>) => {
          resolve(result);
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
        .executeBatch()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  async executeQuery(): Promise<IResultSet> {
    return new Promise((resolve, reject) => {
      this.ps
        .executeQuery()
        .then((result: IResultSet) => {
          return resolve(result);
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
        .executeUpdate()
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
        .getMetaData()
        .then((result: ResultSetMetaData) => {
          return resolve(result);
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
        .getParameterMetaData()
        .then((result: ResultSetMetaData) => {
          return resolve(result);
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
    return this.ps.setBigDecimal(index, bigdecimalValue);
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
    return this.ps.setBoolean(index, val);
  }
  setByte(index: any, val: any) {
    return this.ps.setByte(index, val);
  }
  setBytes(index: any, val: any) {
    return this.ps.setBytes(index, val);
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
    return this.ps.setDate(index, date);
  }
  setDouble(index: number, value: number): void {
    return this.ps.setDouble(index, value);
  }
  setFloat(index: number, value: number): void {
    return this.ps.setFloat(index, value);
  }
  setInt(index: number, value: number): void {
    return this.ps.setInt(index, value);
  }
  setLong(index: number, value: string): void {
    const longValue = value ? java.newInstanceSync('java.lang.Long', value) : 0;
    return this.ps.setLong(index, longValue);
  }
  setString(index: number, value: string): void {
    return this.ps.setString(index, value);
  }
  setTime(index: number, value: string): void {
    const time = value
      ? java.callStaticMethodSync('java.sql.Time', 'valueOf', value)
      : null;
    return this.ps.setTime(index, time);
  }
  setTimestamp(index: number, value: string): void {
    const timestamp = value
      ? java.callStaticMethodSync('java.sql.Timestamp', 'valueOf', value)
      : null;
    return this.ps.setTimestamp(index, timestamp);
  }
}
