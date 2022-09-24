<?php

require_once "mysqli.php";

if (isset($_POST['Name']) && isset($_POST['id'])) {

  $imgData = "";
  if (count($_FILES) > 0) {
    if (is_uploaded_file($_FILES['userImage']['tmp_name'])) {
      $imgData = addslashes(file_get_contents($_FILES['userImage']['tmp_name']));
      $imageProperties = getimageSize($_FILES['userImage']['tmp_name']);
      $imageProperties = $imageProperties['mime'];
    }

    if (isset($_FILES['imageData'])) {
      $imgData = addslashes(file_get_contents($_FILES['imageData']['tmp_name']));
      $imageProperties = getimageSize($_FILES['imageData']['tmp_name']);
      $imageProperties = $imageProperties['mime'];
    }

    $sql = "update places set
                  Name='{$_POST['Name']}',
                  Adresse='{$_POST['Adresse']}',
                  Plz = {$_POST['Plz']},
                  Ort='{$_POST['Ort']}',
                  Land='{$_POST['Land']}',
                  Platzanzahl = {$_POST['Platzanzahl']},
                  Trinkwasser = '{$_POST['Trinkwasser']}',
                  Abwasser = {$_POST['Abwasser']},
                  Toilettenentsorgung = '{$_POST['Toilettenentsorgung']}',
                  Strom = '{$_POST['Strom']}',
                  Dusche = '{$_POST['Dusche']}',
                  WC='{$_POST['WC']}',
                  Wifi='{$_POST['WiFi']}',
                  imageType= '{$_POST['imageType']}',
                  imageData='{$imgData}',
                  Bemerkungen = '{$_POST['Bemerkungen']}'
where id = {$_POST['id']}";

    if (connect() -> query($sql) === TRUE) {
      echo "successfully updated place";
    }
  }
}
