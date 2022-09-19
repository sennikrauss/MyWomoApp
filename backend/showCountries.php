<?php
require_once "mysqli.php";
$countriesSql = "select * from countries";
$countries = mysqli_query(connect(),$countriesSql);
$data = [];
while ($row = mysqli_fetch_assoc($countries)){
  array_push($data, $row);
}
echo json_encode($data);
