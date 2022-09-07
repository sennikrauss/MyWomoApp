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
}
