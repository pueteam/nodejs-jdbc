import { getInstance } from './jinst';

const java = getInstance();

export class DataSource {
  ds: any;
  constructor(
    drivername: string,
    url: string,
    user?: string,
    password?: string,
  ) {
    const DataSource = java.import(drivername);
    this.ds = new DataSource();
    this.ds.setURL(url);
    if (user && typeof this.ds.setUser === 'function') {
      this.ds.setUser(user);
    }
    if (password && typeof this.ds.setPassword === 'function') {
      this.ds.setPassword(password);
    }
  }
  getConnectionDS() {
    return this.ds.getConnectionSync();
  }
}
