<?php
if ($_POST['id']){
  require_once "mysqli.php";
  $sql = "delete from places where id = {$_POST['id']}";
  $sql = mysqli_query(connect(), $sql);
  echo json_encode("successfully deleted place.");
}
