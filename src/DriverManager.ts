import { isObject, isString } from './Helper';
import { getInstance } from './jinst';

const java = getInstance();

const DM = 'java.sql.DriverManager';

export function getConnection(...args: any[]) {
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
  return java.callStaticMethod(...args);
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
  return java.callStaticMethodSync(...args);
}

export function getLoginTimeout() {
  return java.callStaticMethodSync(DM, 'getLoginTimeout');
}

export function registerDriver(driver: string) {
  return java.callStaticMethodSync(DM, 'registerDriver', driver);
}

export function setLoginTimeout(seconds) {
  return java.callStaticMethodSync(DM, 'setLoginTimeout', seconds);
}
