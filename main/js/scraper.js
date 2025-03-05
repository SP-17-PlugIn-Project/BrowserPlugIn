chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // If the request is to start scraping
    if (request.action === "startScraping") {
        scrapeCoupons();
    }
});

// Scrape coupon data from the current page
function scrapeCoupons() {
    let coupons = [];
    document.querySelectorAll(".coupon").forEach(couponElement => {
        let store = couponElement.querySelector(".store")?.textContent.trim() || "N/A";
        let code = couponElement.querySelector(".code")?.textContent.trim() || "N/A";
        let discount = couponElement.querySelector(".discount")?.textContent.trim() || "N/A";

        coupons.push({ store, code, discount });
    });

    // Send the scraped data to the side panel
    chrome.runtime.sendMessage({ type: "scrapedCoupons", data: coupons });
}
