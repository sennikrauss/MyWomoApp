if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {
      console.log('service worker registriert')
    })
    .catch(
      err => { console.log(err); }
    );
}
