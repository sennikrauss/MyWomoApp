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
      window.location.href= "/";
    }
  }).catch((error) => {
    console.log(error);
  })
  return false;
}
