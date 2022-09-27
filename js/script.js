const CACHE_VERSION = 1;
let installEvent = null;

let installButton = document.getElementById("install");
let logoutBtn = document.getElementById("logoutBtn");
let homeBtn = document.getElementById("home");
let loginBtn = document.getElementById("loginBtn");
let button = document.getElementById("enablebutton");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getCookie("userId")){
  if (installButton) {
    installButton.style.display = "initial";
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

if (installButton){
  if(installButton.style.display !=="none") {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      console.log("Ready to install...");
      installEvent = e;
    });

    installButton.addEventListener("click", function() {
      installEvent.prompt();
    });
  }

}

if (logoutBtn && logoutBtn.style.display!=="none") {
  logoutBtn.addEventListener('click', () => {
    async function deleteCookies() {
      let name1 = "user";
      let name2 = "userId";
      let name3 = "userIdForm";
      document.cookie = name1 + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name1 + '=; path=/cards.html; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name2 + '=; path=/backend/cards.php; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name2 + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = name3 + '=; path=/form.html; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    deleteCookies().then(() => {
      document.location.pathname = "/login.php";
    })
  })
}

if (button) {
  button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
      if (perm === "granted"){
        new Notification("Yes subscribed!",{
          body:"You successfully subscribed to our Notification service!",
          icon: "/icons/pics/logoicon2.png"
        })
      }
    })
  })
}

let notification1
document.addEventListener("visibilitychange",() => {
  if(document.visibilityState === "hidden"){
   notification1 = new Notification("Come back please", {
   body: "Pleaaase",
   tag: "Come Back",
   icon: "/icons/pics/logoicon2.png"
   })
   } else{
     notification1.close()
  }
})


let notification
let interval
document.addEventListener("visibilitychange",() => {
  if(document.visibilityState === "hidden"){
  const leaveDate = new Date();
  interval = setInterval( ()=> {
    notification = new Notification("Come back pleaaase", {
       body: "you have been gone for" + Math.round( (new Date()-leaveDate) /1000) + " seconds.",
       tag: "Come Back",
       icon: "/icons/pics/logoicon2.png"
       })
   },10000)
   } else{
     if (interval) clearInterval(interval)
     if (notification) notification.close()
  }
})


