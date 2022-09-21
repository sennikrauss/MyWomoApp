<?php

require_once "mysqli.php";

if (isset($_POST['Name']) && isset($_POST['id'])) {
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
                  imageData='{$_POST['imageData']}',
                  Bemerkungen = '{$_POST['Bemerkungen']}'
where id = {$_POST['id']}";

  if (connect() -> query($sql) === TRUE) {
    echo "successfully updated place";
  }
}
