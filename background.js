console.log("openpause extension - background.js started");

// LocalStorage is not available to service worker


function tick(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        const domain = tabs[0].url.split("/")[2];
        console.log("openpause tick", domain, value);
    });
}

//setInterval(tick, 1000);