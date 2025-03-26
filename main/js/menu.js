import { getAuth, onAuthStateChanged } from "./../node_modules/firebase/firebase-auth.js";
import { firebaseApp } from "./firebase-config.js";

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
    if (!user) {
        chrome.sidePanel.setOptions({ path: "../html/login.html" });
    }
});

document.getElementById("searchCouponsLink").addEventListener("click", function () {
    chrome.sidePanel.setOptions({ path: "../html/sidepanel.html" });
})
document.getElementById("couponsLink").addEventListener("click", function () {
    chrome.sidePanel.setOptions({ path: "../html/myCoupons.html" });
})
document.getElementById("logOutLink").addEventListener("click", function () {
    chrome.sidePanel.setOptions({ path: "../html/login.html" });
})