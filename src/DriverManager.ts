import { isObject, isString } from './Helper';
import { getInstance } from './jinst';

const java = getInstance();

const DM = 'java.sql.DriverManager';

export function getConnection(url, propsoruser, callback) {
  // Get arguments as an array
  const args = Array.prototype.slice.call(arguments);

  // Pull the callback off the end of the arguments
  callback = args.pop();
  // Check arguments for validity, and return error if invalid
  const validArgs =
    args[0] &&
    // args[1] (propsoruser) and args[2] (password) can both be falsey
    (!(args[1] || args[2]) ||
      // args[1] (propsoruser) and args[2] (password) can both be strings
      (isString(args[1]) && isString(args[2])) ||
      // args[1] (propsoruser) can be an object if args[2] (password) is falsey
      (isObject(args[1]) && !args[2]));

  if (!validArgs) {
    return new Error('INVALID ARGUMENTS');
  }

  // Push a callback handler onto the arguments
  args.push((err, conn) => {
    if (err) {
      return callback(err);
    }
    return callback(null, conn);
  });

  // Add DM and 'getConnection' string onto beginning of args
  // (unshift in reverse order of desired order)
  args.unshift('getConnection');
  args.unshift(DM);

  // Forward modified arguments to java.callStaticMethod
  java.callStaticMethod.apply(java, args);
}

export function getConnectionSync(...args: any[]) {
  // Check arguments for validity, and return error if invalid
  const validArgs =
    args[0] &&
    // args[1] (propsoruser) and args[2] (password) can both be falsey
    (!(args[1] || args[2]) ||
      // args[1] (propsoruser) and args[2] (password) can both be strings
      (isString(args[1]) && isString(args[2])) ||
      // args[1] (propsoruser) can be an object if args[2] (password) is falsey
      (isObject(args[1]) && !args[2]));

  if (!validArgs) {
    return new Error('INVALID ARGUMENTS');
  }

  // Add DM and 'getConnection' string onto beginning of args
  // (unshift in reverse order of desired order)
  args.unshift('getConnection');
  args.unshift(DM);

  // Forward modified arguments to java.callStaticMethod
  return java.callStaticMethodSync.apply(java, args);
}

export function getLoginTimeout(callback) {
  java.callStaticMethod(DM, 'getLoginTimeout', (err, seconds) => {
    if (err) {
      return callback(err);
    }
    return callback(null, seconds);
  });
}
export function registerDriver(driver, callback) {
  java.callStaticMethod(DM, 'registerDriver', driver, (err) => {
    if (err) {
      return callback(err);
    }
    return callback(null);
  });
}
export function setLoginTimeout(seconds, callback) {
  java.callStaticMethod(DM, 'setLoginTimeout', seconds, (err) => {
    if (err) {
      return callback(err);
    }
    return callback(null, true);
  });
}
