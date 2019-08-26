// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({}, function(tabs) {
      var activeTabs;
      var index;
      for(index=0;index<tabs.length;index++){
        activeTabs = tabs[index];
        chrome.tabs.sendMessage(activeTabs.id, {"message": "clicked_browser_action"});
        console.log(activeTabs.id);
      }       


    });
  });


  // This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      console.log("Url below");
      //console.log(chrome.runtime.getURL());
      chrome.tabs.create({"url": request.url});
    }
  }
);