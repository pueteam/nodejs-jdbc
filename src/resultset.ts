import { getInstance, isJvmCreated, addOption } from './jinst';
import { ResultSetMetaData } from './resultsetmetadata';
import { isNull } from './helper';

const java = getInstance();

if (!isJvmCreated()) {
  addOption('-Xrs');
}

export class ResultSet {
  _rs: any;
  _holdability: any[];
  _types: any[];
  constructor(rs) {
    this._rs = rs;
    this._holdability = (function () {
      const h = [];

      h[
        java.getStaticFieldValue(
          'java.sql.ResultSet',
          'CLOSE_CURSORS_AT_COMMIT',
        )
      ] = 'CLOSE_CURSORS_AT_COMMIT';
      h[
        java.getStaticFieldValue(
          'java.sql.ResultSet',
          'HOLD_CURSORS_OVER_COMMIT',
        )
      ] = 'HOLD_CURSORS_OVER_COMMIT';

      return h;
    })();
    this._types = (function () {
      const typeNames = [];

      typeNames[java.getStaticFieldValue('java.sql.Types', 'BIT')] = 'Boolean';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'TINYINT')] =
        'Short';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'SMALLINT')] =
        'Short';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'INTEGER')] = 'Int';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'BIGINT')] =
        'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'FLOAT')] = 'Float';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'REAL')] = 'Float';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'DOUBLE')] =
        'Double';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'NUMERIC')] =
        'BigDecimal';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'DECIMAL')] =
        'BigDecimal';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'CHAR')] = 'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'VARCHAR')] =
        'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'LONGVARCHAR')] =
        'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'DATE')] = 'Date';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'TIME')] = 'Time';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'TIMESTAMP')] =
        'Timestamp';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'BOOLEAN')] =
        'Boolean';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'NCHAR')] = 'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'NVARCHAR')] =
        'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'LONGNVARCHAR')] =
        'String';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'BINARY')] = 'Bytes';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'VARBINARY')] =
        'Bytes';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'LONGVARBINARY')] =
        'Bytes';
      typeNames[java.getStaticFieldValue('java.sql.Types', 'BLOB')] = 'Bytes';

      return typeNames;
    })();
  }
  toObjArray() {
    return new Promise((resolve, reject) => {
      this.toObject((err, result) => {
        if (err) return reject(err);
        return resolve(result.rows);
      });
    });
  }
  toObject(callback) {
    this.toObjectIter((err, rs) => {
      if (err) return callback(err);

      const rowIter = rs.rows;
      const rows = [];
      let row = rowIter.next();

      while (!row.done) {
        rows.push(row.value);
        row = rowIter.next();
      }

      rs.rows = rows;
      return callback(null, rs);
    });
  }
  toObjectIter(callback) {
    const self = this;

    self.getMetaData((err, rsmd) => {
      if (err) {
        return callback(err);
      }
      const colsmetadata = [];

      rsmd.getColumnCount((err, colcount) => {
        if (err) {
          return callback(err);
        }

        // Get some column metadata.
        for (let i = 1; i <= colcount; i++) {
          colsmetadata.push({
            label: rsmd._rsmd.getColumnLabelSync(i),
            type: rsmd._rsmd.getColumnTypeSync(i),
          });
        }

        callback(null, {
          labels: colsmetadata.map((col) => col.label),
          types: colsmetadata.map((col) => col.type),
          rows: {
            next() {
              let nextRow;
              try {
                nextRow = self._rs.nextSync(); // this row can lead to Java RuntimeException - sould be cathced.
              } catch (error) {
                callback(error);
              }
              if (!nextRow) {
                return {
                  done: true,
                };
              }

              const result = {};

              // loop through each column
              for (let i = 1; i <= colcount; i++) {
                const cmd = colsmetadata[i - 1];
                let type = self._types[cmd.type] || 'String';
                if (type === 'BigDecimal') type = 'Double';
                const getter = `get${type}Sync`;

                switch (type) {
                  case 'Date':
                  case 'Time':
                  case 'Timestamp': {
                    const dateVal = self._rs[getter](cmd.label);
                    result[cmd.label] = dateVal ? dateVal.toString() : null;
                    break;
                  }
                  case isNull(self._rs.getObjectSync(cmd.label)) && 'Int':
                    result[cmd.label] = null;
                    break;
                  default:
                    result[cmd.label] = self._rs[getter](cmd.label);
                    break;
                }
              }

              return {
                value: result,
                done: false,
              };
            },
          },
        });
      });
    });
  }
  close(callback) {
    this._rs.close((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  getMetaData(callback) {
    this._rs.getMetaData((err, rsmd) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSetMetaData(rsmd));
    });
  }
}
