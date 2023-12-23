export function isNumber(value: any) {
  return typeof value === 'number';
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isObject(value: any) {
  return typeof value === 'object';
}

export function isUndefined(value: any) {
  return typeof value === 'undefined';
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isSymbol(value: any) {
  return typeof value === 'symbol';
}

export function isPromise(value: any) {
  return isObject(value) && isFunction(value.then) && isFunction(value.catch);
}

export function isDate(value: any) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isInteger(value: any) {
  return Number.isInteger(value);
}

export function isNull(value: any) {
  return value === null;
}
