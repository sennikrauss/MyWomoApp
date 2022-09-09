<?php
require_once "mysqli.php";
  $query = mysqli_query(connect(), "select id, Name, Adresse, Plz, Ort, Land, countries.de, Platzanzahl, Trinkwasser, Abwasser, Toilettenentsorgung, Strom, Dusche, WC, WiFi, Bemerkungen from places JOIN countries on countries.code=places.Land");
  $images = mysqli_query(connect(), "select imageData from places");

  $records = [];

  $cardImages = array();
  while ($row = mysqli_fetch_assoc($images)) {
    if ($row['imageData']){
      array_push($cardImages, "data:image/jpeg;base64,".base64_encode($row['imageData']));
    }else{
      array_push($cardImages, "");
    }
  }
  $counter = 0;
  while( $row = mysqli_fetch_assoc( $query ) ){
    $row['imageData'] = $cardImages[$counter];
    array_push( $records, $row );
    $counter++;
  }

  echo json_encode($records);

