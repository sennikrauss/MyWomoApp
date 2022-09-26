const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function sendLoginData(){
  let form = document.getElementById('loginForm');
  let data = new FormData(form);
  fetch("backend/login.php", {
    method: "POST",
    body: data
  }).then((result) => {
    if (result.status !== 200) {
      throw new Error("Bad Server Response");
    }
    return result.text();
  }).then((response) => {
    console.log(response)
    if (response !== "not valid user!") {
      Notification.requestPermission().then(perm => {
        if (perm === "granted"){
          new Notification("Logged in!",{
            body:"You successfully logged in!",
            icon: "logoicon2.png"
          })
        }
      })
      window.location.href= "/";
    }
  }).catch((error) => {
    console.log(error);
  })
  return false;
}

function checkPassword(pw) {
  let passwordInput = document.getElementById('password-neu').value
  if (pw.value !== passwordInput) {
    pw.setCustomValidity('Passwort stimmt nicht überein.');
  } else {
    pw.setCustomValidity('');
  }
}

function sendSignInData() {
  let form = document.getElementById('signinForm');
  let data = new FormData(form);
  fetch("/backend/login.php", {
    method: "POST",
    body: data
  }).then(result => {
    return result.text();
  }).then(response => {
    console.log(response);
    if (response === "insertedNewUser") {
      location.reload();
    }
  }).catch(error => {
    console.error(error);
  })
  return false;
}
