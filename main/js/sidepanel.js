document.getElementById("searchButton").addEventListener("click", async function () {
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

// Fetch the csv data from the file
async function loadCoupons() { 
    let response = await fetch("../coupons.csv");
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

const testPage = 'html/menu.hmtl';

document.getElementById("menuButton").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: testPage});
  })