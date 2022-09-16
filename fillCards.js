fetch(window.location.origin + "/backend/cards.php")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data)
    updateUI(data);
  })
  .catch((err) => {
    console.log(err)
  })

let sharedCardsArea = document.querySelector("#cards");

function createCard(card) {
  let divColLg6 = document.createElement('div');
  divColLg6.className = 'col-lg-6';
  sharedCardsArea.appendChild(divColLg6);

  let divCardColumnsFluid = document.createElement('div');
  divCardColumnsFluid.className = 'card-columns-fluid';
  divColLg6.appendChild(divCardColumnsFluid);

  let divCardBgLight = document.createElement('div');
  divCardBgLight.className = 'card bg-light';
  divCardBgLight.style.marginBottom = '1rem';
  let image = new Image();
  image.src = card.imageData;
  image.className = "card-img-top";
  image.style.width = "100%";
  image.style.height = "15vw";
  image.style.objectFit = "cover";
  divCardBgLight.appendChild(image);
  divCardColumnsFluid.appendChild(divCardBgLight);

  let divCardBody = document.createElement('div');
  divCardBody.className = 'card-body';
  divCardBgLight.appendChild(divCardBody);

  let cardTitle = document.createElement('h5');
  cardTitle.className = "card-title";
  cardTitle.style.textOverflow = "ellipsis";
  cardTitle.style.overflow = "hidden";
  cardTitle.style.whiteSpace = "nowrap";
  let cardTitleBold = document.createElement('b');
  cardTitleBold.innerText = card.Name;
  cardTitle.appendChild(cardTitleBold);


  let hrLine = document.createElement('hr');
  divCardBody.appendChild(hrLine);

  divCardBody.appendChild(cardTitle);

  let cardText = document.createElement('p');
  cardText.className = "card-text";
  cardText.innerHTML = card.Adresse + "<br />" + card.Plz + " "+card.Ort;
  divCardBody.appendChild(cardText);

  let aToForm = document.createElement('a');
  aToForm.setAttribute('href', 'form.html?id='+card.id);
  aToForm.className = "btn btn-secondary";
  aToForm.textContent = "Full Details";
  divCardBody.appendChild(aToForm);


  let formForOpenJournal = document.createElement('form');
  formForOpenJournal.setAttribute('id', "openJournal");
  formForOpenJournal.setAttribute('action', "");
  formForOpenJournal.setAttribute('method', "get");
  formForOpenJournal.style.display = "inline";
  divCardBody.appendChild(formForOpenJournal);

  let inputOfFormForOpenJournal = document.createElement('input');
  inputOfFormForOpenJournal.setAttribute('name', "id");
  inputOfFormForOpenJournal.value = card.id;
  inputOfFormForOpenJournal.setAttribute('type', "hidden");
  formForOpenJournal.appendChild(inputOfFormForOpenJournal);

  let buttonOfFormForOpenJournal = document.createElement('button');
  //buttonOfFormForOpenJournal.className = "btn btn-light";
  buttonOfFormForOpenJournal.setAttribute("type", "submit");
  buttonOfFormForOpenJournal.style.all = "unset";
  buttonOfFormForOpenJournal.setAttribute("id", "openJournalBtn");
  let imageOfButtonOfFormForOpenJournal = document.createElement('i');
  imageOfButtonOfFormForOpenJournal.className = "bi bi-journal-plus";
  buttonOfFormForOpenJournal.appendChild(imageOfButtonOfFormForOpenJournal);
  formForOpenJournal.appendChild(buttonOfFormForOpenJournal);

  let formForDeletePlace = document.createElement('form');
  formForDeletePlace.setAttribute('id', "formDelete_"+card.id);
  formForDeletePlace.onsubmit = function () {
    let form = document.getElementById("formDelete_"+card.id);
    let data = new FormData(form);
    fetch("/backend/deleteCard.php", {
      method: "POST",
      body: data
    }).then((result) => {
      return result.json();
    }).then((res) => {
      console.log(res);
      window.location.reload();
    })
    return false;
  };
  formForDeletePlace.style.display = "inline-block";
  formForDeletePlace.style.position = "absolute";
  formForDeletePlace.style.right = "0";

  let inputOfFormForDeletePlace = document.createElement('input');
  inputOfFormForDeletePlace.setAttribute('name', "id");
  inputOfFormForDeletePlace.value = card.id;
  inputOfFormForDeletePlace.setAttribute('type', "hidden");
  formForDeletePlace.appendChild(inputOfFormForDeletePlace);

  let buttonOfFormForDeletePlace = document.createElement('button');
  //buttonOfFormForDeletePlace.className = "btn btn-light";
  buttonOfFormForDeletePlace.setAttribute("type", "submit");
  buttonOfFormForDeletePlace.style.all = "unset";
  buttonOfFormForDeletePlace.setAttribute("id", "deleteCard");
  buttonOfFormForDeletePlace.setAttribute("name", "deletedCard");
  let imageOfButtonOfFormForDeleteJournal = document.createElement('i');
  imageOfButtonOfFormForDeleteJournal.className = "bi bi-trash";
  imageOfButtonOfFormForDeleteJournal.style.color = "red";
  buttonOfFormForDeletePlace.appendChild(imageOfButtonOfFormForDeleteJournal);
  formForDeletePlace.appendChild(buttonOfFormForDeletePlace);

  divCardBody.appendChild(formForDeletePlace);
}

function updateUI(data) {
  for(let card of data) {
    createCard(card);
  }
}
