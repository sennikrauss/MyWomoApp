function searchFunction(suchfeldId){
  let input, filter, table, tr, td, i, occurrence;
  input = document.getElementById(suchfeldId);
  filter = input.value.toUpperCase();
  table = document.getElementById("cards");
  //tr = table.getElementsByTagName("tr");
  tr = table.getElementsByClassName('card-columns-fluid')

  for (i=0; i<tr.length;i++){

    occurrence = false;
    //td = tr[i].getElementsByTagName("td");
    td = tr[i].getElementsByClassName('card-title');
    for (let j = 0; j<td.length; j++){
      const currentTd = td[j];
      if (currentTd){
        if (currentTd.innerText.toUpperCase().indexOf(filter)>-1){
          tr[i].style.display = "";
          occurrence = true;
        }
      }
      if (!occurrence) {
        tr[i].style.display = "none";
      }
    }
  }
}
