<?php

if (isset($_POST['addNewCard'])) {
  require_once "mysqli.php";

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
  }

  $_POST['Trinkwasser'] = (isset($_POST['Trinkwasser'])) ? intval($_POST['Trinkwasser']) : 0; // returns 0 or 1
  $_POST['Abwasser'] = (isset($_POST['Abwasser'])) ? intval($_POST['Abwasser']) : 0; // returns 0 or 1
  $_POST['Toilettenentsorgung'] = (isset($_POST['Toilettenentsorgung'])) ? intval($_POST['Toilettenentsorgung']) : 0; // returns 0 or 1
  $_POST['Strom'] = (isset($_POST['Strom'])) ? intval($_POST['Strom']) : 0; // returns 0 or 1
  $_POST['Dusche'] = (isset($_POST['Dusche'])) ? intval($_POST['Dusche']) : 0; // returns 0 or 1
  $_POST['WC'] = (isset($_POST['WC'])) ? intval($_POST['WC']) : 0; // returns 0 or 1
  $_POST['WiFi'] = (isset($_POST['WiFi'])) ? intval($_POST['WiFi']) : 0; // returns 0 or 1


  $sql = "INSERT INTO places VALUES (
                           null,
                            '{$_POST['Name']}',
                            '{$_POST['Adresse']}',
                            '{$_POST['Plz']}',
                            '{$_POST['Ort']}',
                            '{$_POST['Land']}',
                            {$_POST['Platzanzahl']},
                            '{$_POST['Trinkwasser']}',
                            '{$_POST['Abwasser']}',
                            '{$_POST['Toilettenentsorgung']}',
                            '{$_POST['Strom']}',
                            '{$_POST['Dusche']}',
                            '{$_POST['WC']}',
                            '{$_POST['WiFi']}',
                            '{$_POST['imageType']}',
                            '{$imgData}',
                            '{$_POST['Bemerkungen']}',
                            {$_POST['userId']}
                            )";

  if (connect() -> query($sql) === TRUE){
    echo "successfully inserted data";
  }else {
    echo connect() -> error;
  }
}
