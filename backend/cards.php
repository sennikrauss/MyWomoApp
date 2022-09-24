<?php
require_once "mysqli.php";

if (isset($_GET['id'])) {
  require_once "mysqli.php";
  $id = $_GET['id'];
  $sql = "select * from places JOIN countries on countries.code=places.Land where id=$id";
  $images = "select imageData from places where id = $id";
  $result = mysqli_query(connect(),$sql);
  $images = mysqli_query(connect(),$images);

  $cardImages = array();
  while ($row = mysqli_fetch_assoc($images)) {
    if ($row['imageData']){
      array_push($cardImages, "data:image/jpeg;base64,".base64_encode($row['imageData']));
    }else{
      array_push($cardImages, "");
    }
  }

  $counter = 0;
  while( $row = mysqli_fetch_assoc( $result ) ){
    $row['imageData'] = $cardImages[$counter];
    $counter++;
    echo json_encode($row);
  }

}else {
  if (isset($_COOKIE['userId'])){
    $query = mysqli_query(connect(), "select id, Name, Adresse, Plz, Ort, Land, countries.de, Platzanzahl, Trinkwasser, Abwasser, Toilettenentsorgung, Strom, Dusche, WC, WiFi, Bemerkungen from places JOIN countries on countries.code=places.Land where userId = {$_COOKIE["userId"]}");
    $images = mysqli_query(connect(), "select imageData from places where userId = {$_COOKIE["userId"]}");

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
  }
}

