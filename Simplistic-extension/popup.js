// intializes the button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color",({color}) => {
    changeColor.style.backgroundColor = color;
} );

// when button is clicke,inject setPageBAckgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript([
        target: {tabId: tab.id},
        functon: setPageBackgroundColor,
    ]);
});

// the body of this gunction will be executed as content script inside the current page
function setPageBackgroundCOlor(){
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundcolor = color;
    });
}