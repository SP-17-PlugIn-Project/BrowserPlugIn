import { db } from "./firebase-config.js";
import { doc, getDoc } from "./../node_modules/firebase/firebase-firestore.js";

document.getElementById("searchButton").addEventListener("click", async () => {
    let storeName = document.getElementById("searchQuery").value.trim().toLowerCase();
    let coupon = await loadCoupons();

    let resultDiv = document.getElementById("results");

    if (coupon && coupon.store.toLowerCase() === storeName) {
        resultDiv.innerHTML = `${coupon.code} - ${coupon.discount}% off`;
    } else {
        resultDiv.innerHTML = "No coupons available <br>Please check again later";
    }
});

async function loadCoupons() {
    try {
        const docRef = doc(db, "coupons", "nf2f19Y3IdZFfxzJQtmX");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data(); // Returns the document as an object
        } else {
            console.error("No coupon document found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coupons", error);
        return null;
    }
}

//const testPage = "../html/menu.hmtl";

document.getElementById("menuButton").addEventListener("click", function () {
    chrome.sidePanel.setOptions({ path: "../html/menu.html" });
})

document.getElementById("logOutLink").addEventListener("click", function () {
    chrome.sidePanel.setOptions({ path: "../html/login.html" });
})
