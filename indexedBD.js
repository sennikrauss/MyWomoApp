const db = idb.openDB('cards', 1, {
  upgrade(db) {
    const store = db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('id', 'id');
    },
});