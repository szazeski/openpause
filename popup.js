
const domainText = document.getElementById("domain");

domainText.textContent = "Domain: " + window.location.hostname;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // tabs
    //  Domain: [{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,
    // "favIconUrl":"https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196","frozen":false,"groupId":-1,"height":938,
    // "highlighted":true,"id":2104198532,"incognito":false,"index":13,"lastAccessed":1737390690533.812,
    // "mutedInfo":{"muted":false},"pinned":false,"selected":true,"status":"complete",
    // "title":"How can I get the URL of the current tab from a Google Chrome extension? - Stack Overflow",
    // "url":"https://stackoverflow.com/questions/1979583/how-can-i-get-the-url-of-the-current-tab-from-a-google-chrome-extension",
    // "width":1680,"windowId":2104198346}]

    domainText.textContent = "site: "+ tabs[0].url.split("/")[2];
    });