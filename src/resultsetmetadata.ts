export class ResultSetMetaData {
  public rsmd: any;

  constructor(rsmd: any) {
    this.rsmd = rsmd;
  }

  getColumnCount(callback) {
    this.rsmd.getColumnCount((err, count) => {
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
    this.rsmd.getColumnName(column, (err, name) => {
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
