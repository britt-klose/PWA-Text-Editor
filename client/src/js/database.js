import { openDB } from 'idb';

const initdb = async () =>
  //create new db named jate using version 1
  openDB('jate', 1, {
    //add db schema if not already there
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //Create new object store for data with a key named id and set autoincrement to true
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic that accepts some content and adds it to the database
export const putDb = async (id, value) => {
    console.log('Hit PUT request to DB')
  //create connection to db
  const jateDb= await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges.
   const tx = jateDb.transaction('jate', 'readwrite');

   // Open up the desired object store.
   const store = tx.objectStore('jate');
 
   // Use the .put() method on the store and pass in the content.
   const request = store.put({id: id, value: value});
 
   // Get confirmation of the request.
   const result = await request;
   console.log('🚀 - data saved to the database', result);
};

// logic that gets all the content from the database
export const getDb = async () => {

   // Create a connection to the database database and version we want to use.
   const jateDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges.
   const tx = jateDb.transaction('jate', 'readonly');
 
   // Open up the desired object store.
   const store = tx.objectStore('jate');
 
   // Use the .get(1) method to get only data in the database.
   const request = store.getAll();
 
   // Get confirmation of the request.
   const result = await request;
   console.log('result.value', result.value);
   return result?.value
};

//Starts db
initdb();
