<?php
require_once "mysqli.php";

if (isset($_POST['username'])) {
  $username = $_POST['username'];
  $userIsInDB = mysqli_query(connect(), "select * from users where username = '$username'");
  if ($userIsInDB->num_rows > 0) {
    $user = mysqli_fetch_assoc($userIsInDB);

    if (isset($_POST['password'])) {
      if (password_verify($_POST['password'], $user['password'])) {
        setcookie("user", $username, time()+3600, "/cards.html");
        setcookie("user", $username, time()+3600, "/");
        //setcookie("user_for_form", $username, time()+3600, "/form.php");
        //setcookie("userId_for_form", $user['userid'], time()+3600, "/backend/formData.php");
        setcookie("userId", $user['userid'], time()+3600, "/backend/cards.php");
        setcookie("userId", $user['userid'], time()+3600, "/");
        echo "valid user!" . $user['userid'];
        return true;
      }else {
        echo "not valid user!";
        return false;
      }
    }
  }else {
    echo "not valid user!";
    return false;
  }
}
