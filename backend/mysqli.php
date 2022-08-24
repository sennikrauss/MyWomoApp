<?php
require_once "db.config.php";
function connect() {
  $connect = mysqli_connect(HOST, USER, PASSWORD, NAME);
  if (!$connect) {
    die('Could not connect: ' . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");
  return $connect;
}

function fetchData($queryString) {
  $query = mysqli_query(connect(), $queryString);
  $records = [];
  while ($row = mysqli_fetch_assoc($query)){
    array_push($records, $row);
  }
  echo json_encode($records);
}
