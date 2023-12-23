import { ResultSetMetaData } from './resultsetmetadata';
import { isNull } from './helper';
import { getInstance, isJvmCreated, addOption } from './jinst';

const java = getInstance();

if (!isJvmCreated()) {
  addOption('-Xrs');
}

export class ResultSet {
  private rs: any;
  private holdability: any;
  private types: any;

  constructor(rs: any) {
    this.rs = rs;
    this.holdability = (function () {
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
    this.types = (function () {
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
  toObjArray(): Promise<any> {
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
    this.getMetaData((err, rsmd) => {
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
            label: rsmd.rsmd.getColumnLabelSync(i),
            type: rsmd.rsmd.getColumnTypeSync(i),
          });
        }

        callback(null, {
          labels: colsmetadata.map((col) => col.label),
          types: colsmetadata.map((col) => col.type),
          rows: {
            next() {
              let nextRow: any;
              try {
                nextRow = this.rs.nextSync(); // this row can lead to Java RuntimeException - sould be cathced.
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
                let type = this.types[cmd.type] || 'String';
                if (type === 'BigDecimal') type = 'Double';
                const getter = `get${type}Sync`;

                if (
                  type === 'Date' ||
                  type === 'Time' ||
                  type === 'Timestamp'
                ) {
                  const dateVal = this.rs[getter](cmd.label);
                  result[cmd.label] = dateVal ? dateVal.toString() : null;
                } else {
                  // If the column is an integer and is null, set result to null and continue
                  if (
                    type === 'Int' &&
                    isNull(this.rs.getObjectSync(cmd.label))
                  ) {
                    result[cmd.label] = null;
                    return;
                  }

                  result[cmd.label] = this.rs[getter](cmd.label);
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
    this.rs.close((err) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
  getMetaData(callback) {
    this.rs.getMetaData((err, rsmd) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSetMetaData(rsmd));
    });
  }
}
