import { IResultSet, ResultSet } from './ResultSet';
import { Connection } from './Connection';
import { getInstance, events } from './jinst';
import {
  isArray,
  isBoolean,
  isInteger,
  isNull,
  isString,
  isUndefined,
} from './Helper';
import PromisifyAll from './PromisifyAll';

const java = getInstance();

export interface IDatabaseMetadata {}

export class DatabaseMetaData {
  private dbm: any;
  constructor(databaseMetaData: IDatabaseMetadata) {
    this.dbm = PromisifyAll(databaseMetaData) as IDatabaseMetadata;
  }

  /**
   * Retrieves the schema names available in this database.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @returns {ResultSet} ResultSet object in which each row is a schema description
   */
  async getSchemas(
    catalog?: string,
    schemaPattern?: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      if (catalog) {
        this.dbm
          .getSchemasAsync(catalog, schemaPattern)
          .then((result: IResultSet) => {
            return resolve(new ResultSet(result));
          })
          .catch((error) => {
            return reject(error);
          });
      }
      this.dbm
        .getSchemasAsync()
        .then((result: IResultSet) => {
          return resolve(new ResultSet(result));
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Retrieves a description of the tables available in the given catalog.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @param {String[]} types -  A list of table types, which must be from the list of table types returned from getTableTypes(),to include; null returns all types
   * @returns {ResultSet} each row is a table description
   */

  async getTables(
    catalog?: string,
    schemaPattern?: string,
    tableNamePattern?: string,
    types?: string[],
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getTablesAsync(catalog, schemaPattern, tableNamePattern, types)
        .then((result: IResultSet) => {
          return resolve(new ResultSet(result));
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Retrieves whether the current user can call all the procedures returned by
   * the method getProcedures.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  allProceduresAreCallable(): boolean {
    return this.dbm.allProceduresAreCallableSync();
  }

  /**
   * Retrieves whether the current user can use all the tables returned by the
   * method getTables in a SELECT statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  allTablesAreSelectable(): boolean {
    return this.dbm.allTablesAreSelectableSync();
  }

  /**
   * Retrieves whether a SQLException while autoCommit is true indicates that all
   * open ResultSets are closed, even ones that are holdable.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  autoCommitFailureClosesAllResultSets(): boolean {
    return this.dbm.autoCommitFailureClosesAllResultSetsSync();
  }

  /**
   * Retrieves whether a data definition statement within a transaction forces
   * the transaction to commit.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  dataDefinitionCausesTransactionCommit(): boolean {
    return this.dbm.dataDefinitionCausesTransactionCommitSync();
  }

  /**
   * Retrieves whether this database ignores a data definition statement within a
   * transaction.
   *
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  dataDefinitionIgnoredInTransactions(): boolean {
    return this.dbm.dataDefinitionIgnoredInTransactionsSync();
  }

  /**
   * Retrieves whether or not a visible row delete can be detected by calling the
   * method ResultSet.rowDeleted.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if deletes are detected by the given result set type; false otherwise
   */
  deletesAreDetected(type: number): boolean {
    return this.dbm.deletesAreDetectedSync(type);
  }

  /**
   * Retrieves whether the return value for the method getMaxRowSize includes the
   * SQL data types LONGVARCHAR and LONGVARBINARY.
   *
   * @returns {Boolean}true if so; false otherwise
   */
  doesMaxRowSizeIncludeBlobs(): boolean {
    return this.dbm.doesMaxRowSizeIncludeBlobsSync();
  }

  /**
   * Retrieves whether a generated key will always be returned if the column
   * name(s) or index(es) specified for the auto generated key column(s) are
   * valid and the statement succeeds.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  generatedKeyAlwaysReturned(): boolean {
    return this.dbm.generatedKeyAlwaysReturnedSync();
  }

  /**
   * Retrieves a description of the given attribute of the given type for a
   * user-defined type (UDT) that is available in the given schema and catalog.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} typeNamePattern - A type name pattern; must match the type name as it is stored in the database
   * @param {String} attributeNamePattern - An attribute name pattern; must match the attribute name as it is declared in the database
   * @returns {Promise<ResultSet>} a ResultSet object in which each row is an attribute description
   */
  async getAttributes(
    catalog: string,
    schemaPattern: string,
    typeNamePattern: string,
    attributeNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getAttributesAsync(
          catalog,
          schemaPattern,
          typeNamePattern,
          attributeNamePattern,
        )
        .then((result: IResultSet) => {
          return resolve(new ResultSet(result));
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Retrieves a description of a table's optimal set of columns that uniquely
   * identifies a row.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in the database
   * @param {Number} scope - The scope of interest; use same values as SCOPE
   * @param {Boolean} nullable - Include columns that are nullable
   * @returns {Promise<ResultSet>} each row is a column description
   */
  async getBestRowIdentifier(
    catalog: string,
    schema: string,
    table: string,
    scope: number,
    nullable: boolean,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getBestRowIdentifierAsync(catalog, schema, table, scope, nullable)
        .then((result: IResultSet) => {
          return resolve(new ResultSet(result));
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Retrieves the catalog names available in this database.
   *
   * @returns {Promise<ResultSet>} a ResultSet object in which each row has a single String column that is a catalog name
   */
  async getCatalogs(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getCatalogsAsync()
        .then((result: IResultSet) => {
          return resolve(new ResultSet(result));
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Retrieves the String that this database uses as the separator between a
   * catalog and table name.
   *
   * @returns {String} the separator string
   */
  getCatalogSeparator(): string {
    return this.dbm.getCatalogSeparatorSync();
  }

  /**
   * Retrieves the database vendor's preferred term for "catalog".
   *
   * @returns {String} the vendor term for "catalog"
   */
  getCatalogTerm() {
    return this.dbm.getCatalogTermSync();
  }

  /**
   * Retrieves a list of the client info properties that the driver supports.
   *
   * @returns {Promise<ResultSet>} A ResultSet object; each row is a supported client info property
   */
  async getClientInfoProperties(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getClientInfoPropertiesAsync()
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves a description of the access rights for a table's columns.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @returns {Promise<ResultSet>} Via callback: each row is a column privilege description
   */
  async getColumnPrivileges(
    catalog: string,
    schema: string,
    table: string,
    columnNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getColumnPrivilegesAsync(catalog, schema, table, columnNamePattern)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves a description of table columns available in the specified catalog.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a column description
   */
  getColumns(
    catalog,
    schemaPattern,
    tableNamePattern,
    columnNamePattern,
    callback,
  ) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(tableNamePattern) ||
        isUndefined(tableNamePattern) ||
        isString(tableNamePattern)) &&
      (isNull(columnNamePattern) ||
        isUndefined(columnNamePattern) ||
        isString(columnNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getColumns(
      catalog,
      schemaPattern,
      tableNamePattern,
      columnNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the connection that produced this metadata object.
   *
   * @param {Function} callback
   * @returns {Connection} Via callback: the connection that produced this metadata object
   */
  getConnection(callback) {
    this.dbm.getConnection((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new Connection(result));
    });
  }

  /**
   * Retrieves a description of the foreign key columns in the given foreign key
   * table that reference the primary key or the columns representing a unique
   * constraint of the parent table (could be the same or a different table).
   *
   * @param {String} parentCatalog - A catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means drop catalog name from the selection criteria
   * @param {String} parentSchema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means drop schema name from the selection criteria
   * @param {String} parentTable - The name of the table that exports the key; must match the table name as it is stored in the database
   * @param {String} foreignCatalog - A catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means drop catalog name from the selection criteria
   * @param {String} foreignSchema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means drop schema name from the selection criteria
   * @param {String} foreignTable - The name of the table that imports the key; must match the table name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a foreign key column description
   */
  getCrossReference(
    parentCatalog,
    parentSchema,
    parentTable,
    foreignCatalog,
    foreignSchema,
    foreignTable,
    callback,
  ) {
    const validParams =
      (isNull(parentCatalog) ||
        isUndefined(parentCatalog) ||
        isString(parentCatalog)) &&
      (isNull(parentSchema) ||
        isUndefined(parentSchema) ||
        isString(parentSchema)) &&
      isString(parentTable) &&
      (isNull(foreignCatalog) ||
        isUndefined(foreignCatalog) ||
        isString(foreignCatalog)) &&
      (isNull(foreignSchema) ||
        isUndefined(foreignSchema) ||
        isString(foreignSchema)) &&
      isString(foreignTable);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getCrossReference(
      parentCatalog,
      parentSchema,
      parentTable,
      foreignCatalog,
      foreignSchema,
      foreignTable,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the major version number of the underlying database.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the underlying database's major version
   */
  getDatabaseMajorVersion(callback) {
    this.dbm.getDatabaseMajorVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the minor version number of the underlying database.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: underlying database's minor version
   */
  getDatabaseMinorVersion(callback) {
    this.dbm.getDatabaseMinorVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the name of this database product.
   *
   * @param {Function} callback
   * @returns {String} Via callback: database product name
   */
  getDatabaseProductName(callback) {
    this.dbm.getDatabaseProductName((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the version number of this database product.
   *
   * @param {Function} callback
   * @returns {String} Via callback: database version number
   */
  getDatabaseProductVersion(callback) {
    this.dbm.getDatabaseProductVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves this database's default transaction isolation level.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the default isolation level
   */
  getDefaultTransactionIsolation(callback) {
    this.dbm.getDefaultTransactionIsolation((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves this JDBC driver's major version number.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: JDBC driver major version
   */
  getDriverMajorVersion(callback) {
    this.dbm.getDriverMajorVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves this JDBC driver's minor version number.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: JDBC driver minor version
   */
  getDriverMinorVersion(callback) {
    this.dbm.getDriverMinorVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the name of this JDBC driver.
   *
   * @param {Function} callback
   * @returns {String} Via callback: JDBC driver name
   */
  getDriverName(callback) {
    this.dbm.getDriverName((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the version number of this JDBC driver as a String.
   *
   * @param {Function} callback
   * @returns {String} Via callback: JDBC driver version
   */
  getDriverVersion(callback) {
    this.dbm.getDriverVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the foreign key columns that reference the given
   * table's primary key columns (the foreign keys exported by a table).
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: a ResultSet object in which each row is a foreign key column description
   */
  getExportedKeys(catalog, schema, table, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schema) || isUndefined(schema) || isString(schema)) &&
      isString(table);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getExportedKeys(catalog, schema, table, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(result));
    });
  }

  /**
   * Retrieves all the "extra" characters that can be used in unquoted identifier
   * names (those beyond a-z, A-Z, 0-9 and _).
   *
   * @param {Function} callback
   * @returns {String} Via callback: the string containing the extra characters
   */
  getExtraNameCharacters(callback) {
    this.dbm.getExtraNameCharacters((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the given catalog's system or user function
   * parameters and return type.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} functionNamePattern - A procedure name pattern; must match the function name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row describes a user function parameter, column or return type
   */
  getFunctionColumns(
    catalog,
    schemaPattern,
    functionNamePattern,
    columnNamePattern,
    callback,
  ) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(functionNamePattern) ||
        isUndefined(functionNamePattern) ||
        isString(functionNamePattern)) &&
      (isNull(columnNamePattern) ||
        isUndefined(columnNamePattern) ||
        isString(columnNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getFunctionColumns(
      catalog,
      schemaPattern,
      functionNamePattern,
      columnNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves a description of the system and user functions available in the
   * given catalog.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} functionNamePattern - A procedure name pattern; must match the function name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a function description
   */
  getFunctions(catalog, schemaPattern, functionNamePattern, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(functionNamePattern) ||
        isUndefined(functionNamePattern) ||
        isString(functionNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getFunctions(
      catalog,
      schemaPattern,
      functionNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the string used to quote SQL identifiers.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the quoting string or a space if quoting is not supported
   */
  getIdentifierQuoteString(callback) {
    this.dbm.getIdentifierQuoteString((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the primary key columns that are referenced by
   * the given table's foreign key columns (the primary keys imported by a
   * table).
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a primary key column description
   */
  getImportedKeys(catalog, schema, table, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schema) || isUndefined(schema) || isString(schema)) &&
      isString(table);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getImportedKeys(catalog, schema, table, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(result));
    });
  }

  /**
   * Retrieves a description of the given table's indices and statistics.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @param {Boolean} unique - When true, return only indices for unique values; when false, return indices regardless of whether unique or not
   * @param {Boolean} approximate - When true, result is allowed to reflect approximate or out of data values; when false, results are requested to be accurate
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is an index column description
   */
  getIndexInfo(catalog, schema, table, unique, approximate, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schema) || isUndefined(schema) || isString(schema)) &&
      isString(table) &&
      isBoolean(unique) &&
      isBoolean(approximate);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getIndexInfo(
      catalog,
      schema,
      table,
      unique,
      approximate,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the major JDBC version number for this driver.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: JDBC version major number
   */
  getJDBCMajorVersion(callback) {
    this.dbm.getJDBCMajorVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the minor JDBC version number for this driver.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: JDBC version minor number
   */
  getJDBCMinorVersion(callback) {
    this.dbm.getJDBCMinorVersion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of hex characters this database allows in an
   * inline binary literal.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum length (in hex characters) for a binary literal; a result of zero means that there is no limit or the limit is not known
   */
  getMaxBinaryLiteralLength(callback) {
    this.dbm.getMaxBinaryLiteralLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * catalog name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed in a catalog name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxCatalogNameLength(callback) {
    this.dbm.getMaxCatalogNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters this database allows for a
   * character literal.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed for a character literal; a result of zero means that there is no limit or the limit is not known
   */
  getMaxCharLiteralLength(callback) {
    this.dbm.getMaxCharLiteralLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters this database allows for a column
   * name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed for a column name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnNameLength(callback) {
    this.dbm.getMaxColumnNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of columns this database allows in a GROUP BY
   * clause.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInGroupBy(callback) {
    this.dbm.getMaxColumnsInGroupBy((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of columns this database allows in an index.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInIndex(callback) {
    this.dbm.getMaxColumnsInIndex((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of columns this database allows in an ORDER BY
   * clause.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInOrderBy(callback) {
    this.dbm.getMaxColumnsInOrderBy((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of columns this database allows in a SELECT
   * list.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInSelect(callback) {
    this.dbm.getMaxColumnsInSelect((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of columns this database allows in a table.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInTable(callback) {
    this.dbm.getMaxColumnsInTable((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of concurrent connections to this database that
   * are possible.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of active connections possible at one time; a result of zero means that there is no limit or the limit is not known
   */
  getMaxConnections(callback) {
    this.dbm.getMaxConnections((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * cursor name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed in a cursor name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxCursorNameLength(callback) {
    this.dbm.getMaxCursorNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of bytes this database allows for an index,
   * including all of the parts of the index.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of bytes allowed; this limit includes the composite of all the constituent parts of the index; a result of zero means that there is no limit or the limit is not known
   */
  getMaxIndexLength(callback) {
    this.dbm.getMaxIndexLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * procedure name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed in a procedure name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxProcedureNameLength(callback) {
    this.dbm.getMaxProcedureNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of bytes this database allows in a single row.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of bytes allowed for a row; a result of zero means that there is no limit or the limit is not known
   */
  getMaxRowSize(callback) {
    this.dbm.getMaxRowSize((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * schema name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed in a schema name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxSchemaNameLength(callback) {
    this.dbm.getMaxSchemaNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters this database allows in an SQL
   * statement.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed for an SQL statement; a result of zero means that there is no limit or the limit is not known
   */
  getMaxStatementLength(callback) {
    this.dbm.getMaxStatementLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of active statements to this database that can
   * be open at the same time.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of statements that can be open at one time; a result of zero means that there is no limit or the limit is not known
   */
  getMaxStatements(callback) {
    this.dbm.getMaxStatements((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters this database allows in a table
   * name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed for a table name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxTableNameLength(callback) {
    this.dbm.getMaxTableNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of tables this database allows in a SELECT
   * statement.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of tables allowed in a SELECT statement; a result of zero means that there is no limit or the limit is not known
   */
  getMaxTablesInSelect(callback) {
    this.dbm.getMaxTablesInSelect((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the maximum number of characters this database allows in a user
   * name.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the maximum number of characters allowed for a user name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxUserNameLength(callback) {
    this.dbm.getMaxUserNameLength((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a comma-separated list of math functions available with this
   * database.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the list of math functions supported by this database
   */
  getNumericFunctions(callback) {
    this.dbm.getNumericFunctions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the given table's primary key columns.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a primary key column description
   */
  getPrimaryKeys(catalog, schema, table, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schema) || isUndefined(schema) || isString(schema)) &&
      isString(table);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getPrimaryKeys(catalog, schema, table, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(result));
    });
  }

  /**
   * Retrieves a description of the given catalog's stored procedure parameter
   * and result columns.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} procedureNamePattern - A procedure name pattern; must match the procedure name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row describes a stored procedure parameter or column
   */
  getProcedureColumns(
    catalog,
    schemaPattern,
    procedureNamePattern,
    columnNamePattern,
    callback,
  ) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(procedureNamePattern) ||
        isUndefined(procedureNamePattern) ||
        isString(procedureNamePattern)) &&
      (isNull(columnNamePattern) ||
        isUndefined(columnNamePattern) ||
        isString(columnNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getProcedureColumns(
      catalog,
      schemaPattern,
      procedureNamePattern,
      columnNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves a description of the stored procedures available in the given
   * catalog.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} procedureNamePattern - A procedure name pattern; must match the procedure name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a procedure description
   */
  getProcedures(catalog, schemaPattern, procedureNamePattern, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(procedureNamePattern) ||
        isUndefined(procedureNamePattern) ||
        isString(procedureNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getProcedures(
      catalog,
      schemaPattern,
      procedureNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the database vendor's preferred term for "procedure".
   *
   * @param {Function} callback
   * @returns {String} Via callback: the vendor term for "procedure"
   */
  getProcedureTerm(callback) {
    this.dbm.getProcedureTerm((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the pseudo or hidden columns available in a given
   * table within the specified catalog and schema.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a column description
   */
  getPseudoColumns(
    catalog,
    schemaPattern,
    tableNamePattern,
    columnNamePattern,
    callback,
  ) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(tableNamePattern) ||
        isUndefined(tableNamePattern) ||
        isString(tableNamePattern)) &&
      (isNull(columnNamePattern) ||
        isUndefined(columnNamePattern) ||
        isString(columnNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getPseudoColumns(
      catalog,
      schemaPattern,
      tableNamePattern,
      columnNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves this database's default holdability for ResultSet objects.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the default holdability; either ResultSet.HOLD_CURSORS_OVER_COMMIT or ResultSet.CLOSE_CURSORS_AT_COMMIT
   */
  getResultSetHoldability(callback) {
    this.dbm.getResultSetHoldability((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Indicates whether or not this data source supports the SQL ROWID type, and
   * if so the lifetime for which a RowId object remains valid.
   *
   * NOTE: This method should be used with caution for now. The RowIdLifetime object
   * returned is a Java object and is not wrapped by the node-jdbc library.
   *
   * @param {Function} callback
   * @returns {RowIdLifetime} Via callback: the status indicating the lifetime of a RowId
   */
  getRowIdLifetime(callback) {
    this.dbm.getRowIdLifetime((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the database vendor's preferred term for "schema".
   *
   * @param {Function} callback
   * @returns {String} Via callback: the vendor term for "schema"
   */
  getSchemaTerm(callback) {
    this.dbm.getSchemaTerm((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the string that can be used to escape wildcard characters.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the string used to escape wildcard characters
   */
  getSearchStringEscape(callback) {
    this.dbm.getSearchStringEscape((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a comma-separated list of all of this database's SQL keywords that
   * are NOT also SQL:2003 keywords.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the list of this database's keywords that are not also SQL:2003 keywords
   */
  getSQLKeywords(callback) {
    this.dbm.getSQLKeywords((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Indicates whether the SQLSTATE returned by SQLException.getSQLState is
   * X/Open (now known as Open Group) SQL CLI or SQL:2003.
   *
   * @param {Function} callback
   * @returns {Number} Via callback: the type of SQLSTATE; one of: sqlStateXOpen or sqlStateSQL
   */
  getSQLStateType(callback) {
    this.dbm.getSQLStateType((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a comma-separated list of string functions available with this
   * database.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the list of string functions supported by this database
   */
  getStringFunctions(callback) {
    this.dbm.getStringFunctions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the table hierarchies defined in a particular
   * schema in this database.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: a ResultSet object in which each row is a type description
   */
  getSuperTables(catalog, schemaPattern, tableNamePattern, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(tableNamePattern) ||
        isUndefined(tableNamePattern) ||
        isString(tableNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getSuperTables(
      catalog,
      schemaPattern,
      tableNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves a description of the user-defined type (UDT) hierarchies defined
   * in a particular schema in this database.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} typeNamePattern - A UDT name pattern; may be a fully-qualified name
   * @param {Function} callback
   * @returns {ResultSet} Via callback: a ResultSet object in which a row gives information about the designated UDT
   */
  getSuperTypes(catalog, schemaPattern, typeNamePattern, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(typeNamePattern) ||
        isUndefined(typeNamePattern) ||
        isString(typeNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getSuperTypes(
      catalog,
      schemaPattern,
      typeNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves a comma-separated list of system functions available with this
   * database.
   *
   * @param {Function} callback
   * @returns {String} Via callback: a list of system functions supported by this database
   */
  getSystemFunctions(callback) {
    this.dbm.getSystemFunctions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of the access rights for each table available in a
   * catalog.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: each row is a table privilege description
   */
  getTablePrivileges(catalog, schemaPattern, tableNamePattern, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(tableNamePattern) ||
        isUndefined(tableNamePattern) ||
        isString(tableNamePattern));

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getTablePrivileges(
      catalog,
      schemaPattern,
      tableNamePattern,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the table types available in this database.
   *
   * @param {Function} callback
   * @returns {ResultSet} Via callback: a ResultSet object in which each row has a single String column that is a table type
   */
  getTableTypes(callback) {
    this.dbm.getTableTypes((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(result));
    });
  }

  /**
   * Retrieves a comma-separated list of the time and date functions available
   * with this database.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the list of time and date functions supported by this database
   */
  getTimeDateFunctions(callback) {
    this.dbm.getTimeDateFunctions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of all the data types supported by this database.
   *
   * @param {Function} callback
   * @returns {ResultSet} Via callback: a ResultSet object in which each row is an SQL type description
   */
  getTypeInfo(callback) {
    this.dbm.getTypeInfo((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(result));
    });
  }

  /**
   * Retrieves a description of the user-defined types (UDTs) defined in a
   * particular schema.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} typeNamePattern - A UDT name pattern; may be a fully-qualified name
   * @param {Number[]} types - A list of user-defined types (JAVA_OBJECT, STRUCT, or DISTINCT) to include; null returns all types
   * @param {Function} callback
   * @returns {ResultSet} Via callback: ResultSet object in which each row describes a UDT
   */
  getUDTs(catalog, schemaPattern, typeNamePattern, types, callback) {
    let validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schemaPattern) ||
        isUndefined(schemaPattern) ||
        isString(schemaPattern)) &&
      (isNull(typeNamePattern) ||
        isUndefined(typeNamePattern) ||
        isString(typeNamePattern)) &&
      (isNull(types) || isUndefined(types) || isArray(types));

    if (isArray(types)) {
      types.forEach((type) => {
        if (!isInteger(type)) {
          validParams = false;
        }
      });
    }

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getUDTs(
      catalog,
      schemaPattern,
      typeNamePattern,
      types,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, new ResultSet(result));
      },
    );
  }

  /**
   * Retrieves the URL for this DBMS.
   *
   * @param {Function} callback
   * @returns {String} Via callback: the URL for this DBMS or null if it cannot be generated
   */
  getURL(callback) {
    this.dbm.getURL((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves the user name as known to this database.
   *
   * @param {Function} callback
   * @returns {String} Via callback: Retrieves the user name as known to this database
   */
  getUserName(callback) {
    this.dbm.getUserName((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves a description of a table's columns that are automatically updated
   * when any value in a row is updated.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @param {Function} callback
   * @returns {ResultSet} Via callback: a ResultSet object in which each row is a column description
   */
  getVersionColumns(catalog, schema, table, callback) {
    const validParams =
      (isNull(catalog) || isUndefined(catalog) || isString(catalog)) &&
      (isNull(schema) || isUndefined(schema) || isString(schema)) &&
      isString(table);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.getVersionColumns(catalog, schema, table, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, new ResultSet(result));
    });
  }

  /**
   * Retrieves whether or not a visible row insert can be detected by calling the
   * method ResultSet.rowInserted.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if changes are detected by the specified result set type; false otherwise
   */
  insertsAreDetected(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.insertsAreDetected(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a catalog appears at the start of a fully qualified table
   * name.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  isCatalogAtStart(callback) {
    this.dbm.isCatalogAtStart((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database is in read-only mode.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  isReadOnly(callback) {
    this.dbm.isReadOnly((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Indicates whether updates made to a LOB are made on a copy or directly to
   * the LOB.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if updates are made to a copy of the LOB; false if updates are made directly to the LOB
   */
  locatorsUpdateCopy(callback) {
    this.dbm.locatorsUpdateCopy((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports concatenations between NULL and
   * non-NULL values being NULL.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  nullPlusNonNullIsNull(callback) {
    this.dbm.nullPlusNonNullIsNull((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether NULL values are sorted at the end regardless of sort
   * order.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  nullsAreSortedAtEnd(callback) {
    this.dbm.nullsAreSortedAtEnd((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether NULL values are sorted at the start regardless of sort
   * order.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  nullsAreSortedAtStart(callback) {
    this.dbm.nullsAreSortedAtStart((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether NULL values are sorted high.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  nullsAreSortedHigh(callback) {
    this.dbm.nullsAreSortedHigh((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether NULL values are sorted low.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  nullsAreSortedLow(callback) {
    this.dbm.nullsAreSortedLow((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether deletes made by others are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if deletes made by others are visible for the given result set type; false otherwise
   */
  othersDeletesAreVisible(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.othersDeletesAreVisible(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether inserts made by others are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if inserts made by others are visible for the given result set type; false otherwise
   */
  othersInsertsAreVisible(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.othersInsertsAreVisible(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether updates made by others are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if updates made by others are visible for the given result set type; false otherwise
   */
  othersUpdatesAreVisible(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.othersUpdatesAreVisible(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a result set's own deletes are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if deletes are visible for the given result set type; false otherwise
   */
  ownDeletesAreVisible(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.ownDeletesAreVisible(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a result set's own inserts are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if inserts are visible for the given result set type; false otherwise
   */
  ownInsertsAreVisible(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.ownInsertsAreVisible(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether for the given type of ResultSet object, the result set's
   * own updates are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if updates are visible for the given result set type; false otherwise
   */
  ownUpdatesAreVisible(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.ownUpdatesAreVisible(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case insensitive and stores them in lower case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  storesLowerCaseIdentifiers(callback) {
    this.dbm.storesLowerCaseIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case insensitive and stores them in lower case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  storesLowerCaseQuotedIdentifiers(callback) {
    this.dbm.storesLowerCaseQuotedIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case insensitive and stores them in mixed case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  storesMixedCaseIdentifiers(callback) {
    this.dbm.storesMixedCaseIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case insensitive and stores them in mixed case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  storesMixedCaseQuotedIdentifiers(callback) {
    this.dbm.storesMixedCaseQuotedIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case insensitive and stores them in upper case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  storesUpperCaseIdentifiers(callback) {
    this.dbm.storesUpperCaseIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case insensitive and stores them in upper case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  storesUpperCaseQuotedIdentifiers(callback) {
    this.dbm.storesUpperCaseQuotedIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports ALTER TABLE with add column.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsAlterTableWithAddColumn(callback) {
    this.dbm.supportsAlterTableWithAddColumn((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports ALTER TABLE with drop column.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsAlterTableWithDropColumn(callback) {
    this.dbm.supportsAlterTableWithDropColumn((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the ANSI92 entry level SQL grammar.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsANSI92EntryLevelSQL(callback) {
    this.dbm.supportsANSI92EntryLevelSQL((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the ANSI92 full SQL grammar
   * supported.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsANSI92FullSQL(callback) {
    this.dbm.supportsANSI92FullSQL((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the ANSI92 intermediate SQL grammar
   * supported.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsANSI92IntermediateSQL(callback) {
    this.dbm.supportsANSI92IntermediateSQL((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports batch updates.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if this database supports batch upcates; false otherwise
   */
  supportsBatchUpdates(callback) {
    this.dbm.supportsBatchUpdates((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a catalog name can be used in a data manipulation
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCatalogsInDataManipulation(callback) {
    this.dbm.supportsCatalogsInDataManipulation((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a catalog name can be used in an index definition
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCatalogsInIndexDefinitions(callback) {
    this.dbm.supportsCatalogsInIndexDefinitions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a catalog name can be used in a privilege definition
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCatalogsInPrivilegeDefinitions(callback) {
    this.dbm.supportsCatalogsInPrivilegeDefinitions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a catalog name can be used in a procedure call statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCatalogsInProcedureCalls(callback) {
    this.dbm.supportsCatalogsInProcedureCalls((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a catalog name can be used in a table definition
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCatalogsInTableDefinitions(callback) {
    this.dbm.supportsCatalogsInTableDefinitions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports column aliasing.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsColumnAliasing(callback) {
    this.dbm.supportsColumnAliasing((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the JDBC scalar function CONVERT
   * for the conversion of one JDBC type to another, or between the JDBC types
   * fromType and toType if both are given.
   *
   * @param {Number} [fromType] - The type to convert from; one of the type codes from the class java.sql.Types
   * @param {Number} [toType] - The type to convert to; one of the type codes from the class java.sql.Types
   * @param {Function} callback
   * @returns {Boolean}  Via callback: true if so; false otherwise
   */
  supportsConvert(fromType, toType, callback) {
    const validParams = isInteger(fromType) && isInteger(toType);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.supportsConvert(fromType, toType, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the ODBC Core SQL grammar.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCoreSQLGrammar(callback) {
    this.dbm.supportsCoreSQLGrammar((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports correlated subqueries.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsCorrelatedSubqueries(callback) {
    this.dbm.supportsCorrelatedSubqueries((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports both data definition and data
   * manipulation statements within a transaction.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsDataDefinitionAndDataManipulationTransactions(callback) {
    this.dbm.supportsDataDefinitionAndDataManipulationTransactions(
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      },
    );
  }

  /**
   * Retrieves whether this database supports only data manipulation statements
   * within a transaction.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsDataManipulationTransactionsOnly(callback) {
    this.dbm.supportsDataManipulationTransactionsOnly((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether, when table correlation names are supported, they are
   * restricted to being different from the names of the tables.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsDifferentTableCorrelationNames(callback) {
    this.dbm.supportsDifferentTableCorrelationNames((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports expressions in ORDER BY lists.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsExpressionsInOrderBy(callback) {
    this.dbm.supportsExpressionsInOrderBy((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the ODBC Extended SQL grammar.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsExtendedSQLGrammar(callback) {
    this.dbm.supportsExtendedSQLGrammar((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports full nested outer joins.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsFullOuterJoins(callback) {
    this.dbm.supportsFullOuterJoins((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether auto-generated keys can be retrieved after a statement has
   * been executed
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsGetGeneratedKeys(callback) {
    this.dbm.supportsGetGeneratedKeys((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports some form of GROUP BY clause.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsGroupBy(callback) {
    this.dbm.supportsGroupBy((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports using columns not included in the
   * SELECT statement in a GROUP BY clause provided that all of the columns in
   * the SELECT statement are included in the GROUP BY clause.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsGroupByBeyondSelect(callback) {
    this.dbm.supportsGroupByBeyondSelect((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports using a column that is not in the
   * SELECT statement in a GROUP BY clause.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsGroupByUnrelated(callback) {
    this.dbm.supportsGroupByUnrelated((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the SQL Integrity Enhancement
   * Facility.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsIntegrityEnhancementFacility(callback) {
    this.dbm.supportsIntegrityEnhancementFacility((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports specifying a LIKE escape clause.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsLikeEscapeClause(callback) {
    this.dbm.supportsLikeEscapeClause((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database provides limited support for outer joins.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsLimitedOuterJoins(callback) {
    this.dbm.supportsLimitedOuterJoins((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the ODBC Minimum SQL grammar.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsMinimumSQLGrammar(callback) {
    this.dbm.supportsMinimumSQLGrammar((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case sensitive and as a result stores them in mixed case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsMixedCaseIdentifiers(callback) {
    this.dbm.supportsMixedCaseIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case sensitive and as a result stores them in mixed case.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsMixedCaseQuotedIdentifiers(callback) {
    this.dbm.supportsMixedCaseQuotedIdentifiers((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether it is possible to have multiple ResultSet objects returned
   * from a CallableStatement object simultaneously.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsMultipleOpenResults(callback) {
    this.dbm.supportsMultipleOpenResults((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports getting multiple ResultSet objects
   * from a single call to the method execute.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsMultipleResultSets(callback) {
    this.dbm.supportsMultipleResultSets((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database allows having multiple transactions open at
   * once (on different connections).
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsMultipleTransactions(callback) {
    this.dbm.supportsMultipleTransactions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports named parameters to callable
   * statements.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsNamedParameters(callback) {
    this.dbm.supportsNamedParameters((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether columns in this database may be defined as non-nullable.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsNonNullableColumns(callback) {
    this.dbm.supportsNonNullableColumns((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports keeping cursors open across
   * commits.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsOpenCursorsAcrossCommit(callback) {
    this.dbm.supportsOpenCursorsAcrossCommit((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports keeping cursors open across
   * rollbacks.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsOpenCursorsAcrossRollback(callback) {
    this.dbm.supportsOpenCursorsAcrossRollback((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports keeping statements open across
   * commits.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsOpenStatementsAcrossCommit(callback) {
    this.dbm.supportsOpenStatementsAcrossCommit((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports keeping statements open across
   * rollbacks.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsOpenStatementsAcrossRollback(callback) {
    this.dbm.supportsOpenStatementsAcrossRollback((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports using a column that is not in the
   * SELECT statement in an ORDER BY clause.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsOrderByUnrelated(callback) {
    this.dbm.supportsOrderByUnrelated((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports some form of outer join.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsOuterJoins(callback) {
    this.dbm.supportsOuterJoins((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports positioned DELETE statements.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsPositionedDelete(callback) {
    this.dbm.supportsPositionedDelete((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports positioned UPDATE statements.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsPositionedUpdate(callback) {
    this.dbm.supportsPositionedUpdate((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the given concurrency type in
   * combination with the given result set type.
   *
   * @param {Number} type - Defined in java.sql.ResultSet
   * @param {Number} concurrency - Type defined in java.sql.ResultSet
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsResultSetConcurrency(type, concurrency, callback) {
    const validParams = isInteger(type) && isInteger(concurrency);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.supportsResultSetConcurrency(type, concurrency, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the given result set holdability.
   *
   * @param {Number} holdability - one of the following constants: ResultSet.HOLD_CURSORS_OVER_COMMIT or ResultSet.CLOSE_CURSORS_AT_COMMIT
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so, false otherwise
   */
  supportsResultSetHoldability(holdability, callback) {
    const validParams = isInteger(holdability);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.supportsResultSetHoldability(holdability, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the given result set type.
   *
   * @param {Number} type - defined in java.sql.ResultSet
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so, false otherwise
   */
  supportsResultSetType(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.supportsResultSetType(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports savepoints.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSavepoints(callback) {
    this.dbm.supportsSavepoints((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a schema name can be used in a data manipulation
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSchemasInDataManipulation(callback) {
    this.dbm.supportsSchemasInDataManipulation((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a schema name can be used in an index definition
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSchemasInIndexDefinitions(callback) {
    this.dbm.supportsSchemasInIndexDefinitions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a schema name can be used in a privilege definition
   * statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSchemasInPrivilegeDefinitions(callback) {
    this.dbm.supportsSchemasInPrivilegeDefinitions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a schema name can be used in a procedure call statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSchemasInProcedureCalls(callback) {
    this.dbm.supportsSchemasInProcedureCalls((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether a schema name can be used in a table definition statement.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSchemasInTableDefinitions(callback) {
    this.dbm.supportsSchemasInTableDefinitions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports SELECT FOR UPDATE statements.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSelectForUpdate(callback) {
    this.dbm.supportsSelectForUpdate((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports statement pooling.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsStatementPooling(callback) {
    this.dbm.supportsStatementPooling((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports invoking user-defined or vendor
   * functions using the stored procedure escape syntax.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsStoredFunctionsUsingCallSyntax(callback) {
    this.dbm.supportsStoredFunctionsUsingCallSyntax((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports stored procedure calls that use the
   * stored procedure escape syntax.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsStoredProcedures(callback) {
    this.dbm.supportsStoredProcedures((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports subqueries in comparison
   * expressions.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSubqueriesInComparisons(callback) {
    this.dbm.supportsSubqueriesInComparisons((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports subqueries in EXISTS expressions.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSubqueriesInExists(callback) {
    this.dbm.supportsSubqueriesInExists((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports subqueries in IN expressions.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSubqueriesInIns(callback) {
    this.dbm.supportsSubqueriesInIns((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports subqueries in quantified
   * expressions.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsSubqueriesInQuantifieds(callback) {
    this.dbm.supportsSubqueriesInQuantifieds((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports table correlation names.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsTableCorrelationNames(callback) {
    this.dbm.supportsTableCorrelationNames((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports the given transaction isolation
   * level.
   *
   * @param {Number} level - one of the transaction isolation levels defined in java.sql.Connection
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so, false otherwise
   */
  supportsTransactionIsolationLevel(level, callback) {
    const validParams = isInteger(level);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.supportsTransactionIsolationLevel(level, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports transactions.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsTransactions(callback) {
    this.dbm.supportsTransactions((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports SQL UNION.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsUnion(callback) {
    this.dbm.supportsUnion((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database supports SQL UNION ALL.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  supportsUnionAll(callback) {
    this.dbm.supportsUnionAll((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether or not a visible row update can be detected by calling the
   * method ResultSet.rowUpdated.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if changes are detected by the result set type; false otherwise
   */
  updatesAreDetected(type, callback) {
    const validParams = isInteger(type);

    if (!validParams) {
      return callback(new Error('INVALID ARGUMENTS'));
    }

    this.dbm.updatesAreDetected(type, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database uses a file for each table.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  usesLocalFilePerTable(callback) {
    this.dbm.usesLocalFilePerTable((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }

  /**
   * Retrieves whether this database stores tables in a local file.
   *
   * @param {Function} callback
   * @returns {Boolean} Via callback: true if so; false otherwise
   */
  usesLocalFiles(callback) {
    this.dbm.usesLocalFiles((err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
}

events.once('initialized', () => {
  // See https://docs.oracle.com/javase/7/docs/api/java/sql/DatabaseMetaData.html
  // for full documentation for static attributes
  const staticAttrs = [
    'attributeNoNulls',
    'attributeNullable',
    'attributeNullableUnknown',
    'bestRowNotPseudo',
    'bestRowPseudo',
    'bestRowSession',
    'bestRowTemporary',
    'bestRowTransaction',
    'bestRowUnknown',
    'columnNoNulls',
    'columnNullable',
    'columnNullableUnknown',
    'functionColumnIn',
    'functionColumnInOut',
    'functionColumnOut',
    'functionColumnResult',
    'functionColumnUnknown',
    'functionNoNulls',
    'functionNoTable',
    'functionNullable',
    'functionNullableUnknown',
    'functionResultUnknown',
    'functionReturn',
    'functionReturnsTable',
    'importedKeyCascade',
    'importedKeyInitiallyDeferred',
    'importedKeyInitiallyImmediate',
    'importedKeyNoAction',
    'importedKeyNotDeferrable',
    'importedKeyRestrict',
    'importedKeySetDefault',
    'importedKeySetNull',
    'procedureColumnIn',
    'procedureColumnInOut',
    'procedureColumnOut',
    'procedureColumnResult',
    'procedureColumnReturn',
    'procedureColumnUnknown',
    'procedureNoNulls',
    'procedureNoResult',
    'procedureNullable',
    'procedureNullableUnknown',
    'procedureResultUnknown',
    'procedureReturnsResult',
    'sqlStateSQL',
    'sqlStateSQL99',
    'sqlStateXOpen',
    'tableIndexClustered',
    'tableIndexHashed',
    'tableIndexOther',
    'tableIndexStatistic',
    'typeNoNulls',
    'typeNullable',
    'typeNullableUnknown',
    'typePredBasic',
    'typePredChar',
    'typePredNone',
    'typeSearchable',
    'versionColumnNotPseudo',
    'versionColumnPseudo',
    'versionColumnUnknown',
  ];

  staticAttrs.forEach((attr) => {
    DatabaseMetaData[attr] = java.getStaticFieldValue(
      'java.sql.DatabaseMetaData',
      attr,
    );
  });
});
