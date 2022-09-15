let installEvent = null;

let installButton2 = document.getElementById("install2");
let installButton = document.getElementById("install");
let logoutBtn = document.getElementById("logoutBtn");
let homeBtn = document.getElementById("home");
let loginBtn = document.getElementById("loginBtn");
let installButton3 = document.getElementById("install3");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getCookie("userId")){
  if (installButton && installButton2) {
    installButton.style.display = "initial";
    installButton2.style.display = "initial";
  }
  if (logoutBtn) {
    logoutBtn.style.display = "initial";
  }

  if (homeBtn) {
    homeBtn.style.display = "initial";
  }

  if (loginBtn) {
    loginBtn.style.display = "none";
  }
}

if (installButton && installButton2){
  if(installButton.style.display !=="none" && installButton2.style.display !== "none") {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      console.log("Ready to install...");
      installEvent = e;
    });

    installButton.addEventListener("click", function() {
      installEvent.prompt();
    });

    installButton2.addEventListener("click", function() {
      installEvent.prompt();
    });
  }

}

if (installButton3 && installButton3.style.display !== "none") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    console.log("Ready to install...");
    installEvent = e;
  });

  installButton3.addEventListener("click", function() {
    installEvent.prompt();
  });
}

if (logoutBtn && logoutBtn.style.display!=="none") {
  logoutBtn.addEventListener('click', () => {
    async function deleteCookies() {
      let name1 = "user";
      let name2 = "userId";
      document.cookie = name1 + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name1 + '=; path=/cards.html; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name2 + '=; path=/backend/cards.php; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name2 + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    deleteCookies().then(() => {
      document.location.pathname = "/login.php";
    })
  })
}
