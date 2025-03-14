document.getElementById("searchCouponsLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/sidepanel.html"});
})
document.getElementById("menuButton").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/menu.html"});
  })
  document.getElementById("logOutLink").addEventListener("click",function(){
    chrome.sidePanel.setOptions({path: "../html/login.html"});
})