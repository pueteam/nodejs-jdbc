import { isJvmCreated, addOption } from './jinst';
import {
  IColumnMetaData,
  IResultSetMetaData,
  ResultSetMetaData,
} from './ResultSetMetadata';
import { isNull } from './Helper';

if (!isJvmCreated()) {
  addOption('-Xrs');
}

export interface IResultSet {
  nextSync(): IResultSet;
  getMetaDataSync(): IResultSetMetaData;

  getBooleanSync(columnLabel: string): any;
  getBytesSync(columnLabel: string): any;
  getStringSync(columnLabel: string): any;
  getShortSync(columnLabel: string): any;
  getIntSync(columnLabel: string): any;
  getFloatSync(columnLabel: string): any;
  getDoubleSync(columnLabel: string): any;
  getBigDecimalSync(columnLabel: string): any;
  getDateSync(columnLabel: string): any;
  getTimeSync(columnLabel: string): any;
  getTimestampSync(columnLabel: string): any;
  getObjectSync(columnLabel: string): any;
}

export type IFetchResult = object;

export class ResultSet {
  private resultSet: IResultSet;
  constructor(resultSet: IResultSet) {
    this.resultSet = resultSet;
  }
  next() {
    return this.resultSet.nextSync();
  }
  fetchResult(metas: IColumnMetaData[]): IFetchResult {
    const result: IFetchResult = {};

    for (const meta of metas) {
      if (meta.type.name === 'BigDecimal') meta.type.name = 'Double';
      const getterName = 'get' + meta.type.name + 'Sync';
      if (typeof this.resultSet[getterName] !== 'function') {
        throw new Error(
          `Unknown type getter (${getterName}) for ${meta.type.name} for column ${meta.name} (${meta.label})`,
        );
      }

      switch (true) {
        case meta.type.name === 'Date' ||
          meta.type.name === 'Time' ||
          meta.type.name === 'Timestamp': {
          const dateValue = this.resultSet[`${getterName}`](meta.label);
          result[meta.label] = dateValue ? dateValue.toStringSync() : null;
          break;
        }
        case meta.type.name === 'Int' &&
          isNull(this.resultSet.getObjectSync(meta.label)):
          result[meta.label] = null;
          break;
        default:
          result[meta.label] = this.resultSet[`${getterName}`](meta.label);
          break;
      }
    }

    return result;
  }

  toObjArray(): IFetchResult[] {
    const metas: IColumnMetaData[] = this.getMetaData().getAllColumnMeta();
    const results: IFetchResult[] = [];
    while (this.next()) {
      results.push(this.fetchResult(metas));
    }
    return results;
  }
  getMetaData(): ResultSetMetaData {
    return new ResultSetMetaData(this.resultSet.getMetaDataSync());
  }
}
