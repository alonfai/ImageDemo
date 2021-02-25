import { IDBPDatabase, openDB, deleteDB } from 'idb';

const Database_Name = 'image_test';
const Table_Name = 'imageobjectstore';

/**
 * Utility class for working with IndexedDb records
 *
 * Example use:
 * ------------
 ** const Test: React.FC = () => {
    React.useEffect(() => {
        const runIndexDb = async () => {
            const indexedDb = new IndexedDb('test');
            await indexedDb.createObjectStore(['books', 'students']);
            await indexedDb.putValue('books', { name: 'A Game of Thrones' });
            await indexedDb.getValue('books', 1);
            await indexedDb.getAllValue('books');
            await indexedDb.deleteValue('books', 1);
        }
        runIndexDb();
    }, []);

    return (<>Test</>)

}
 */
class IndexedDb {
  /**
   * (Optional) Show logs for events (defaults to false)
   */
  private showLog: boolean;
  /**
   * reference to the indexedDB instance
   */
  private db?: IDBPDatabase;

  /**
   * Create a utility class functions for working with IndexedDb tables
   * @param showLog (Optional) print console.log messages from different call methods. Defaults to false
   */
  constructor(showLog = false) {
    this.showLog = showLog;
  }

  /**
   * Initialize a table in the store. Returns true/false on success/failure adding the tables
   * @param table table information to load into the database
   */
  public async createTable(): Promise<boolean> {
    try {
      this.db = await openDB(Database_Name, 1, {
        upgrade(db: IDBPDatabase) {
          if (db.objectStoreNames.contains(Table_Name)) {
            return;
          }
          db.createObjectStore(Table_Name, {
            autoIncrement: true,
            keyPath: 'id'
          });
        }
      });
      return true;
    } catch (error) {
      console.error('Unable to createObjectStore with tableNames provided');
      return false;
    }
  }

  /**
   * Deletes the database
   */
  public async reset(): Promise<void> {
    return deleteDB(Table_Name);
  }

  /**
   * Deletes a table from the database
   */
  public async deleteTable(): Promise<void> {
    if (!this.db) {
      throw new Error('this.db was not initialized');
    }
    return this.db.deleteObjectStore(Table_Name);
  }

  /**
   * clear the records from the table
   */
  public async clear(): Promise<void> {
    if (!this.db) {
      throw new Error('this.db was not initialized');
    }
    return this.db.clear(Table_Name);
  }

  /**
   * Return the value of a key-value pair
   * @param recordId id to look for of the field
   */
  public async getValue<T>(recordId: IDBValidKey): Promise<T> {
    if (!this.db) {
      throw new Error('this.db was not initialized');
    }
    const result = await this.db.get(Table_Name, recordId);
    if (this.showLog) {
      console.log('Get Data ', JSON.stringify(result));
    }
    return result;
  }

  /**
   *  returns all the values in a table and requires only the table name
   */
  public async getAllValues(): Promise<any[]> {
    if (!this.db) {
      throw new Error('this.db was not initialized');
    }
    const result = this.db.getAll(Table_Name);
    return result;
  }

  /**
   * Add the values in the field. Returns the resulting put value
   * @param value the value to put in
   */
  public async putValue(value: any): Promise<IDBValidKey> {
    if (!this.db) {
      throw new Error('this.db was not initialized');
    }
    const result = await this.db.put(Table_Name, value);
    // Other way using regular transaction:
    // ------------------------------------
    if (this.showLog) {
      console.log('Put Data ', JSON.stringify(result));
    }
    return result;
  }

  /**
   * Delete the value from the table. Returns true/false on success of failure
   * @param recordId id to look for (would be automatically generated when we insert any value because we have set keypath: ‘id’ while creating the tables) of the field
   */
  public async deleteValue(recordId: IDBValidKey): Promise<boolean> {
    if (!this.db) {
      throw new Error('this.db was not initialized');
    }
    const tx = this.db.transaction(Table_Name, 'readwrite');
    const store = tx.objectStore(Table_Name);
    const result = await store.get(recordId);
    if (!result) {
      if (this.showLog) {
        console.log('Id not found', recordId);
      }
      return false;
    }
    await store.delete(recordId);
    if (this.showLog) {
      console.log('Deleted Data', recordId);
    }
    return true;
  }
}

export { Table_Name, Database_Name };
export default IndexedDb;
