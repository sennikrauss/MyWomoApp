const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("id")) {
  function fillForm(data) {
    document.getElementById('form').name = "editPlace";
    document.getElementById('form').setAttribute("onsubmit", "return editCard();");
    document.getElementById('header').innerHTML = data.Name;
    document.getElementById('name').value = data.Name;
    document.getElementById('adresse').value = data.Adresse;
    document.getElementById('plz').value = data.Plz;
    document.getElementById('ort').value = data.Ort;
    document.getElementById('land').value = data.Land;
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
    document.getElementById('submit').innerHTML = "Speichern";
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
        readAllData('cards')
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
  data.append("imageData", "null");

  fetch("backend/updateCard.php", {
    method: "POST",
    body: data
  }).then(result => {
    console.log(result);
    return result.text();
  }).then(data => {
    if (data === "successfully updated place"){
      window.location.href = "/cards.html";
    }
  }).catch(error => {
    console.error(error);
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
  data.append("userId", userId);
  /* Bild kommt später in Form noch hinzu --> erstmal nur dummy null: */
  data.append("imageType", "null");
  data.append("imageData", "null");

  fetch("backend/addCard.php", {
    method: "POST",
    body: data
  }).then(result => {
    return result.text();
  }).then(response => {
    if (response === "successfully inserted data"){
      window.location.href = "/cards.html";
    }
  }).catch(error => {
    console.error(error);
  })
  return false;
}
