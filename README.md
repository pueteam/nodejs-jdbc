# nodejs-jdbc

JDBC API Wrapper for node.js

## Motivation

This module is based on [node-jdbc](https://github.com/CraZySacX/node-jdbc/tree/master) as a full rewrite to be
adapted to the new Java versions, ESM and Typescript. It tries to be as compatible as possible, but it diverges
to follow a more modern way of doing things.

## Latest Version

- 0.1.1

## Installation

```bash
npm i --save nodejs-jdbc
```

## Usage

- **One JVM Instance**

[node-java](https://github.com/joeferner/node-java) spins up one JVM instance only.  Due to this fact, any JVM options
and classpath setup have to happen before the first java call.

```javascript
import { isJvmCreated, addOption, setupClasspath } from 'nodejs-jdbc';

// isJvmCreated will be true after the first java call.  When this happens, the
// options and classpath cannot be adjusted.
if (!isJvmCreated()) {
  // Add all java options required by your project here.  You get one chance to
  // setup the options before the first java call.
  addOption("-Xrs");
  // Add all jar files required by your project here.  You get one chance to
  // setup the classpath before the first java call.
  setupClasspath(['./drivers/hsqldb.jar',
                        './drivers/derby.jar',
                        './drivers/derbyclient.jar',
                        './drivers/derbytools.jar']);
}
```

- **Connection Pooling**

Everyone gets a pool now.  By default with no extra configuration, the pool
is created with one connection that can be reserved/released.  Currently, the
pool is configured with two options: `minpoolsize` and `maxpoolsize`.  If
`minpoolsize` is set, when the pool is initialized, `minpoolsize` connections
will be created.  If `maxpoolsize` is set (the default value is `minpoolsize`),
and you try and reserve a connection and there aren't any available, the pool
will be grown.  This can happen until `maxpoolsize` connections have been
reserved.  The pool should be initialized after configuration is set with the
`initialize()` function.  JDBC connections can then be acquired with the
`reserve()` function and returned to the pool with the `release()` function.

```javascript
import { JDBC, isJvmCreated, addOption, setupClasspath } from 'nodejs-jdbc';

if (!isJvmCreated()) {
  addOption("-Xrs");
  setupClasspath(['./drivers/hsqldb.jar',
                    './drivers/derby.jar',
                    './drivers/derbyclient.jar',
                    './drivers/derbytools.jar']);
}

const config = {
  url: 'jdbc:hsqldb:hsql://localhost/xdb',
  user : 'SA',
  password: '',
  minpoolsize: 2,
  maxpoolsize: 3
};

const db = new JDBC(config);

// Initialize the pool
await db.initialize();

// Acquire a connection from the pool
const connobj = await db.reserve();
const { conn } = connobj;

// Create a statement
const statement = await conn.createStatement();
const sql = 'select 1';

// Execute the query and get the ResultSet
const rs = await statement.executeQuery(sql);

// Release the connection from the pool
await db.release(connobj);
```

- **Fully Wrapped Connection API**

The Java Connection API is almost completely wrapped.  See
[connection.ts](https://github.com/pueteam/nodejs-jdbc/blob/master/src/connection.ts)
for a the class methods.

- **ResultSet processing separated from statement execution**

ResultSet processing has been separated from statement execution to allow for
more flexibility.  The ResultSet returned from executing a select query can
still be processed into an object array using the `toObjArray()` function on the
resultset object.

```javascript
// Select statement example.
// Execute the query and get the ResultSet
const sql = 'select 1';
const rs = await statement.executeQuery(sql);
const results = await rs.toObjArray();
```

- **Oracle and Closing Statements**

If you are experiencing the "ORA-01000: maximum open cursors exceeded" error, you can avoid it by closing your statements with:

```javascript
statement.close()
```

- **Automatically Closing Idle Connections**

If you pass a **maxidle** property in the config for a new connection pool,
`pool.reserve()` will close stale connections, and will return a sufficiently fresh connection, or a new connection.  **maxidle** can be number representing the maximum number of milliseconds since a connection was last used, that a connection is still considered alive (without making an extra call to the database to check that the connection is valid).  If **maxidle** is a falsy value or is absent from the config, this feature does not come into effect.  This feature is useful, when connections are automatically closed from the server side after a certain period of time, and when it is not appropriate to use the connection keepalive feature.

## Examples

TBD

### Initialize

```javascript
import { JDBC, isJvmCreated, addOption, setupClasspath } from 'nodejs-jdbc';

if (!isJvmCreated()) {
  addOption("-Xrs");
  setupClasspath(['./drivers/hsqldb.jar',
                        './drivers/derby.jar',
                        './drivers/derbyclient.jar',
                        './drivers/derbytools.jar']);
}

const config = {
  // Required
  url: 'jdbc:hsqldb:hsql://localhost/xdb',

  // Optional
  drivername: 'my.jdbc.DriverName',
  minpoolsize: 10,
  maxpoolsize: 100,

  // Note that if you sepecify the user and password as below, they get
  // converted to properties and submitted to getConnection that way.  That
  // means that if your driver doesn't support the 'user' and 'password'
  // properties this will not work.  You will have to supply the appropriate
  // values in the properties object instead.
  user: 'SA',
  password: '',
  properties: {}
};

// or user/password in url
// const config = {
//   // Required
//   url: 'jdbc:hsqldb:hsql://localhost/xdb;user=SA;password=',
//
//   // Optional
//   drivername: 'my.jdbc.DriverName',
//   minpoolsize: 10
//   maxpoolsize: 100,
//   properties: {}
// };

// or user/password in properties
// const config = {
//   // Required
//   url: 'jdbc:hsqldb:hsql://localhost/xdb',
//
//   // Optional
//   drivername: 'my.jdbc.DriverName',
//   minpoolsize: 10,
//   maxpoolsize: 100,
//   properties: {
//     user: 'SA',
//     password: ''
//     // Other driver supported properties can be added here as well.
//   }
// };

const db = new JDBC(config);

// Initialize the pool
await db.initialize();
```

### Reserve Connection, Execute Queries, Release Connection

```javascript
import { JDBC, isJvmCreated, addOption, setupClasspath } from 'nodejs-jdbc';

if (!isJvmCreated()) {
  addOption("-Xrs");
  setupClasspath(['./drivers/hsqldb.jar',
                    './drivers/derby.jar',
                    './drivers/derbyclient.jar',
                    './drivers/derbytools.jar']);
}

const config = {
  url: 'jdbc:hsqldb:hsql://localhost/xdb',
  user : 'SA',
  password: '',
  minpoolsize: 2,
  maxpoolsize: 3
};

const db = new JDBC(config);

// Initialize the pool
await db.initialize();

// Acquire a connection from the pool
const connobj = await db.reserve();
const { conn } = connobj;

// Create a statement
const statement = await conn.createStatement();
const sql = 'select 1';

// Execute the query and get the ResultSet
let rs = await statement.executeQuery(sql);

// Create a table
rs = await statement.executeUpdate("CREATE TABLE blah "
                                  + "(id int, name varchar(10), date DATE, "
                                  + " time TIME, timestamp TIMESTAMP);";

// Insert values
rs = await statement.executeUpdate("INSERT INTO blah "
                                  + "VALUES (1, 'Jason', CURRENT_DATE, "
                                  + "CURRENT_TIME, CURRENT_TIMESTAMP);";

// Update
rs = await statement.executeUpdate("UPDATE blah "
                                  + "SET id = 2 "
                                  + "WHERE name = 'April';";

// Delete
rs = await statement.executeUpdate("DELETE FROM blah "
                                  + "WHERE id = 2;";

// Drop
rs = await statement.executeUpdate("DROP TABLE blah;";

// Release the connection from the pool
await db.release(connobj);
```

## API Documentation

TBD

## License

(The MIT License)

Copyright (c) 2012 Near Infinity Corporation

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.