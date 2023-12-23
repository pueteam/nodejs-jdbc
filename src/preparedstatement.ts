import winston from 'winston';
import { ResultSet } from './resultset';
import { ResultSetMetaData } from './resultsetmetadata';
import { Statement } from './statement';

const { error } = winston;

export class PreparedStatement {
  private ps: Statement;

  constructor(ps: any) {
    this.ps = new Statement(ps);
  }
  addBatch(callback) {
    this.ps.addBatch('', (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  clearParameters(callback) {
    this.ps.clearParameters((err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  execute(callback) {
    this.ps.execute('', (err, result) => {
      if (err) {
        error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }
  executeBatch(callback) {
    this.ps.executeBatch((err, result) => {
      if (err) {
        error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }
  executeQuery() {
    return new Promise((resolve, reject) => {
      this.ps.executeQuery((err, resultset) => {
        if (err) {
          error(err);
          return reject(err);
        }
        return resolve(new ResultSet(resultset));
      });
    });
  }
  executeUpdate() {
    return new Promise((resolve, reject) => {
      this.ps.executeUpdate((err, result) => {
        if (err) {
          error(err);
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
  getMetaData(callback) {
    this.ps.getMetaData((err, result) => {
      if (err) return callback(err);
      callback(null, new ResultSetMetaData(result));
    });
  }
  getParameterMetaData(callback) {
    callback(new Error('NOT IMPLEMENTED'));
    // this.ps.getParameterMetaData(function(err, result) {
    //   if (err) callback(err);
    //   callback(null, result);
    // });
  }
  setArray(index, val, callback) {
    callback(new Error('NOT IMPLEMENTED'));
  }
  setAsciiStream(index, val, length, callback) {
    // length is optional, or can be int or long.
    callback(new Error('NOT IMPLEMENTED'));
  }
  // val must be a java.math.BigDecimal
  setBigDecimal(index, val, callback) {
    this.ps.setBigDecimal(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
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
  setBoolean(index, val, callback) {
    this.ps.setBoolean(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setByte(index, val, callback) {
    this.ps.setByte(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setBytes(index, val, callback) {
    this.ps.setBytes(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
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
  setDate(index, val, calendar, callback) {
    if (calendar === null) {
      this.ps.setDate(index, val, (err) => {
        if (err) return callback(err);
        callback(null);
      });
    } else {
      callback(new Error('NOT IMPLEMENTED'));
      /*
      this.ps.setDate(index, val, calendar, (err) => {
        if (err) return callback(err);
        callback(null);
      });
      */
    }
  }
  setDouble(index, val, callback) {
    this.ps.setDouble(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setFloat(index, val, callback) {
    this.ps.setFloat(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setInt(index, val, callback) {
    this.ps.setInt(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setLong(index, val, callback) {
    this.ps.setLong(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setString(index, val, callback) {
    this.ps.setString(index, val, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  setTime(index, val, calendar, callback) {
    if (calendar === null) {
      this.ps.setTime(index, val, (err) => {
        if (err) return callback(err);
        callback(null);
      });
    } else {
      callback(new Error('NOT IMPLEMENTED'));
      /*
      this.ps.setTime(index, val, calendar, (err) => {
        if (err) return callback(err);
        callback(null);
      });
      */
    }
  }
  setTimestamp(index, val, calendar, callback) {
    if (calendar === null) {
      this.ps.setTimestamp(index, val, (err) => {
        if (err) return callback(err);
        callback(null);
      });
    } else {
      callback(new Error('NOT IMPLEMENTED'));
      /*
      this.ps.setTimestamp(index, val, calendar, (err) => {
        if (err) return callback(err);
        callback(null);
      });
      */
    }
  }
}
