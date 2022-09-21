const db = idb.openDB('cards-store', 6, {
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

    // Create another store of objects
    const store3 = db.createObjectStore('sync-edit-cards', {
      keyPath: '_id',
      autoIncrement: true,
    });
    store3.createIndex('_id', '_id');

    const store4 = db.createObjectStore('sync-delete-cards', {
      keyPath: '_id',
      autoIncrement: true,
    });
    store4.createIndex('_id', '_id');
  }
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
