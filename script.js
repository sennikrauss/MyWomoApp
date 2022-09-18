const CACHE_VERSION = 1;
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

button.addEventListener("click", () => {
Notification.requestPermission().then(perm => {
  if (perm === "granted"){
  new Notification("Yes subscribed!",{
  body:"You successfully subscribed to our Notification service!",
  icon: "logo1.png"
  })
  }
 })
})

let notification
document.addEventListener("visibilitychange",() => {
  if(document.visibilityState === "hidden"){
   notification = new Notification("Come back please", {
   body: "Pleaaase",
   tag: "Come Back",
   })
   } else{
     notification.close()
  }
})


/**document.getElementById("list").addEventListener ("click", () => {
 Notification.requestPermission().then(perm =>{
  alert("hi")
 })
})

let notification
let interval
document.addEventListener("visibilitychange",() => {
  if(document.visibilityState === "hidden"){
  const leaveDate = new Date()
   interval () = setInterval( ()=> {
    notification = new Notification("Come back pleaaase", {
       body: "you have been gone for
        ${ Math.round( (new Date()-leaveDate) /1000
       )} seconds ",
       tag: "Come Back",
       })
   },100)
   } else{
     if (interval) clearInterval(interval)
     if (notification) notification.close()
  }
})

/**data showing**/
/**button.addEventListener("click", () => {
Notification.requestPermission().then(perm => {
  if (perm === "granted"){
  const notification = new Notification ("Successfully subscribed!", {
  body:"You successfully subscribed to our Notification service!",
  data:{ hello: "world"},
  icon: "logo1.png"
  })
    notification.addEventListener("error", e => {
     console.log(e)
     alert("error")
    })
  }
 })
})**/


/**von Freiheit**/

/**let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

function displayConfirmNotification() {
    if('serviceWorker' in navigator) {
        let options = {
            body: 'You successfully subscribed to our Notification service!',
            icon: '/src/images/icons/fiw96x96.png',
            image: '/src/images/htw-sm.jpg',
            lang: 'de-DE',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/fiw96x96.png',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: 'Ok', icon: '/src/images/icons/fiw96x96.png' },
                { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/fiw96x96.png' },
            ]
        };

        navigator.serviceWorker.ready
            .then( sw => {
                sw.showNotification('Successfully subscribed (from SW)!', options);
            });
    }
}

function configurePushSubscription() {
    if(!('serviceWorker' in navigator)) {
        return
    }

    let swReg;
    navigator.serviceWorker.ready
        .then( sw => {
            swReg = sw;
            return sw.pushManager.getSubscription();
        })
        .then( sub => {
            if(sub === null) {
                swReg.pushManager.subscribe();
            } else {
                // already subscribed
            }
        });
}


function askForNotificationPermission() {
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {
            // displayConfirmNotification();
            configurePushSubscription();
        }
    });
}

if('Notification' in window && 'serviceWorker' in navigator) {
    for(let button of enableNotificationsButtons) {
        button.style.display = 'inline-block';
        button.addEventListener('click', askForNotificationPermission);
    }
}**/