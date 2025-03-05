// Global variable needed for uploaded coupons
let cachedCoupons = null;

// Wait until the page is loaded
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("searchButton").addEventListener("click", async () => {
        let userInput = document.getElementById("searchQuery").value;
        let storeName = userInput.trim().toLowerCase();

        // Load coupons and filter them by the store name
        let coupons = await loadCoupons();
        coupons = coupons.filter(coupon => coupon.Store.toLowerCase() === storeName);

        let resultDiv = document.getElementById("results");

        // Format the coupons into a string, or show a message
        if (coupons.length > 0) {
            let couponList = coupons.map(coupon => `${coupon.Coupon} - ${coupon.Discount}% off`).join("<br>");
            resultDiv.innerHTML = couponList;
        } else {
            resultDiv.innerHTML = "No coupons available <br>Please check again later";
        }
    });

    let scrapeButton = document.getElementById("scrapeButton");
    if (scrapeButton) {
        // If the scrape button is clicked, then request the active tab to scrape
        scrapeButton.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "startScraping" });
            });
        });
    }

    // Listen for messages sent from scraper.js
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // If the message is about coupons
        if (message.type === "scrapedCoupons") {
            downloadCSV(message.data);
        }
    });

    // Download the coupon data as a CSV file
    function downloadCSV(coupons) {
        let headers = "Store,Coupon,Discount";
        let lines = coupons.map(c => `${c.store},${c.code},${c.discount}`);
        // Combine headers and lines
        let csvData = [headers, ...lines].join("\n");

        // Create new CSV file from the data (Blob = Binary Large Object)
        let file = new Blob([csvData], { type: "text/csv" });
        let url = URL.createObjectURL(file);

        // Create a link and download the file
        let link = document.createElement("a");
        link.href = url;
        link.download = "updated_coupons.csv";
        link.click();
    }

    let csvInput = document.getElementById("csvUpload");
    if (csvInput) {
        // If a CSV is uploaded, then replace the existing coupons
        csvInput.addEventListener("change", async (e) => {
            let file = e.target.files[0];
            if (!file) return;

            let text = await file.text();
            let csvData = parseCSV(text);

            // Store the coupons
            cachedCoupons = csvData;
            alert(`Uploaded coupons from the new CSV`);
        });
    }

});

// Fetch the csv data from the file
async function loadCoupons() {
    // If the user has uploaded a CSV, then use that instead
    if (cachedCoupons) {
        return cachedCoupons;
    }

    let url = chrome.runtime.getURL("coupons.csv")
    let response = await fetch(url);
    let csvData = await response.text();

    // Parse and return the csv data
    return parseCSV(csvData);
}

// Parse the csv data
function parseCSV(csvData) {
    let lines = csvData.trim().split("\n"); // Split the data into lines (rows)
    let headers = lines.shift().split(","); // Extract and split the first row to get the headers (column names)

    return lines.map(line => {
        let values = line.split(","); // Split each row into values
        let couponObj = {};

        // For each header, assign the corresponding value from the current row to the object, or N/A if missing
        headers.forEach((header, index) => {
            couponObj[header.trim()] = values[index]?.trim() || "N/A";
        });
        return couponObj; // Return the coupon object for the row
    });
}

//const testPage = "../html/menu.hmtl";

document.getElementById("menuButton").addEventListener("click", function () {
    chrome.sidePanel.setOptions({ path: "../html/menu.html" });
})
