import { CallableStatement } from './callablestatement';
import { getInstance, isJvmCreated, addOption } from './jinst';
import { PreparedStatement } from './preparedstatement';
import { Statement } from './statement';
import { SQLWarning } from './sqlwarning';
import { DatabaseMetaData } from './databasemetadata';
import {
  isArray,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from './helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const java = getInstance();

if (!isJvmCreated()) {
  addOption('-Xrs');
}

export class Connection {
  private conn: any;
  private txniso: any;
  constructor(conn) {
    this.conn = conn;
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
  abort(executor, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  clearWarnings(callback) {
    this.conn.clearWarnings((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  close(callback) {
    if (this.conn === null) {
      return callback(null);
    }

    this.conn.close((err) => {
      if (err) {
        return callback(err);
      }
      this.conn = null;
      return callback(null);
    });
  }
  commit(callback) {
    this.conn.commit((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
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
  createStatement(...args) {
    // Check arguments for validity, and return error if invalid
    let invalidArgs = false;
    return new Promise((resolve, reject) => {
      args.forEach((arg) => {
        if (!isNumber(arg)) {
          invalidArgs = true;
        }
      });

      if (invalidArgs) {
        return reject(new Error('INVALID ARGUMENTS'));
      }

      // Push a callback handler onto the arguments
      args.push((err, statement) => {
        if (err) {
          return reject(err);
        }
        return resolve(new Statement(statement));
      });

      // Forward modified arguments to conn.createStatement
      this.conn.createStatement.apply(this.conn, args);
    });
  }
  createStruct(typename, attrarr, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  getAutoCommit(callback) {
    this.conn.getAutoCommit((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  getCatalog(callback) {
    this.conn.getCatalog((err, catalog) => {
      if (err) {
        return callback(err);
      }
      return callback(null, catalog);
    });
  }
  getClientInfo(name, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Push a callback handler onto the arguments
    args.push((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });

    // Forward modified arguments to conn.getClientInfo
    this.conn.getClientInfo.apply(this.conn, args);
  }
  getHoldability(callback) {
    this.conn.getClientInfo((err, holdability) => {
      if (err) {
        return callback(err);
      }
      return callback(null, holdability);
    });
  }
  getMetaData(callback) {
    this.conn.getMetaData((err, dbm) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new DatabaseMetaData(dbm));
    });
  }
  getNetworkTimeout(callback) {
    this.conn.getNetworkTimeout((err, ms) => {
      if (err) {
        return callback(err);
      }
      return callback(null, ms);
    });
  }
  getSchema(callback) {
    this.conn.getSchema((err, schema) => {
      if (err) {
        return callback(err);
      }
      return callback(null, schema);
    });
  }
  getTransactionIsolation(callback) {
    this.conn.getTransactionIsolation((err, txniso) => {
      if (err) {
        return callback(err);
      }
      return callback(null, this.txniso[txniso]);
    });
  }
  getTypeMap(callback) {
    this.conn.getTypeMap((err, map) => {
      if (err) {
        return callback(err);
      }
      return callback(null, map);
    });
  }
  getWarnings(callback) {
    this.conn.getWarnings((err, sqlwarning) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new SQLWarning(sqlwarning));
    });
  }
  isClosed(callback) {
    this.conn.isClosed((err, closed) => {
      if (err) return callback(err);
      callback(null, closed);
    });
  }
  isClosedSync() {
    return this.conn.isClosedSync();
  }
  isReadOnly(callback) {
    this.conn.isReadOnly((err, readonly) => {
      if (err) {
        return callback(err);
      }
      return callback(null, readonly);
    });
  }
  isReadOnlySync() {
    return this.conn.isReadOnlySync();
  }
  isValid(timeout, callback) {
    this.conn.isValid(timeout, (err, valid) => {
      if (err) {
        return callback(err);
      }
      return callback(null, valid);
    });
  }
  isValidSync(timeout) {
    return this.conn.isValidSync(timeout);
  }
  nativeSQL(sql, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  prepareCall(sql, rstype, rsconcurrency, rsholdability, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Check arguments for validity, and return error if invalid
    if (!args[0] || (args[1] && !args[2])) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    // Push a callback handler onto the arguments
    args.push((err, callablestatement) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new CallableStatement(callablestatement));
    });

    // Forward modified arguments to conn.prepareCall
    this.conn.prepareCall.apply(this.conn, args);
  }
  /**
   * @callback prepareStatementCallback
   * @param {Error} err - An error message, or null if no error occurred
   * @param {PreparedStatement} prepStmt - The prepared statement
   */
  /**
   * Creates a prepared statement and returns it via callback.
   *
   * @param {string} sql - SQL query
   * @param {(number | number[] | string[])} [arg1] - autoGeneratedKeys, resultSetType, or an array of numbers or strings
   * @param {number} [arg2] - resultSetConcurrency
   * @param {number} [arg3] - resultSetHoldability
   * @param {prepareStatementCallback} callback - The callback that handles the prepare statement response
   */
  prepareStatement(sql, arg1, arg2, arg3, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Error to return if arguments are invalid
    const errMsg = 'INVALID ARGUMENTS';

    // The first arg (sql) must be present
    if (!args[0]) {
      return callback(new Error(errMsg));
    }

    // Check arg1, arg2, and arg3 for validity.  These arguments must
    // be numbers if given, except for the special case when the first
    // of these arguments is an array and no other arguments are given.
    // In this special case, the array must be a string or number array.
    //
    // NOTE: _.tail returns all but the first argument, so we are only
    // processing arg1, arg2, and arg3; and not sql (or callback, which
    // was already removed from the args array).
    let invalidArgs = false;
    args.slice(1).forEach((arg, idx) => {
      // Check for the special case where arg1 can be an array of strings or numbers
      // if arg2 and arg3 are not given
      if (
        idx === 0 &&
        isArray(arg) &&
        isUndefined(args[2]) &&
        isUndefined(args[3])
      ) {
        if (!(allType(arg, 'string') || allType(arg, 'number'))) {
          invalidArgs = true;

          // Lodash break
          return false;
        }

        // Lodash continue
        return;
      }

      // Other than the special case above, these args must be numbers
      if (!isNumber(arg)) {
        invalidArgs = true;

        // Lodash break
        return false;
      }
    });

    if (invalidArgs) {
      return callback(new Error(errMsg));
    }

    // Push a callback handler onto the arguments
    args.push((err, ps) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new PreparedStatement(ps));
    });

    // Forward modified arguments to conn.prepareStatement
    this.conn.prepareStatement.apply(this.conn, args);
  }
  releaseSavepoint(savepoint, callback) {
    this.conn.releaseSavepoint(savepoint, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  rollback(savepoint, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Check arguments for validity, and return error if invalid
    // if (! _.isObject(args[0])) {
    //   return callback(new Error("INVALID ARGUMENTS"));
    // }
    // Push a callback handler onto the arguments
    args.push((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });

    // Forward modified arguments to conn.rollback
    this.conn.rollback.apply(this.conn, args);
  }
  setAutoCommit(autocommit, callback) {
    this.conn.setAutoCommit(autocommit, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  setCatalog(catalog, callback) {
    this.conn.setCatalog(catalog, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  setClientInfo(props, name, value, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Check arguments for validity, manipulate the args array appropriately,
    // and return error if invalid
    if (isObject(args[0]) && isUndefined(args[1]) && isUndefined(args[2])) {
      // Do nothing
    } else if (isNull(args[0]) && isString(args[1]) && isString(args[2])) {
      // Remove first argument (props) from args array
      args.shift();
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    // Push a callback handler onto the arguments
    args.push((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });

    // Forward modified arguments to conn.setClientInfo
    this.conn.setClientInfo.apply(this.conn, args);
  }
  setHoldability(holdability, callback) {
    this.conn.setHoldability(holdability, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  setNetworkTimeout(executor, ms, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  setReadOnly(readonly, callback) {
    this.conn.setReadOnly(readonly, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  setSavepoint(name, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Check arguments for validity, and return error if invalid
    if (!(isUndefined(args[0]) || isString(args[0]))) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    // Push a callback handler onto the arguments
    args.push((err, savepoint) => {
      if (err) {
        return callback(err);
      }
      return callback(null, savepoint);
    });

    // Forward modified arguments to conn.setSavepoint
    this.conn.setSavepoint.apply(this.conn, args);
  }
  setSchema(schema, callback) {
    this.conn.setSchema(schema, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  setTransactionIsolation(txniso, callback) {
    this.conn.setTransactionIsolation(txniso, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  setTypeMap(map, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
}

function allType(array: any[], type: any) {
  array.forEach((el: any) => {
    if (typeof el !== type) {
      return false;
    }
  });

  return true;
}
