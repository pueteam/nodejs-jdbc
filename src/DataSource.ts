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
    this.ds.setURLSync(url);
    if (user && typeof this.ds.setUser === 'function') {
      this.ds.setUserSync(user);
    }
    if (password && typeof this.ds.setPassword === 'function') {
      this.ds.setPasswordSync(password);
    }
  }
  getConnectionDS() {
    return this.ds.getConnectionSync();
  }
}
