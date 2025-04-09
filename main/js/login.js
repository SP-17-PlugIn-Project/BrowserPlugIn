import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from "./../node_modules/firebase/firebase-auth.js";
import { auth } from "./firebase-config.js";

const emailInput = document.getElementById("emailField");
const passwordInput = document.getElementById("passwordField");

document.getElementById("registerButton").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user; We can use this later
      chrome.sidePanel.setOptions({ path: "../html/menu.html" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Registration failed " + errorMessage);
      console.error("Registration error ", errorCode);
    });
});

document.getElementById("loginButton").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user; We can use this later
      chrome.sidePanel.setOptions({ path: "../html/menu.html" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Login failed " + errorMessage);
      console.error("Login error ", errorCode);
    });
});

document.getElementById("guestButton").addEventListener("click", () => {

  signInAnonymously(auth)
    .then((userCredential) => {
      // const user = userCredential.user; We can use this later
      chrome.sidePanel.setOptions({ path: "../html/menu.html" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Guest login failed " + errorMessage);
      console.error("Guest login error ", errorCode);
    });
});
