export class ResultSetMetaData {
  public _rsmd: any;
  constructor(rsmd) {
    this._rsmd = rsmd;
  }

  getColumnCount(callback) {
    this._rsmd.getColumnCount((err, count) => {
      try {
        if (err) {
          return callback(err);
        }
        return callback(null, count);
      } catch (err) {
        return callback(err);
      }
    });
  }

  getColumnName(column, callback) {
    this._rsmd.getColumnName(column, (err, name) => {
      try {
        if (err) {
          return callback(err);
        }
        return callback(null, name);
      } catch (err) {
        return callback(err);
      }
    });
  }
}
