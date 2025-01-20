/*
open-pause extension
&copy; 2025 MIT License
This extension is an open source project designed to be 

*/
const PREFIX = "openpause-extension_";

let siteDurationSeconds = localStorage.getItem(PREFIX+"siteDurationSeconds");
let siteDurationDate = localStorage.getItem(PREFIX+"siteDurationDate");
let timeLimit = 60*20
let blocked = false;

let redDiv = renderTimerDiv();
everySecondFunc()
setInterval(everySecondFunc, 1000);

function everySecondFunc() {

    if (isTabActive()) { 
        if( siteDurationDate !== new Date().toDateString() ){
            console.log("chrome-pause: new day, resetting time from " + siteDurationDate);
            siteDurationSeconds = 0;
            siteDurationDate = new Date().toDateString();
            localStorage.setItem(PREFIX+"siteDurationDate", siteDurationDate);

            if(blocked){
                blocked = false;
                removeTimeoutBlockingDiv();
            }
        }
        
        if( timeLimit - siteDurationSeconds <= 0 && !blocked){
            console.log("chrome-pause: blocking site after " + siteDurationSeconds + " seconds");
            renderTimeoutBlockingDiv();
            blocked = true;
        }

        siteDurationSeconds++;

        if ( siteDurationSeconds > 60 ) {
            if (siteDurationSeconds % 60 ){
                var minutes = Math.floor(siteDurationSeconds / 60);
                redDiv.textContent = minutes + "m";
                localStorage.setItem(PREFIX+"siteDurationSeconds", siteDurationSeconds);
            }
        } else {
            redDiv.textContent = siteDurationSeconds + "s";
            localStorage.setItem(PREFIX+"siteDurationSeconds", siteDurationSeconds);
        }
    }
}
function isTabActive() {
    return !document.hidden;
}
function renderTimeoutBlockingDiv() {
    const blockDiv = document.createElement("div");
    blockDiv.style.backgroundColor = "#000000a4";
    blockDiv.style.color = "#ffffff87";
    blockDiv.style.fontWeight = "bold";
    blockDiv.style.position = "fixed";
    blockDiv.style.top = 0;
    blockDiv.style.left = 0;
    blockDiv.style.width = "100%";
    blockDiv.style.height = "100%";
    blockDiv.style.zIndex = 1000;
    blockDiv.style.textAlign = "center";
    blockDiv.style.fontSize = "60vh";
    blockDiv.style.userSelect = "none";
    blockDiv.textContent = "⏸";
    document.querySelector("body").appendChild(blockDiv);
}
function removeTimeoutBlockingDiv(){
    const blockDiv = document.querySelector("#blockDiv");
    if(blockDiv){
        blockDiv.remove();
    }
}
function renderTimerDiv() {
    console.log("rendering timer div from chrome-pause extension");
    const redDiv = document.createElement("div");
    redDiv.style.backgroundColor = "red";
    redDiv.style.color = "white";
    redDiv.style.fontWeight = "bold";
    redDiv.style.padding = "10px";
    redDiv.style.borderTopRightRadius = "50%";
    redDiv.style.position = "fixed";
    redDiv.style.bottom = 0;
    redDiv.style.left = 0;
    redDiv.style.topright="7px solid white";
    redDiv.style.fontSize = "20px";
    redDiv.style.margin="-8px";
    document.querySelector("body").appendChild(redDiv);
    return redDiv;
}
