import { isNumber, isObject, isString, isUndefined } from './helper';
import { PreparedStatement } from './preparedstatement';

export class CallableStatement {
  private cs: any;

  constructor(cs) {
    PreparedStatement.call(this, cs);
    this.cs = cs;
  }
  getArray(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getArray(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getBigDecimal(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getBigDecimal(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getBlob(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getBlob(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getBoolean(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getBoolean(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getByte(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getByte(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getBytes(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getBytes(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getCharacterStream(arg1, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  getClob(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getClob(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getDate(arg1, arg2, callback) {
    // Get arguments as an array
    const args = Array.prototype.slice.call(arguments);

    // Pull the callback off the end of the arguments
    callback = args.pop();

    // Check arguments for validity, and return error if invalid
    const validArgs =
      (isNumber(args[0]) || isString(args[0])) &&
      (isUndefined(args[1]) || isObject(args[1]));
    if (!validArgs) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    // Push a callback handler onto the arguments
    args.push((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });

    // Forward modified arguments to cs.getDate
    this.cs.getDate.apply(this.cs, args);
  }
  getDouble(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getDouble(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getFloat(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getFloat(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getInt(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getInt(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getLong(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getLong(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getNCharacterStream(arg1, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  getNClob(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getNClob(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getNString(arg1, callback) {
    if (typeof arg1 === 'number' || typeof arg1 === 'string') {
      this.cs.getNString(arg1, (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
  getObject(arg1, arg2, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }
  registerOutParameter() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    if (
      (typeof args[0] === 'number' && typeof args[1] === 'number') ||
      (typeof args[0] === 'number' &&
        typeof args[1] === 'number' &&
        typeof args[2] === 'number') ||
      (typeof args[0] === 'number' &&
        typeof args[1] === 'number' &&
        typeof args[2] === 'string') ||
      (typeof args[0] === 'string' && typeof args[1] === 'number') ||
      (typeof args[0] === 'string' &&
        typeof args[1] === 'number' &&
        typeof args[2] === 'number') ||
      (typeof args[0] === 'string' &&
        typeof args[1] === 'number' &&
        typeof args[2] === 'string')
    ) {
      args.push(callback);
      this.cs.registerOutParameter.apply(this.cs, args);
    } else {
      return callback(new Error('INVALID ARGUMENTS'));
    }
  }
}