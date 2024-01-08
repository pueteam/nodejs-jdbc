import { IResultSet, ResultSet } from './ResultSet';
import { Connection, IConnection } from './Connection';
import { getInstance, events } from './jinst';

const java = getInstance();

export interface IDatabaseMetadata {
  allProceduresAreCallableSync(): boolean;
  allTablesAreSelectableSync(): boolean;
  autoCommitFailureClosesAllResultSetsSync(): boolean;
  dataDefinitionCausesTransactionCommitSync(): boolean;
  dataDefinitionIgnoredInTransactionsSync(): boolean;
  deletesAreDetectedSync(type: number): boolean;
  doesMaxRowSizeIncludeBlobsSync(): boolean;
  generatedKeyAlwaysReturnedSync(): boolean;
  getAttributesPromise(
    catalog: string,
    schemaPattern: string,
    typeNamePattern: string,
    attributeNamePattern: string,
  ): Promise<IResultSet>;
  getBestRowIdentifierPromise(
    catalog: string,
    schema: string,
    table: string,
    scope: number,
    nullable: boolean,
  ): Promise<IResultSet>;
  getCatalogsPromise(): Promise<IResultSet>;
  getCatalogSeparatorSync(): string;
  getCatalogTermSync(): string;
  getClientInfoPropertiesPromise(): Promise<IResultSet>;
  getColumnPrivilegesPromise(
    catalog: string,
    schema: string,
    table: string,
    columnNamePattern: string,
  ): Promise<IResultSet>;
  getColumnsPromise(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
    columnNamePattern: string,
  ): Promise<IResultSet>;
  getConnectionPromise(): Promise<IConnection>;
  getCrossReferencePromise(
    parentCatalog: string,
    parentSchema: string,
    parentTable: string,
    foreignCatalog: string,
    foreignSchema: string,
    foreignTable: string,
  ): Promise<IResultSet>;
  getDatabaseMajorVersionSync(): number;
  getDatabaseMinorVersionSync(): number;
  getDatabaseProductNameSync(): string;
  getDatabaseProductVersionSync(): string;
  getDefaultTransactionIsolationSync(): number;
  getDriverMajorVersionSync(): number;
  getDriverMinorVersionSync(): number;
  getDriverNameSync(): string;
  getDriverVersionSync(): string;
  getExportedKeysPromise(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<IResultSet>;
  getExtraNameCharactersSync(): string;
  getFunctionColumnsPromise(
    catalog: string,
    schemaPattern: string,
    functionNamePattern: string,
    columnNamePattern: string,
  ): Promise<IResultSet>;
  getFunctionsPromise(
    catalog: string,
    schemaPattern: string,
    functionNamePattern: string,
  ): Promise<IResultSet>;
  getIdentifierQuoteStringSync(): string;
  getImportedKeysPromise(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<IResultSet>;
  getIndexInfoPromise(
    catalog: string,
    schema: string,
    table: string,
    unique: boolean,
    approximate: boolean,
  ): Promise<IResultSet>;
  getJDBCMajorVersionSync(): number;
  getJDBCMinorVersionSync(): number;
  getMaxBinaryLiteralLengthSync(): number;
  getMaxCatalogNameLengthSync(): number;
  getMaxCharLiteralLengthSync(): number;
  getMaxColumnNameLengthSync(): number;
  getMaxColumnsInGroupBySync(): number;
  getMaxColumnsInIndexSync(): number;
  getMaxColumnsInOrderBySync(): number;
  getMaxColumnsInSelectSync(): number;
  getMaxColumnsInTableSync(): number;
  getMaxConnectionsSync(): number;
  getMaxCursorNameLengthSync(): number;
  getMaxIndexLengthSync(): number;
  getMaxProcedureNameLengthSync(): number;
  getMaxRowSizeSync(): number;
  getMaxSchemaNameLengthSync(): number;
  getMaxStatementLengthSync(): number;
  getMaxStatementsSync(): number;
  getMaxTableNameLengthSync(): number;
  getMaxTablesInSelectSync(): number;
  getMaxUserNameLengthSync(): number;
  getNumericFunctionsSync(): string;
  getPrimaryKeysPromise(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<IResultSet>;
  getProcedureColumnsPromise(
    catalog: string,
    schemaPattern: string,
    procedureNamePattern: string,
    columnNamePattern: string,
  ): Promise<IResultSet>;
  getProceduresPromise(
    catalog: string,
    schemaPattern: string,
    procedureNamePattern: string,
  ): Promise<IResultSet>;
  getProcedureTermSync(): Promise<IResultSet>;
  getPseudoColumnsPromise(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
    columnNamePattern: string,
  ): Promise<IResultSet>;
  getResultSetHoldabilitySync(): number;
  getRowIdLifetimeSync(): any;
  getSchemasPromise(
    catalog: string,
    schemaPattern: string,
  ): Promise<IResultSet>;
  getSchemasPromise(): Promise<IResultSet>;
  getTablesPromise(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
    types: string[],
  ): Promise<IResultSet>;
  getSchemaTermSync(): string;
  getSearchStringEscapeSync(): string;
  getSQLKeywordsSync(): string;
  getSQLStateTypeSync(): number;
  getStringFunctionsSync(): string;
  getSuperTablesPromise(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
  ): Promise<IResultSet>;
  getSuperTypesPromise(
    catalog: string,
    schemaPattern: string,
    typeNamePattern: string,
  ): Promise<IResultSet>;
  getSystemFunctionsSync(): string;
  getTablePrivilegesPromise(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
  ): Promise<IResultSet>;
  getTableTypesPromise(): Promise<IResultSet>;
  getTimeDateFunctionsSync(): string;
  getTypeInfoPromise(): Promise<IResultSet>;
  getUDTsPromise(
    catalog: string,
    schemaPattern: string,
    typeNamePattern: string,
    types: number[],
  ): Promise<IResultSet>;
  getURLSync(): string;
  getUserNameSync(): string;
  getVersionColumnsPromise(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<IResultSet>;
  insertsAreDetectedSync(type: number): boolean;
  isCatalogAtStartSync(): boolean;
  isReadOnlySync(): boolean;
  locatorsUpdateCopySync(): boolean;
  nullPlusNonNullIsNullSync(): boolean;
  nullsAreSortedAtEndSync(): boolean;
  nullsAreSortedAtStartSync(): boolean;
  nullsAreSortedHighSync(): boolean;
  nullsAreSortedLowSync(): boolean;
  othersDeletesAreVisibleSync(type: number): boolean;
  othersInsertsAreVisibleSync(type: number): boolean;
  othersUpdatesAreVisibleSync(type: number): boolean;
  ownDeletesAreVisibleSync(type: number): boolean;
  ownInsertsAreVisibleSync(type: number): boolean;
  ownUpdatesAreVisibleSync(type: number): boolean;
  storesLowerCaseIdentifiersSync(): boolean;
  storesLowerCaseQuotedIdentifiersSync(): boolean;
  storesMixedCaseIdentifiersSync(): boolean;
  storesMixedCaseQuotedIdentifiersSync(): boolean;
  storesUpperCaseIdentifiersSync(): boolean;
  storesUpperCaseQuotedIdentifiersSync(): boolean;
  supportsAlterTableWithAddColumnSync(): boolean;
  supportsAlterTableWithDropColumnSync(): boolean;
  supportsANSI92EntryLevelSQLSync(): boolean;
  supportsANSI92FullSQLSync(): boolean;
  supportsANSI92IntermediateSQLSync(): boolean;
  supportsBatchUpdatesSync(): boolean;
  supportsCatalogsInDataManipulationSync(): boolean;
  supportsCatalogsInIndexDefinitionsSync(): boolean;
  supportsCatalogsInPrivilegeDefinitionsSync(): boolean;
  supportsCatalogsInProcedureCallsSync(): boolean;
  supportsCatalogsInTableDefinitionsSync(): boolean;
  supportsColumnAliasingSync(): boolean;
  supportsConvertSync(fromType: number, toType: number): boolean;
  supportsCoreSQLGrammarSync(): boolean;
  supportsCorrelatedSubqueriesSync(): boolean;
  supportsDataDefinitionAndDataManipulationTransactionsSync(): boolean;
  supportsDataManipulationTransactionsOnlySync(): boolean;
  supportsDifferentTableCorrelationNamesSync(): boolean;
  supportsExpressionsInOrderBySync(): boolean;
  supportsExtendedSQLGrammarSync(): boolean;
  supportsFullOuterJoinsSync(): boolean;
  supportsGetGeneratedKeysSync(): boolean;
  supportsGroupBySync(): boolean;
  supportsGroupByBeyondSelectSync(): boolean;
  supportsGroupByUnrelatedSync(): boolean;
  supportsIntegrityEnhancementFacilitySync(): boolean;
  supportsLikeEscapeClauseSync(): boolean;
  supportsLimitedOuterJoinsSync(): boolean;
  supportsMinimumSQLGrammarSync(): boolean;
  supportsMixedCaseIdentifiersSync(): boolean;
  supportsMixedCaseQuotedIdentifiersSync(): boolean;
  supportsMultipleOpenResultsSync(): boolean;
  supportsMultipleResultSetsSync(): boolean;
  supportsMultipleTransactionsSync(): boolean;
  supportsNamedParametersSync(): boolean;
  supportsNonNullableColumnsSync(): boolean;
  supportsOpenCursorsAcrossCommitSync(): boolean;
  supportsOpenCursorsAcrossRollbackSync(): boolean;
  supportsOpenStatementsAcrossCommitSync(): boolean;
  supportsOpenStatementsAcrossRollbackSync(): boolean;
  supportsOrderByUnrelatedSync(): boolean;
  supportsOuterJoinsSync(): boolean;
  supportsPositionedDeleteSync(): Promise<IResultSet>;
  supportsPositionedUpdateSync(): Promise<IResultSet>;
  supportsResultSetConcurrencySync(type: number, concurrency: number): boolean;
  supportsResultSetHoldabilitySync(holdability: number): boolean;
  supportsResultSetTypeSync(type: number): boolean;
  supportsSavepointsSync(): boolean;
  supportsSchemasInDataManipulationSync(): boolean;
  supportsSchemasInIndexDefinitionsSync(): boolean;
  supportsSchemasInPrivilegeDefinitionsSync(): boolean;
  supportsSchemasInProcedureCallsSync(): boolean;
  supportsSchemasInTableDefinitionsSync(): boolean;
  supportsSelectForUpdateSync(): boolean;
  supportsStatementPoolingSync(): boolean;
  supportsStoredFunctionsUsingCallSyntaxSync(): boolean;
  supportsStoredProceduresSync(): boolean;
  supportsSubqueriesInComparisonsSync(): boolean;
  supportsSubqueriesInExistsSync(): boolean;
  supportsSubqueriesInInsSync(): boolean;
  supportsSubqueriesInQuantifiedsSync(): boolean;
  supportsTableCorrelationNamesSync(): boolean;
  supportsTransactionIsolationLevelSync(level: number): boolean;
  supportsTransactionsSync(): boolean;
  supportsUnionSync(): boolean;
  supportsUnionAllSync(): boolean;
  updatesAreDetectedSync(type: number): boolean;
  usesLocalFilePerTableSync(): boolean;
  usesLocalFilesSync(): boolean;
}

export class DatabaseMetaData {
  private dbm: IDatabaseMetadata;
  constructor(databaseMetaData: IDatabaseMetadata) {
    this.dbm = databaseMetaData;
  }

  /**
   * Retrieves the schema names available in this database.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @returns {Promise<ResultSet>} ResultSet object in which each row is a schema description
   */
  async getSchemas(
    catalog?: string,
    schemaPattern?: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      if (catalog) {
        this.dbm
          .getSchemasPromise(catalog, schemaPattern)
          .then((result: IResultSet) => {
            return resolve(new ResultSet(result));
          })
          .catch((error) => {
            return reject(error);
          });
      }
      this.dbm
        .getSchemasPromise()
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
   * @returns {Promise<ResultSet>} each row is a table description
   */

  async getTables(
    catalog?: string,
    schemaPattern?: string,
    tableNamePattern?: string,
    types?: string[],
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getTablesPromise(catalog, schemaPattern, tableNamePattern, types)
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
        .getAttributesPromise(
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
        .getBestRowIdentifierPromise(catalog, schema, table, scope, nullable)
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
        .getCatalogsPromise()
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
  getCatalogTerm(): string {
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
        .getClientInfoPropertiesPromise()
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
        .getColumnPrivilegesPromise(catalog, schema, table, columnNamePattern)
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
   * @returns {Promise<ResultSet>} each row is a column description
   */
  async getColumns(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
    columnNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getColumnsPromise(
          catalog,
          schemaPattern,
          tableNamePattern,
          columnNamePattern,
        )
        .then((result: IResultSet) => {
          resolve(new ResultSet(result));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Retrieves the connection that produced this metadata object.
   *
   * @returns {Promise<Connection>} the connection that produced this metadata object
   */
  getConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getConnectionPromise()
        .then((result: IConnection) => {
          resolve(new Connection(result));
        })
        .catch((error) => {
          reject(error);
        });
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
   * @returns {Promise<ResultSet>} each row is a foreign key column description
   */
  async getCrossReference(
    parentCatalog: string,
    parentSchema: string,
    parentTable: string,
    foreignCatalog: string,
    foreignSchema: string,
    foreignTable: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getCrossReferencePromise(
          parentCatalog,
          parentSchema,
          parentTable,
          foreignCatalog,
          foreignSchema,
          foreignTable,
        )
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves the major version number of the underlying database.
   *
   * @returns {Number} the underlying database's major version
   */
  getDatabaseMajorVersion(): number {
    return this.dbm.getDatabaseMajorVersionSync();
  }

  /**
   * Retrieves the minor version number of the underlying database.
   *
   * @returns {Number} underlying database's minor version
   */
  getDatabaseMinorVersion(): number {
    return this.dbm.getDatabaseMinorVersionSync();
  }

  /**
   * Retrieves the name of this database product.
   *
   * @returns {String} database product name
   */
  getDatabaseProductName(): string {
    return this.dbm.getDatabaseProductNameSync();
  }

  /**
   * Retrieves the version number of this database product.
   *
   * @returns {String} database version number
   */
  getDatabaseProductVersion(): string {
    return this.dbm.getDatabaseProductVersionSync();
  }

  /**
   * Retrieves this database's default transaction isolation level.
   *
   * @returns {Number} the default isolation level
   */
  getDefaultTransactionIsolation(): number {
    return this.dbm.getDefaultTransactionIsolationSync();
  }

  /**
   * Retrieves this JDBC driver's major version number.
   *
   * @returns {Number} JDBC driver major version
   */
  getDriverMajorVersion(): number {
    return this.dbm.getDriverMajorVersionSync();
  }

  /**
   * Retrieves this JDBC driver's minor version number.
   *
   * @returns {Number} JDBC driver minor version
   */
  getDriverMinorVersion(): number {
    return this.dbm.getDriverMinorVersionSync();
  }

  /**
   * Retrieves the name of this JDBC driver.
   *
   * @returns {String} JDBC driver name
   */
  getDriverName(): string {
    return this.dbm.getDriverNameSync();
  }

  /**
   * Retrieves the version number of this JDBC driver as a String.
   *
   * @returns {String} JDBC driver version
   */
  getDriverVersion(): string {
    return this.dbm.getDriverVersionSync();
  }

  /**
   * Retrieves a description of the foreign key columns that reference the given
   * table's primary key columns (the foreign keys exported by a table).
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @returns {Promise<ResultSet>} a ResultSet object in which each row is a foreign key column description
   */
  async getExportedKeys(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getExportedKeysPromise(catalog, schema, table)
        .then((result: IResultSet) => {
          resolve(new ResultSet(result));
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves all the "extra" characters that can be used in unquoted identifier
   * names (those beyond a-z, A-Z, 0-9 and _).
   *
   * @returns {String} the string containing the extra characters
   */
  getExtraNameCharacters(): string {
    return this.dbm.getExtraNameCharactersSync();
  }

  /**
   * Retrieves a description of the given catalog's system or user function
   * parameters and return type.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} functionNamePattern - A procedure name pattern; must match the function name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @returns {Promise<ResultSet>} each row describes a user function parameter, column or return type
   */
  async getFunctionColumns(
    catalog: string,
    schemaPattern: string,
    functionNamePattern: string,
    columnNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getFunctionColumnsPromise(
          catalog,
          schemaPattern,
          functionNamePattern,
          columnNamePattern,
        )
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves a description of the system and user functions available in the
   * given catalog.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} functionNamePattern - A procedure name pattern; must match the function name as it is stored in the database
   * @returns {Promise<ResultSet>} each row is a function description
   */
  async getFunctions(
    catalog: string,
    schemaPattern: string,
    functionNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getFunctionsPromise(catalog, schemaPattern, functionNamePattern)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves the string used to quote SQL identifiers.
   *
   * @returns {String} the quoting string or a space if quoting is not supported
   */
  getIdentifierQuoteString(): string {
    return this.dbm.getIdentifierQuoteStringSync();
  }

  /**
   * Retrieves a description of the primary key columns that are referenced by
   * the given table's foreign key columns (the primary keys imported by a
   * table).
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @returns {Promise<ResultSet>} each row is a primary key column description
   */
  async getImportedKeys(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getImportedKeysPromise(catalog, schema, table)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
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
   * @returns {Promise<ResultSet>} each row is an index column description
   */
  async getIndexInfo(
    catalog: string,
    schema: string,
    table: string,
    unique: boolean,
    approximate: boolean,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getIndexInfoPromise(catalog, schema, table, unique, approximate)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Retrieves the major JDBC version number for this driver.
   *
   * @returns {Number} JDBC version major number
   */
  getJDBCMajorVersion(): number {
    return this.dbm.getJDBCMajorVersionSync();
  }

  /**
   * Retrieves the minor JDBC version number for this driver.
   *
   * @returns {Number} JDBC version minor number
   */
  getJDBCMinorVersion(): number {
    return this.dbm.getJDBCMinorVersionSync();
  }

  /**
   * Retrieves the maximum number of hex characters this database allows in an
   * inline binary literal.
   *
   * @returns {Number} the maximum length (in hex characters) for a binary literal; a result of zero means that there is no limit or the limit is not known
   */
  getMaxBinaryLiteralLength(): number {
    return this.dbm.getMaxBinaryLiteralLengthSync();
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * catalog name.
   *
   * @returns {Number} the maximum number of characters allowed in a catalog name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxCatalogNameLength(): number {
    return this.dbm.getMaxCatalogNameLengthSync();
  }

  /**
   * Retrieves the maximum number of characters this database allows for a
   * character literal.
   *
   * @returns {Number} the maximum number of characters allowed for a character literal; a result of zero means that there is no limit or the limit is not known
   */
  getMaxCharLiteralLength(): number {
    return this.dbm.getMaxCharLiteralLengthSync();
  }

  /**
   * Retrieves the maximum number of characters this database allows for a column
   * name.
   *
   * @returns {Number} the maximum number of characters allowed for a column name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnNameLength(): number {
    return this.dbm.getMaxColumnNameLengthSync();
  }

  /**
   * Retrieves the maximum number of columns this database allows in a GROUP BY
   * clause.
   *
   * @returns {Number} the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInGroupBy(): number {
    return this.dbm.getMaxColumnsInGroupBySync();
  }

  /**
   * Retrieves the maximum number of columns this database allows in an index.
   *
   * @returns {Number} the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInIndex(): number {
    return this.dbm.getMaxColumnsInIndexSync();
  }

  /**
   * Retrieves the maximum number of columns this database allows in an ORDER BY
   * clause.
   *
   * @returns {Number} the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInOrderBy(): number {
    return this.dbm.getMaxColumnsInOrderBySync();
  }

  /**
   * Retrieves the maximum number of columns this database allows in a SELECT
   * list.
   *
   * @returns {Number} the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInSelect(): number {
    return this.dbm.getMaxColumnsInSelectSync();
  }

  /**
   * Retrieves the maximum number of columns this database allows in a table.
   *
   * @returns {Number} the maximum number of columns allowed; a result of zero means that there is no limit or the limit is not known
   */
  getMaxColumnsInTable(): number {
    return this.dbm.getMaxColumnsInTableSync();
  }

  /**
   * Retrieves the maximum number of concurrent connections to this database that
   * are possible.
   *
   * @returns {Number} the maximum number of active connections possible at one time; a result of zero means that there is no limit or the limit is not known
   */
  getMaxConnections(): number {
    return this.dbm.getMaxConnectionsSync();
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * cursor name.
   *
   * @returns {Number} the maximum number of characters allowed in a cursor name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxCursorNameLength(): number {
    return this.dbm.getMaxCursorNameLengthSync();
  }

  /**
   * Retrieves the maximum number of bytes this database allows for an index,
   * including all of the parts of the index.
   *
   * @returns {Number} the maximum number of bytes allowed; this limit includes the composite of all the constituent parts of the index; a result of zero means that there is no limit or the limit is not known
   */
  getMaxIndexLength(): number {
    return this.dbm.getMaxIndexLengthSync();
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * procedure name.
   *
   * @returns {Number} the maximum number of characters allowed in a procedure name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxProcedureNameLength(): number {
    return this.dbm.getMaxProcedureNameLengthSync();
  }

  /**
   * Retrieves the maximum number of bytes this database allows in a single row.
   *
   * @returns {Number} the maximum number of bytes allowed for a row; a result of zero means that there is no limit or the limit is not known
   */
  getMaxRowSize(): number {
    return this.dbm.getMaxRowSizeSync();
  }

  /**
   * Retrieves the maximum number of characters that this database allows in a
   * schema name.
   *
   * @returns {Number} the maximum number of characters allowed in a schema name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxSchemaNameLength(): number {
    return this.dbm.getMaxSchemaNameLengthSync();
  }

  /**
   * Retrieves the maximum number of characters this database allows in an SQL
   * statement.
   *
   * @returns {Number} the maximum number of characters allowed for an SQL statement; a result of zero means that there is no limit or the limit is not known
   */
  getMaxStatementLength(): number {
    return this.dbm.getMaxStatementLengthSync();
  }

  /**
   * Retrieves the maximum number of active statements to this database that can
   * be open at the same time.
   *
   * @returns {Number} the maximum number of statements that can be open at one time; a result of zero means that there is no limit or the limit is not known
   */
  getMaxStatements(): number {
    return this.dbm.getMaxStatementsSync();
  }

  /**
   * Retrieves the maximum number of characters this database allows in a table
   * name.
   *
   * @returns {Number} the maximum number of characters allowed for a table name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxTableNameLength(): number {
    return this.dbm.getMaxTableNameLengthSync();
  }

  /**
   * Retrieves the maximum number of tables this database allows in a SELECT
   * statement.
   *
   * @returns {Number} the maximum number of tables allowed in a SELECT statement; a result of zero means that there is no limit or the limit is not known
   */
  getMaxTablesInSelect(): number {
    return this.dbm.getMaxTablesInSelectSync();
  }

  /**
   * Retrieves the maximum number of characters this database allows in a user
   * name.
   *
   * @returns {Number} the maximum number of characters allowed for a user name; a result of zero means that there is no limit or the limit is not known
   */
  getMaxUserNameLength(): number {
    return this.dbm.getMaxUserNameLengthSync();
  }

  /**
   * Retrieves a comma-separated list of math functions available with this
   * database.
   *
   * @returns {String} the list of math functions supported by this database
   */
  getNumericFunctions(): string {
    return this.dbm.getNumericFunctionsSync();
  }

  /**
   * Retrieves a description of the given table's primary key columns.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @returns {Promise<ResultSet>} each row is a primary key column description
   */
  async getPrimaryKeys(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getPrimaryKeysPromise(catalog, schema, table)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
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
   * @returns {Promise<ResultSet>} Via callback: each row describes a stored procedure parameter or column
   */
  async getProcedureColumns(
    catalog: string,
    schemaPattern: string,
    procedureNamePattern: string,
    columnNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getProcedureColumnsPromise(
          catalog,
          schemaPattern,
          procedureNamePattern,
          columnNamePattern,
        )
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves a description of the stored procedures available in the given
   * catalog.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} procedureNamePattern - A procedure name pattern; must match the procedure name as it is stored in the database
   * @returns {Promise<ResultSet>} each row is a procedure description
   */
  getProcedures(
    catalog: string,
    schemaPattern: string,
    procedureNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getProceduresPromise(catalog, schemaPattern, procedureNamePattern)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves the database vendor's preferred term for "procedure".
   *
   * @returns {String} the vendor term for "procedure"
   */
  getProcedureTerm() {
    return this.dbm.getProcedureTermSync();
  }

  /**
   * Retrieves a description of the pseudo or hidden columns available in a given
   * table within the specified catalog and schema.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @param {String} columnNamePattern - A column name pattern; must match the column name as it is stored in the database
   * @returns {Promise<ResultSet>} each row is a column description
   */
  getPseudoColumns(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
    columnNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getPseudoColumnsPromise(
          catalog,
          schemaPattern,
          tableNamePattern,
          columnNamePattern,
        )
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves this database's default holdability for ResultSet objects.
   *
   * @returns {Number} the default holdability; either ResultSet.HOLD_CURSORS_OVER_COMMIT or ResultSet.CLOSE_CURSORS_AT_COMMIT
   */
  getResultSetHoldability(): number {
    return this.dbm.getResultSetHoldabilitySync();
  }

  /**
   * Indicates whether or not this data source supports the SQL ROWID type, and
   * if so the lifetime for which a RowId object remains valid.
   *
   * NOTE: This method should be used with caution for now. The RowIdLifetime object
   * returned is a Java object and is not wrapped by the nodejs-jdbc library.
   *
   * @returns {RowIdLifetime} the status indicating the lifetime of a RowId
   */
  getRowIdLifetime(): any {
    return this.dbm.getRowIdLifetimeSync();
  }

  /**
   * Retrieves the database vendor's preferred term for "schema".
   *
   * @returns {String} the vendor term for "schema"
   */
  getSchemaTerm(): string {
    return this.dbm.getSchemaTermSync();
  }

  /**
   * Retrieves the string that can be used to escape wildcard characters.
   *
   * @returns {String} the string used to escape wildcard characters
   */
  getSearchStringEscape(): string {
    return this.dbm.getSearchStringEscapeSync();
  }

  /**
   * Retrieves a comma-separated list of all of this database's SQL keywords that
   * are NOT also SQL:2003 keywords.
   *
   * @returns {String} the list of this database's keywords that are not also SQL:2003 keywords
   */
  getSQLKeywords(): string {
    return this.dbm.getSQLKeywordsSync();
  }

  /**
   * Indicates whether the SQLSTATE returned by SQLException.getSQLState is
   * X/Open (now known as Open Group) SQL CLI or SQL:2003.
   *
   * @returns {Number} the type of SQLSTATE; one of: sqlStateXOpen or sqlStateSQL
   */
  getSQLStateType(): number {
    return this.dbm.getSQLStateTypeSync();
  }

  /**
   * Retrieves a comma-separated list of string functions available with this
   * database.
   *
   * @returns {String} Via callback: the list of string functions supported by this database
   */
  getStringFunctions(): string {
    return this.dbm.getStringFunctionsSync();
  }

  /**
   * Retrieves a description of the table hierarchies defined in a particular
   * schema in this database.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @returns {Promise<ResultSet>} a ResultSet object in which each row is a type description
   */
  async getSuperTables(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getSuperTablesPromise(catalog, schemaPattern, tableNamePattern)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves a description of the user-defined type (UDT) hierarchies defined
   * in a particular schema in this database.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} typeNamePattern - A UDT name pattern; may be a fully-qualified name
   * @returns {Promise<ResultSet>} a ResultSet object in which a row gives information about the designated UDT
   */
  async getSuperTypes(
    catalog: string,
    schemaPattern: string,
    typeNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getSuperTypesPromise(catalog, schemaPattern, typeNamePattern)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves a comma-separated list of system functions available with this
   * database.
   *
   * @returns {String} a list of system functions supported by this database
   */
  getSystemFunctions(): string {
    return this.dbm.getSystemFunctionsSync();
  }

  /**
   * Retrieves a description of the access rights for each table available in a
   * catalog.
   *
   * @param {String} catalog - A  catalog name; must match the catalog name as it is stored in the database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schemaPattern - A schema name pattern; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} tableNamePattern - A table name pattern; must match the table name as it is stored in the database
   * @returns {Promise<ResultSet>} each row is a table privilege description
   */
  async getTablePrivileges(
    catalog: string,
    schemaPattern: string,
    tableNamePattern: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getTablePrivilegesPromise(catalog, schemaPattern, tableNamePattern)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves the table types available in this database.
   *
   * @returns {Promise<ResultSet>} a ResultSet object in which each row has a single String column that is a table type
   */
  async getTableTypes(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getTableTypesPromise()
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves a comma-separated list of the time and date functions available
   * with this database.
   *
   * @returns {String} Via callback: the list of time and date functions supported by this database
   */
  getTimeDateFunctions(): string {
    return this.dbm.getTimeDateFunctionsSync();
  }

  /**
   * Retrieves a description of all the data types supported by this database.
   *
   * @returns {Promise<ResultSet>} a ResultSet object in which each row is an SQL type description
   */
  getTypeInfo(): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getTypeInfoPromise()
        .then((result: IResultSet) => {
          resolve(new ResultSet(result));
        })
        .catch((err) => reject(err));
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
   * @returns {Promise<ResultSet>} ResultSet object in which each row describes a UDT
   */
  getUDTs(
    catalog: string,
    schemaPattern: string,
    typeNamePattern: string,
    types: number[],
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getUDTsPromise(catalog, schemaPattern, typeNamePattern, types)
        .then((result: IResultSet) => resolve(new ResultSet(result)))
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves the URL for this DBMS.
   *
   * @returns {String} the URL for this DBMS or null if it cannot be generated
   */
  getURL(): string {
    return this.dbm.getURLSync();
  }

  /**
   * Retrieves the user name as known to this database.
   *
   * @returns {String} Retrieves the user name as known to this database
   */
  getUserName(): string {
    return this.dbm.getUserNameSync();
  }

  /**
   * Retrieves a description of a table's columns that are automatically updated
   * when any value in a row is updated.
   *
   * @param {String} catalog - A catalog name; must match the catalog name as it is stored in this database; "" retrieves those without a catalog; null means that the catalog name should not be used to narrow the search
   * @param {String} schema - A schema name; must match the schema name as it is stored in the database; "" retrieves those without a schema; null means that the schema name should not be used to narrow the search
   * @param {String} table - A table name; must match the table name as it is stored in this database
   * @returns {Promise<ResultSet>} a ResultSet object in which each row is a column description
   */
  getVersionColumns(
    catalog: string,
    schema: string,
    table: string,
  ): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      this.dbm
        .getVersionColumnsPromise(catalog, schema, table)
        .then((result: IResultSet) => {
          resolve(new ResultSet(result));
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves whether or not a visible row insert can be detected by calling the
   * method ResultSet.rowInserted.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if changes are detected by the specified result set type; false otherwise
   */
  insertsAreDetected(type: number): boolean {
    return this.dbm.insertsAreDetectedSync(type);
  }

  /**
   * Retrieves whether a catalog appears at the start of a fully qualified table
   * name.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  isCatalogAtStart(): boolean {
    return this.dbm.isCatalogAtStartSync();
  }

  /**
   * Retrieves whether this database is in read-only mode.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  isReadOnly(): boolean {
    return this.dbm.isReadOnlySync();
  }

  /**
   * Indicates whether updates made to a LOB are made on a copy or directly to
   * the LOB.
   *
   * @returns {Boolean} true if updates are made to a copy of the LOB; false if updates are made directly to the LOB
   */
  locatorsUpdateCopy(): boolean {
    return this.dbm.locatorsUpdateCopySync();
  }

  /**
   * Retrieves whether this database supports concatenations between NULL and
   * non-NULL values being NULL.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  nullPlusNonNullIsNull(): boolean {
    return this.dbm.nullPlusNonNullIsNullSync();
  }

  /**
   * Retrieves whether NULL values are sorted at the end regardless of sort
   * order.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  nullsAreSortedAtEnd(): boolean {
    return this.dbm.nullsAreSortedAtEndSync();
  }

  /**
   * Retrieves whether NULL values are sorted at the start regardless of sort
   * order.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  nullsAreSortedAtStart(): boolean {
    return this.dbm.nullsAreSortedAtStartSync();
  }

  /**
   * Retrieves whether NULL values are sorted high.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  nullsAreSortedHigh(): boolean {
    return this.dbm.nullsAreSortedHighSync();
  }

  /**
   * Retrieves whether NULL values are sorted low.
   *
   * @returns {Boolean}  true if so; false otherwise
   */
  nullsAreSortedLow(): boolean {
    return this.dbm.nullsAreSortedLowSync();
  }

  /**
   * Retrieves whether deletes made by others are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if deletes made by others are visible for the given result set type; false otherwise
   */
  othersDeletesAreVisible(type: number): boolean {
    return this.dbm.othersDeletesAreVisibleSync(type);
  }

  /**
   * Retrieves whether inserts made by others are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if inserts made by others are visible for the given result set type; false otherwise
   */
  othersInsertsAreVisible(type: number): boolean {
    return this.dbm.othersInsertsAreVisibleSync(type);
  }

  /**
   * Retrieves whether updates made by others are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if updates made by others are visible for the given result set type; false otherwise
   */
  othersUpdatesAreVisible(type: number): boolean {
    return this.dbm.othersUpdatesAreVisibleSync(type);
  }

  /**
   * Retrieves whether a result set's own deletes are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if deletes are visible for the given result set type; false otherwise
   */
  ownDeletesAreVisible(type: number): boolean {
    return this.dbm.ownDeletesAreVisibleSync(type);
  }

  /**
   * Retrieves whether a result set's own inserts are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if inserts are visible for the given result set type; false otherwise
   */
  ownInsertsAreVisible(type: number): boolean {
    return this.dbm.ownInsertsAreVisibleSync(type);
  }

  /**
   * Retrieves whether for the given type of ResultSet object, the result set's
   * own updates are visible.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if updates are visible for the given result set type; false otherwise
   */
  ownUpdatesAreVisible(type: number): boolean {
    return this.dbm.ownUpdatesAreVisibleSync(type);
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case insensitive and stores them in lower case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  storesLowerCaseIdentifiers(): boolean {
    return this.dbm.storesLowerCaseIdentifiersSync();
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case insensitive and stores them in lower case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  storesLowerCaseQuotedIdentifiers(): boolean {
    return this.dbm.storesLowerCaseQuotedIdentifiersSync();
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case insensitive and stores them in mixed case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  storesMixedCaseIdentifiers(): boolean {
    return this.dbm.storesMixedCaseIdentifiersSync();
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case insensitive and stores them in mixed case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  storesMixedCaseQuotedIdentifiers(): boolean {
    return this.dbm.storesMixedCaseQuotedIdentifiersSync();
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case insensitive and stores them in upper case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  storesUpperCaseIdentifiers(): boolean {
    return this.dbm.storesUpperCaseIdentifiersSync();
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case insensitive and stores them in upper case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  storesUpperCaseQuotedIdentifiers(): boolean {
    return this.dbm.storesUpperCaseQuotedIdentifiersSync();
  }

  /**
   * Retrieves whether this database supports ALTER TABLE with add column.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsAlterTableWithAddColumn(): boolean {
    return this.dbm.supportsAlterTableWithAddColumnSync();
  }

  /**
   * Retrieves whether this database supports ALTER TABLE with drop column.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsAlterTableWithDropColumn(): boolean {
    return this.dbm.supportsAlterTableWithDropColumnSync();
  }

  /**
   * Retrieves whether this database supports the ANSI92 entry level SQL grammar.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsANSI92EntryLevelSQL(): boolean {
    return this.dbm.supportsANSI92EntryLevelSQLSync();
  }

  /**
   * Retrieves whether this database supports the ANSI92 full SQL grammar
   * supported.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsANSI92FullSQL(): boolean {
    return this.dbm.supportsANSI92FullSQLSync();
  }

  /**
   * Retrieves whether this database supports the ANSI92 intermediate SQL grammar
   * supported.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsANSI92IntermediateSQL(): boolean {
    return this.dbm.supportsANSI92IntermediateSQLSync();
  }

  /**
   * Retrieves whether this database supports batch updates.
   *
   * @returns {Boolean} true if this database supports batch upcates; false otherwise
   */
  supportsBatchUpdates(): boolean {
    return this.dbm.supportsBatchUpdatesSync();
  }

  /**
   * Retrieves whether a catalog name can be used in a data manipulation
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCatalogsInDataManipulation(): boolean {
    return this.dbm.supportsCatalogsInDataManipulationSync();
  }

  /**
   * Retrieves whether a catalog name can be used in an index definition
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCatalogsInIndexDefinitions(): boolean {
    return this.dbm.supportsCatalogsInIndexDefinitionsSync();
  }

  /**
   * Retrieves whether a catalog name can be used in a privilege definition
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCatalogsInPrivilegeDefinitions(): boolean {
    return this.dbm.supportsCatalogsInPrivilegeDefinitionsSync();
  }

  /**
   * Retrieves whether a catalog name can be used in a procedure call statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCatalogsInProcedureCalls(): boolean {
    return this.dbm.supportsCatalogsInProcedureCallsSync();
  }

  /**
   * Retrieves whether a catalog name can be used in a table definition
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCatalogsInTableDefinitions(): boolean {
    return this.dbm.supportsCatalogsInTableDefinitionsSync();
  }

  /**
   * Retrieves whether this database supports column aliasing.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsColumnAliasing(): boolean {
    return this.dbm.supportsColumnAliasingSync();
  }

  /**
   * Retrieves whether this database supports the JDBC scalar function CONVERT
   * for the conversion of one JDBC type to another, or between the JDBC types
   * fromType and toType if both are given.
   *
   * @param {Number} [fromType] - The type to convert from; one of the type codes from the class java.sql.Types
   * @param {Number} [toType] - The type to convert to; one of the type codes from the class java.sql.Types
   * @returns {Boolean}  Via callback: true if so; false otherwise
   */
  supportsConvert(fromType: number, toType: number): boolean {
    return this.dbm.supportsConvertSync(fromType, toType);
  }

  /**
   * Retrieves whether this database supports the ODBC Core SQL grammar.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCoreSQLGrammar(): boolean {
    return this.dbm.supportsCoreSQLGrammarSync();
  }

  /**
   * Retrieves whether this database supports correlated subqueries.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsCorrelatedSubqueries(): boolean {
    return this.dbm.supportsCorrelatedSubqueriesSync();
  }

  /**
   * Retrieves whether this database supports both data definition and data
   * manipulation statements within a transaction.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsDataDefinitionAndDataManipulationTransactions(): boolean {
    return this.dbm.supportsDataDefinitionAndDataManipulationTransactionsSync();
  }

  /**
   * Retrieves whether this database supports only data manipulation statements
   * within a transaction.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsDataManipulationTransactionsOnly(): boolean {
    return this.dbm.supportsDataManipulationTransactionsOnlySync();
  }

  /**
   * Retrieves whether, when table correlation names are supported, they are
   * restricted to being different from the names of the tables.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsDifferentTableCorrelationNames(): boolean {
    return this.dbm.supportsDifferentTableCorrelationNamesSync();
  }

  /**
   * Retrieves whether this database supports expressions in ORDER BY lists.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsExpressionsInOrderBy(): boolean {
    return this.dbm.supportsExpressionsInOrderBySync();
  }

  /**
   * Retrieves whether this database supports the ODBC Extended SQL grammar.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsExtendedSQLGrammar(): boolean {
    return this.dbm.supportsExtendedSQLGrammarSync();
  }

  /**
   * Retrieves whether this database supports full nested outer joins.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsFullOuterJoins(): boolean {
    return this.dbm.supportsFullOuterJoinsSync();
  }

  /**
   * Retrieves whether auto-generated keys can be retrieved after a statement has
   * been executed
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsGetGeneratedKeys(): boolean {
    return this.dbm.supportsGetGeneratedKeysSync();
  }

  /**
   * Retrieves whether this database supports some form of GROUP BY clause.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsGroupBy(): boolean {
    return this.dbm.supportsGroupBySync();
  }

  /**
   * Retrieves whether this database supports using columns not included in the
   * SELECT statement in a GROUP BY clause provided that all of the columns in
   * the SELECT statement are included in the GROUP BY clause.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsGroupByBeyondSelect(): boolean {
    return this.dbm.supportsGroupByBeyondSelectSync();
  }

  /**
   * Retrieves whether this database supports using a column that is not in the
   * SELECT statement in a GROUP BY clause.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsGroupByUnrelated(): boolean {
    return this.dbm.supportsGroupByUnrelatedSync();
  }

  /**
   * Retrieves whether this database supports the SQL Integrity Enhancement
   * Facility.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsIntegrityEnhancementFacility(): boolean {
    return this.dbm.supportsIntegrityEnhancementFacilitySync();
  }

  /**
   * Retrieves whether this database supports specifying a LIKE escape clause.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsLikeEscapeClause(): boolean {
    return this.dbm.supportsLikeEscapeClauseSync();
  }

  /**
   * Retrieves whether this database provides limited support for outer joins.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsLimitedOuterJoins(): boolean {
    return this.dbm.supportsLimitedOuterJoinsSync();
  }

  /**
   * Retrieves whether this database supports the ODBC Minimum SQL grammar.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsMinimumSQLGrammar(): boolean {
    return this.dbm.supportsMinimumSQLGrammarSync();
  }

  /**
   * Retrieves whether this database treats mixed case unquoted SQL identifiers
   * as case sensitive and as a result stores them in mixed case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsMixedCaseIdentifiers(): boolean {
    return this.dbm.supportsMixedCaseIdentifiersSync();
  }

  /**
   * Retrieves whether this database treats mixed case quoted SQL identifiers as
   * case sensitive and as a result stores them in mixed case.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsMixedCaseQuotedIdentifiers(): boolean {
    return this.dbm.supportsMixedCaseQuotedIdentifiersSync();
  }

  /**
   * Retrieves whether it is possible to have multiple ResultSet objects returned
   * from a CallableStatement object simultaneously.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsMultipleOpenResults(): boolean {
    return this.dbm.supportsMultipleOpenResultsSync();
  }

  /**
   * Retrieves whether this database supports getting multiple ResultSet objects
   * from a single call to the method execute.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsMultipleResultSets(): boolean {
    return this.dbm.supportsMultipleResultSetsSync();
  }

  /**
   * Retrieves whether this database allows having multiple transactions open at
   * once (on different connections).
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsMultipleTransactions(): boolean {
    return this.dbm.supportsMultipleTransactionsSync();
  }

  /**
   * Retrieves whether this database supports named parameters to callable
   * statements.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsNamedParameters(): boolean {
    return this.dbm.supportsNamedParametersSync();
  }

  /**
   * Retrieves whether columns in this database may be defined as non-nullable.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsNonNullableColumns(): boolean {
    return this.dbm.supportsNonNullableColumnsSync();
  }

  /**
   * Retrieves whether this database supports keeping cursors open across
   * commits.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsOpenCursorsAcrossCommit(): boolean {
    return this.dbm.supportsOpenCursorsAcrossCommitSync();
  }

  /**
   * Retrieves whether this database supports keeping cursors open across
   * rollbacks.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsOpenCursorsAcrossRollback(): boolean {
    return this.dbm.supportsOpenCursorsAcrossRollbackSync();
  }

  /**
   * Retrieves whether this database supports keeping statements open across
   * commits.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsOpenStatementsAcrossCommit(): boolean {
    return this.dbm.supportsOpenStatementsAcrossCommitSync();
  }

  /**
   * Retrieves whether this database supports keeping statements open across
   * rollbacks.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsOpenStatementsAcrossRollback(): boolean {
    return this.dbm.supportsOpenStatementsAcrossRollbackSync();
  }

  /**
   * Retrieves whether this database supports using a column that is not in the
   * SELECT statement in an ORDER BY clause.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsOrderByUnrelated(): boolean {
    return this.dbm.supportsOrderByUnrelatedSync();
  }

  /**
   * Retrieves whether this database supports some form of outer join.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsOuterJoins(): boolean {
    return this.dbm.supportsOuterJoinsSync();
  }

  /**
   * Retrieves whether this database supports positioned DELETE statements.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsPositionedDelete() {
    return this.dbm.supportsPositionedDeleteSync();
  }

  /**
   * Retrieves whether this database supports positioned UPDATE statements.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsPositionedUpdate() {
    this.dbm.supportsPositionedUpdateSync();
  }

  /**
   * Retrieves whether this database supports the given concurrency type in
   * combination with the given result set type.
   *
   * @param {Number} type - Defined in java.sql.ResultSet
   * @param {Number} concurrency - Type defined in java.sql.ResultSet
   * @returns {Boolean} true if so; false otherwise
   */
  supportsResultSetConcurrency(type: number, concurrency: number): boolean {
    return this.dbm.supportsResultSetConcurrencySync(type, concurrency);
  }

  /**
   * Retrieves whether this database supports the given result set holdability.
   *
   * @param {Number} holdability - one of the following constants: ResultSet.HOLD_CURSORS_OVER_COMMIT or ResultSet.CLOSE_CURSORS_AT_COMMIT
   * @returns {Boolean} true if so, false otherwise
   */
  supportsResultSetHoldability(holdability: number): boolean {
    return this.dbm.supportsResultSetHoldabilitySync(holdability);
  }

  /**
   * Retrieves whether this database supports the given result set type.
   *
   * @param {Number} type - defined in java.sql.ResultSet
   * @returns {Boolean} true if so, false otherwise
   */
  supportsResultSetType(type: number): boolean {
    return this.dbm.supportsResultSetTypeSync(type);
  }

  /**
   * Retrieves whether this database supports savepoints.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSavepoints(): boolean {
    return this.dbm.supportsSavepointsSync();
  }

  /**
   * Retrieves whether a schema name can be used in a data manipulation
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSchemasInDataManipulation(): boolean {
    return this.dbm.supportsSchemasInDataManipulationSync();
  }

  /**
   * Retrieves whether a schema name can be used in an index definition
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSchemasInIndexDefinitions(): boolean {
    return this.dbm.supportsSchemasInIndexDefinitionsSync();
  }

  /**
   * Retrieves whether a schema name can be used in a privilege definition
   * statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSchemasInPrivilegeDefinitions(): boolean {
    return this.dbm.supportsSchemasInPrivilegeDefinitionsSync();
  }

  /**
   * Retrieves whether a schema name can be used in a procedure call statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSchemasInProcedureCalls(): boolean {
    return this.dbm.supportsSchemasInProcedureCallsSync();
  }

  /**
   * Retrieves whether a schema name can be used in a table definition statement.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSchemasInTableDefinitions(): boolean {
    return this.dbm.supportsSchemasInTableDefinitionsSync();
  }

  /**
   * Retrieves whether this database supports SELECT FOR UPDATE statements.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSelectForUpdate(): boolean {
    return this.dbm.supportsSelectForUpdateSync();
  }

  /**
   * Retrieves whether this database supports statement pooling.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsStatementPooling(): boolean {
    return this.dbm.supportsStatementPoolingSync();
  }

  /**
   * Retrieves whether this database supports invoking user-defined or vendor
   * functions using the stored procedure escape syntax.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsStoredFunctionsUsingCallSyntax(): boolean {
    return this.dbm.supportsStoredFunctionsUsingCallSyntaxSync();
  }

  /**
   * Retrieves whether this database supports stored procedure calls that use the
   * stored procedure escape syntax.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsStoredProcedures(): boolean {
    return this.dbm.supportsStoredProceduresSync();
  }

  /**
   * Retrieves whether this database supports subqueries in comparison
   * expressions.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSubqueriesInComparisons(): boolean {
    return this.dbm.supportsSubqueriesInComparisonsSync();
  }

  /**
   * Retrieves whether this database supports subqueries in EXISTS expressions.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSubqueriesInExists(): boolean {
    return this.dbm.supportsSubqueriesInExistsSync();
  }

  /**
   * Retrieves whether this database supports subqueries in IN expressions.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSubqueriesInIns(): boolean {
    return this.dbm.supportsSubqueriesInInsSync();
  }

  /**
   * Retrieves whether this database supports subqueries in quantified
   * expressions.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsSubqueriesInQuantifieds(): boolean {
    return this.dbm.supportsSubqueriesInQuantifiedsSync();
  }

  /**
   * Retrieves whether this database supports table correlation names.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsTableCorrelationNames(): boolean {
    return this.dbm.supportsTableCorrelationNamesSync();
  }

  /**
   * Retrieves whether this database supports the given transaction isolation
   * level.
   *
   * @param {Number} level - one of the transaction isolation levels defined in java.sql.Connection
   * @returns {Boolean} true if so, false otherwise
   */
  supportsTransactionIsolationLevel(level: number): boolean {
    return this.dbm.supportsTransactionIsolationLevelSync(level);
  }

  /**
   * Retrieves whether this database supports transactions.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsTransactions(): boolean {
    return this.dbm.supportsTransactionsSync();
  }

  /**
   * Retrieves whether this database supports SQL UNION.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsUnion(): boolean {
    return this.dbm.supportsUnionSync();
  }

  /**
   * Retrieves whether this database supports SQL UNION ALL.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  supportsUnionAll(): boolean {
    return this.dbm.supportsUnionAllSync();
  }

  /**
   * Retrieves whether or not a visible row update can be detected by calling the
   * method ResultSet.rowUpdated.
   *
   * @param {Number} type - the ResultSet type; one of ResultSet.TYPE_FORWARD_ONLY, ResultSet.TYPE_SCROLL_INSENSITIVE, or ResultSet.TYPE_SCROLL_SENSITIVE
   * @returns {Boolean} true if changes are detected by the result set type; false otherwise
   */
  updatesAreDetected(type: number): boolean {
    return this.dbm.updatesAreDetectedSync(type);
  }

  /**
   * Retrieves whether this database uses a file for each table.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  usesLocalFilePerTable(): boolean {
    return this.dbm.usesLocalFilePerTableSync();
  }

  /**
   * Retrieves whether this database stores tables in a local file.
   *
   * @returns {Boolean} true if so; false otherwise
   */
  usesLocalFiles(): boolean {
    return this.dbm.usesLocalFilesSync();
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
