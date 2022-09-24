const urlParams = new URLSearchParams(window.location.search);
let file = null;

fetch("json/countries.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let selectionCountries = document.getElementById("land");
    data.forEach((country) => {
      let newEle = document.createElement('option');
      newEle.value = country.code;
      newEle.innerHTML = country.de;
      selectionCountries.appendChild(newEle);
    })
  })
  .catch((err) => {
    console.log(err);
  })

if (urlParams.get("id")) {
  function fillForm(data) {
    document.getElementById('form').name = "editPlace";
    document.getElementById('form').setAttribute("onsubmit", "return editCard();");
    document.getElementById('header').innerHTML = data.Name;
    document.getElementById('name').value = data.Name;
    document.getElementById('adresse').value = data.Adresse;
    document.getElementById('plz').value = data.Plz;
    document.getElementById('ort').value = data.Ort;
    let land = document.getElementById('land');
    let firstOption = document.createElement('option');
    firstOption.value = data.Land;
    firstOption.innerHTML = data.de;
    firstOption.selected = true;
    land.appendChild(firstOption);
    document.getElementById('platzanzahl').value = data.Platzanzahl;

    if (data.Trinkwasser === "1") {
      document.getElementById('trinkwasser').value = data.Trinkwasser;
      document.getElementById('trinkwasser').setAttribute("checked", "");
    }

    if (data.Strom === "1") {
      document.getElementById('strom').value = data.Strom;
      document.getElementById('strom').setAttribute("checked", "");
    }

    if (data.WC === "1") {
      document.getElementById('wc').value = data.WC;
      document.getElementById('wc').setAttribute("checked", "");
    }

    if (data.Dusche === "1") {
      document.getElementById('dusche').value = data.Dusche;
      document.getElementById('dusche').setAttribute("checked", "");
    }

    if (data.WiFi === "1") {
      document.getElementById('wifi').value = data.WiFi;
      document.getElementById('wifi').setAttribute("checked", "");
    }

    if (data.Abwasser === "1") {
      document.getElementById('abwasser').value = data.Abwasser;
      document.getElementById('abwasser').setAttribute("checked", "");
    }

    if (data.Toilettenentsorgung === "1") {
      document.getElementById('toilette').value = data.Toilettenentsorgung;
      document.getElementById('toilette').setAttribute("checked", "");
    }

    document.getElementById('bemerkungen').value = data.Bemerkungen;
    document.getElementById('submit').innerHTML = "Submit";
  }

  fetch("/backend/cards.php?" + urlParams)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fillForm(data);
    })
    .catch((err) => {
      console.log(err);
      if('indexedDB' in window) {
        readSingleDate('cards', urlParams.get('id'))
          .then( data => {
            console.log('From cache ...', data);
            fillForm(data);
          })
      }
    })
}

function editCard() {
  let form = document.getElementById("form")
  let data = new FormData(form);
  data.append("id", urlParams.get("id"));
  /* Bild kommt später in Form noch hinzu --> erstmal nur dummy null: */
  data.append("imageType", "null");
  if (file !== null) {
    data.append("imageData", file);
  }

  fetch("backend/updateCard.php", {
    method: "POST",
    body: data
  }).then(result => {
    console.log(result);
    return result.text();
  }).then(data => {
    console.log(data);
    if (data === "successfully updated place"){
      window.location.href = "/cards.html";
    }
  }).catch(error => {
    console.error(error);
    if('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready
        .then( sw => {
          data.append("_id", new Date().toISOString());
          const json = Object.fromEntries(data);
          console.log(json);
          writeData('sync-edit-cards', json)
            .then(() => {
              console.log("edit data")
              return sw.sync.register('sync-new-edit-card').then(() => {
                window.location.href = "/cards.html";
              });
            })
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
  return false;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function addNewCard() {
  let form = document.getElementById("form")
  let data = new FormData(form);
  let userId = getCookie("userIdForm");
  if (file == null && data.get("userImage").size === 0) {
    alert('Erst Foto aufnehmen!')
    return false;
  }
  data.append("userId", userId);
  data.append("addNewCard", "ok");
  data.append("imageType", "null");

  if (file !== null) {
    data.append("imageData", file);
  }

  sendDataToBackend(data);
  return false;
}

function sendDataToBackend(data) {
  fetch("backend/addCard.php", {
    method: "POST",
    body: data
  }).then(result => {
    return result.text();
  }).then(response => {
    console.log(response);
    if (response === "successfully inserted data"){
      window.location.href = "/cards.html";
    }
  }).catch(error => {
    console.error(error);
    if('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready
        .then( sw => {
          data.append("_id", new Date().toISOString());
          const json = Object.fromEntries(data);
          console.log(json);
          writeData('sync-cards', json)
            .then(() => {
              console.log("written data")
              return sw.sync.register('sync-new-card').then(() => {
                window.location.href = "/cards.html";
              });
            })
        })
        .catch(err => {
        console.log(err);
      })
    }
  })
}
