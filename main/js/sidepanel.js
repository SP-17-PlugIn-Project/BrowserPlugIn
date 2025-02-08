document.getElementById("searchButton").addEventListener("click", function() {
    let userInput = document.getElementById("searchQuery").value;
    let storeName = userInput.trim().toLowerCase();

    let coupons = { "test": ["5% off coupon"] };

    let resultDiv = document.getElementById("results");

    if (coupons[storeName]) { 
        resultDiv.innerHTML = coupons[storeName].join("<br>");
    } else {
        resultDiv.innerHTML = "No coupons available <br>Please check again later";
    }
});
