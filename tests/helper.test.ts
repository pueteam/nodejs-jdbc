import {
  isNumber,
  isString,
  isObject,
  isUndefined,
  isArray,
  isFunction,
  isBoolean,
  isSymbol,
  isDate,
  isInteger,
  isNull,
} from '../src/Helper';

describe('Helper functions', () => {
  it('should return true if value is a number', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(1.2)).toBe(true);
    expect(isNumber(-1)).toBe(true);
  });

  it('should return false if value is not a number', () => {
    expect(isNumber('1')).toBe(false);
    expect(isNumber('1.2')).toBe(false);
    expect(isNumber('-1')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it('should return true if value is a string', () => {
    expect(isString('1')).toBe(true);
    expect(isString('1.2')).toBe(true);
    expect(isString('-1')).toBe(true);
  });

  it('should return false if value is not a string', () => {
    expect(isString(1)).toBe(false);
    expect(isString(1.2)).toBe(false);
    expect(isString(-1)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  });

  it('should return true if value is an object', () => {
    expect(isObject({})).toBe(true);
  });

  it('should return false if value is not an object', () => {
    expect(isObject(1)).toBe(false);
    expect(isObject(1.2)).toBe(false);
    expect(isObject(-1)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  it('should return true if value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return false if value is not undefined', () => {
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(1.2)).toBe(false);
    expect(isUndefined(-1)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(null)).toBe(false);
  });

  it('should return true if value is an array', () => {
    expect(isArray([])).toBe(true);
  });

  it('should return false if value is not an array', () => {
    expect(isArray(1)).toBe(false);
    expect(isArray(1.2)).toBe(false);
    expect(isArray(-1)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });

  it('should return true if value is a function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('should return false if value is not a function', () => {
    expect(isFunction(1)).toBe(false);
    expect(isFunction(1.2)).toBe(false);
    expect(isFunction(-1)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
  });

  it('should return true if value is a boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('should return false if value is not a boolean', () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(1.2)).toBe(false);
    expect(isBoolean(-1)).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
  });

  it('should return true if value is a symbol', () => {
    expect(isSymbol(Symbol())).toBe(true);
  });

  it('should return false if value is not a symbol', () => {
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(1.2)).toBe(false);
    expect(isSymbol(-1)).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(false)).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
  });

  it('should return true if value is a date', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('should return false if value is not a date', () => {
    expect(isDate(1)).toBe(false);
    expect(isDate(1.2)).toBe(false);
    expect(isDate(-1)).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(false)).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  it('should return true if value is an integer', () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(-1)).toBe(true);
  });

  it('should return false if value is not an integer', () => {
    expect(isInteger(1.2)).toBe(false);
    expect(isInteger(-1.2)).toBe(false);
    expect(isInteger(true)).toBe(false);
    expect(isInteger(false)).toBe(false);
    expect(isInteger([])).toBe(false);
    expect(isInteger({})).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
  });

  it('should return true if value is null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should return false if value is not null', () => {
    expect(isNull(1)).toBe(false);
    expect(isNull(1.2)).toBe(false);
    expect(isNull(-1)).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull(undefined)).toBe(false);
  });
});
