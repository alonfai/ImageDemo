import IndexedDb from './indexedDb';

/**
 * get reference to the database utility class. Throws exception if unable to create
 * @param showLog support logs
 */
export async function getStorage(showLog = false): Promise<IndexedDb> {
  const db = new IndexedDb(showLog);
  const isCreated = await db.createTable();
  if (!isCreated) {
    throw new Error('Unable to create the database with provided table');
  }
  return db;
}

export * as consts from './consts';
export * as hooks from './hooks';
export * as Interfaces from './interfaces';
