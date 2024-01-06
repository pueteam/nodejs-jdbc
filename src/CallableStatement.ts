import { IPreparedStatement, PreparedStatement } from './PreparedStatement';
import PromisifyAll from './PromisifyAll';
import { getInstance } from './jinst';

export interface ICallableStatement extends IPreparedStatement {
  getObjectSync: any;
  getNStringSync(arg: string | number): string;
  getNClobSync(arg: string | number): any;
  getFloatSync(arg: string | number): any;
  getLongSync(arg: string | number): any;
  getDoubleSync(arg: string | number): any;
  getDateSync(arg: string | number): any;
  getClobSync(arg: string | number): any;
  getBytesSync(arg: string | number): any;
  getByteSync(arg: string | number): any;
  getBooleanSync(arg: string | number): any;
  getBlobSync(arg: string | number): any;
  getBigDecimalSync(arg: string | number): any;
  getArraySync(arg: string | number): any;
  registerOutParameterSync(index: number, type: string): void;
  getStringSync(index: number): string;
  getIntSync(index: number): number;
}

export class CallableStatement extends PreparedStatement {
  private cs: ICallableStatement;

  constructor(statement: ICallableStatement) {
    super(statement);
    this.cs = PromisifyAll(statement) as ICallableStatement;
  }

  getArray(arg: number | string): any {
    return this.cs.getArraySync(arg);
  }

  getBigDecimal(arg: number | string): any {
    return this.cs.getBigDecimalSync(arg);
  }

  getBlob(arg: number | string): any {
    return this.cs.getBlobSync(arg);
  }

  getBoolean(arg: number | string): any {
    return this.cs.getBooleanSync(arg);
  }

  getByte(arg: number | string): any {
    return this.cs.getByteSync(arg);
  }

  getBytes(arg: number | string): any {
    return this.cs.getBytesSync(arg);
  }

  getCharacterStream(arg1, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }

  getClob(arg: number | string): any {
    return this.cs.getClobSync(arg);
  }

  getDate(arg: number | string): any {
    return this.cs.getDateSync(arg);
  }

  getDouble(arg: number | string): any {
    return this.cs.getDoubleSync(arg);
  }
  getFloat(arg: number | string): any {
    return this.cs.getFloatSync(arg);
  }
  getInt(index: number): number {
    return this.cs.getIntSync(index);
  }
  getLong(arg: number | string): number {
    return this.cs.getLongSync(arg);
  }

  getNCharacterStream(arg1, callback) {
    return callback(new Error('NOT IMPLEMENTED'));
  }

  getNClob(arg: number | string): any {
    return this.cs.getNClobSync(arg);
  }
  getNString(arg: number | string): string {
    return this.cs.getNStringSync(arg);
  }
  getObject(arg: number | string): any {
    return this.cs.getObjectSync(arg);
  }

  registerOutParameter(index: number, type: string): void {
    this.cs.registerOutParameterSync(index, this.getType(type));
  }

  getType(type: string) {
    return getInstance().java.getStaticFieldValue('java.sql.Types', type);
  }
}
