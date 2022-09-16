const db = idb.openDB('cards', 1, {
  upgrade(db) {
    const store = db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('id', 'id');
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