document.getElementById("searchCouponsLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/sidepanel.html"});
})
document.getElementById("couponsLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/myCoupons.html"});
})
document.getElementById("logOutLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/login.html"});
})