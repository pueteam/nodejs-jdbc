import { ResultSet } from './resultset';
import { getInstance, events } from './jinst';
import { isString, isUndefined } from './helper';

const java = getInstance();

export class Statement {
  private s: any;
  static CLOSE_CURRENT_RESULT: any;
  static KEEP_CURRENT_RESULT: any;
  static CLOSE_ALL_RESULTS: any;
  static SUCCESS_NO_INFO: any;
  static EXECUTE_FAILED: any;
  static RETURN_GENERATED_KEYS: any;
  static NO_GENERATED_KEYS: any;

  constructor(s) {
    this.s = s;
  }

  addBatch(sql, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }

  cancel(callback) {
    this.s.cancel((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  clearBatch(callback) {
    this.s.clearBatch((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  close(callback) {
    this.s.close((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  executeUpdate(...args: ((err: any, count: any) => void)[]) {
    return new Promise((resolve, reject) => {
      // Check arguments for validity, and return error if invalid
      if (!(isString(args[0]) && isUndefined(args[1]))) {
        return reject(new Error('INVALID ARGUMENTS'));
      }

      // Push a callback handler onto the arguments
      args.push((err, count) => {
        if (err) {
          return reject(err);
        }
        return resolve(count);
      });

      // Forward modified arguments to _s.executeUpdate
      this.s.executeUpdate.apply(this.s, args);
    });
  }

  executeQuery(sql: string) {
    return new Promise((resolve, reject) => {
      this.s.executeQuery(sql, (err, resultset) => {
        if (err) {
          return reject(err);
        }
        return resolve(new ResultSet(resultset));
      });
    });
  }

  execute(sql, callback) {
    const s = this.s;
    if (typeof sql === 'string') {
      s.execute(sql, (err, isResultSet) => {
        if (err) {
          return callback(err);
        }
        if (isResultSet) {
          s.getResultSet((err, resultset) => {
            if (err) {
              return callback(err);
            }
            return callback(null, new ResultSet(resultset));
          });
        } else {
          s.getUpdateCount((err, count) => {
            if (err) {
              return callback(err);
            }
            return callback(null, count);
          });
        }
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }

  getFetchSize(callback) {
    this.s.getFetchSize((err, fetchSize) => {
      if (err) {
        return callback(err);
      }
      return callback(null, fetchSize);
    });
  }

  setFetchSize(rows, callback) {
    this.s.setFetchSize(rows, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  getMaxRows(callback) {
    this.s.getMaxRows((err, max) => {
      if (err) {
        return callback(err);
      }
      return callback(null, max);
    });
  }

  setMaxRows(max, callback) {
    this.s.setMaxRows(max, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  getQueryTimeout(callback) {
    this.s.getQueryTimeout((err, queryTimeout) => {
      if (err) {
        return callback(err);
      }
      return callback(null, queryTimeout);
    });
  }

  setQueryTimeout(seconds, callback) {
    this.s.setQueryTimeout(seconds, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  getGeneratedKeys(callback) {
    this.s.getGeneratedKeys((err, resultset) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(resultset));
    });
  }
  clearParameters(arg0: (err: any) => any) {
    throw new Error('Method not implemented.');
  }

  executeBatch(arg0: (err: any, result: any) => any) {
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
