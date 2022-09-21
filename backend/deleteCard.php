<?php
if ($_POST['id']){
  require_once "mysqli.php";
  $sql = "delete from places where id = {$_POST['id']}";
  if (connect()->query($sql)){
    echo "successfully deleted place.";
  }
}
