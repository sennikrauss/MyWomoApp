const db = idb.openDB('cards-store', 4, {
  upgrade(db) {
    const store = db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('id', 'id');

    // Create another store of objects
    const store2 = db.createObjectStore('sync-cards', {
      keyPath: '_id',
      autoIncrement: true,
    });
    store2.createIndex('_id', '_id');
    },
});

function writeData(st, data) {
  return db
    .then( dbCards => {
      let tx = dbCards.transaction(st, 'readwrite');
      let store = tx.objectStore(st);
      store.put(data);
      return tx.done;
    })
}

function readAllData(st) {
  return db
    .then( dbCards => {
      let tx = dbCards.transaction(st, 'readonly');
      let store = tx.objectStore(st);
      return store.getAll();
    })
}

function readSingleDate(st, id) {
  return db
    .then( dbCards => {
      let tx = dbCards.transaction(st, 'readonly');
      let store = tx.objectStore(st);
      return store.get(id);
    })
}

function deleteOneData(st, _id) {
  db
    .then( dbCards => {
      let tx = dbCards.transaction(st, 'readwrite');
      let store = tx.objectStore(st);
      store.delete(_id);
      return tx.done;
    })
    .then( () => {
      console.log('Data deleted ...');
    });
}
