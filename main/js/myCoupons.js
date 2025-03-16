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
const couponList = document.getElementById("couponList");
chrome.storage.sync.get(["coupons"], (result) => {
    const coupons = result.coupons || [];
    coupons.forEach((coupon) => addCouponToList(coupon));
  });
  addCouponBtn.addEventListener("click", () => {
    const coupon = couponInput.value.trim();
    if (coupon) {
      chrome.storage.sync.get(["coupons"], (result) => {
        const coupons = result.coupons || [];
        coupons.push(coupon);
        chrome.storage.sync.set({ coupons }, () => {
          addCouponToList(coupon);
          couponInput.value = "";
        });
      });
    }
  });
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

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        chrome.storage.sync.get(["coupons"], (result) => {
            const coupons = result.coupons || [];
            const updatedCoupons = coupons.filter(c => c !== coupon); // Remove coupon
            chrome.storage.sync.set({ coupons: updatedCoupons }, () => {
                couponList.removeChild(li); // Remove list item from DOM
            });
        });
    });

    // Append buttons to list item
    li.appendChild(copyBtn);
    li.appendChild(deleteBtn);
    couponList.appendChild(li);
  }