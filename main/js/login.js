import { getAuth, signInAnonymously } from "./../node_modules/firebase/firebase-auth.js";
import { firebaseApp } from "./firebase-config.js";

const auth = getAuth(firebaseApp);
document.getElementById("loginSubmit").addEventListener("click", () => {
  signInAnonymously(auth)
    .then(() => {
      chrome.sidePanel.setOptions({ path: "../html/menu.html" });
    })
    .catch((error) => {
      console.error("Authentication failed", error);
    });
});