const CACHE_VERSION = 1;
const button = document.querySelector("button")

let installEvent = null;
let installButton = document.getElementById("install");
let installButton2 = document.getElementById("install2");
let installButton3 = document.getElementById("install3");
let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logoutBtn");
let homeBtn = document.getElementById("home");
let clickToLogin = document.getElementById('clickToLogin');

const CURRENT_STATIC_CACHE = 'static-v'+CACHE_VERSION;

/**button.addEventListener("click", () => {
 Notification.requestPermission().then(perm =>{
  if( perm === "granted") {
   const notification = new Notification(" Hey Schau doch mal auf unsere Social Media Kanäle vorbei",{
   body: " hier kommt ein Text hin",
   data: { hello: "world"}
   )}
    notification.addEventListener("close", e => {
    console.log()
    })
   }
 })
})**/

let notification
let interval
document.addEventListener("click", () => {
  if( document.visibilityState === "hidden") {
   setInterval()=> {
   notification = new Notification("hi",{
   body: "hey you",
   tag: "world",
   })
   }, 100)
   } else{
    notification.close()
    }
 })


if (clickToLogin) {
  clickToLogin.addEventListener("click", function() {
    this.disabled = true;
    startPwa(true);
  });
}

if(localStorage["pwa-enabled"]) {
  startPwa();
}

function startPwa(firstStart) {
  localStorage["pwa-enabled"] = true;

  if(firstStart) {
    //window.reload();
    location.href = "/";
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(registration => {
        console.log("Service Worker is registered", registration);
        if (installButton && installButton2) {
          installButton.style.display = "initial";
          installButton2.style.display = "initial";
        }

        if (homeBtn) {
         homeBtn.style.display = "initial";
        }

        if (loginBtn) {
          loginBtn.style.display = "none";
        }

        if (logoutBtn) {
          logoutBtn.style.display = "initial";
        }
      })
      .catch(err => {
        console.error("Registration failed:", err);
      });
  });

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    console.log("Ready to install...");
    installEvent = e;
  });

  setTimeout(cacheLinks, 500);

  function cacheLinks() {
    caches.open(CURRENT_STATIC_CACHE).then(function(cache) {
      let linksFound = [];
      document.querySelectorAll("a").forEach(function(a) {
        linksFound.push(a.href);
      });

      cache.addAll(linksFound);
    });
  }

  if(installButton && installButton2) {
    installButton.addEventListener("click", function() {
      installEvent.prompt();
    });

    installButton2.addEventListener("click", function() {
      installEvent.prompt();
    });
  }

  if (installButton3){
    installButton3.addEventListener("click", function() {
      installEvent.prompt();
    });
  }
}
