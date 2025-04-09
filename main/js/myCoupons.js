document.getElementById("searchCouponsLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/sidepanel.html"});
})
document.getElementById("menuButton").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/menu.html"});
  })
  document.getElementById("logOutLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/login.html"});
})
const couponInput = document.getElementById("couponInput");
const addCouponBtn = document.getElementById("addCouponButton");
// const couponList = document.getElementById("couponList");

addCouponBtn.addEventListener("click", () => {
  const couponText = couponInput.value.trim();
  const [store, code, discount] = couponText.split("-");

  if (!store || !code || !discount) {
    alert("Please enter coupon in the format: store-code-discount");
    return;
  }

  const couponData = { store, code, discount };

  fetch("http://127.0.0.1:5001/sp-17-plugin/us-central1/addCoupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(couponData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.text();
    })
    .then(result => {
      console.log("Successfully added coupon ", result);
      couponInput.value = "";
    })
    .catch(error => {
      console.error("Failed to add coupon to Firestore ", error);
      alert("Failed to submit coupon");
    });
});

/*
  function addCouponToList(coupon) {
    const li = document.createElement("li");
    li.textContent = coupon;
    // Create Copy button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.style.marginLeft = "10px";
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(coupon).then(() => {
            alert("Coupon copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy coupon:", err);
        });
    });

    // Append buttons to list item
    li.appendChild(copyBtn);
    couponList.appendChild(li);
  }
  */