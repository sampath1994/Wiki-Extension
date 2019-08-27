// background.js
console.log("Background loded!!");
chrome.storage.sync.get(['wiki_activate'], function(items) {
  console.log('storage value' + items.wiki_activate);
  if(items.wiki_activate === 'true'){
    chrome.browserAction.setIcon({path:"wiki2.png"});
  }else{
    chrome.browserAction.setIcon({path:"wiki2-de.png"});
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.storage.sync.get(['wiki_activate'], function(items) {
    console.log('storage value' + items.wiki_activate);
    if(items.wiki_activate === 'true'){
      chrome.browserAction.setIcon({path:"wiki2-de.png"});
      tellAllTabs("clicked_browser_action_deactivate");
      setStorage('false');
    }else{
      chrome.browserAction.setIcon({path:"wiki2.png"});
      tellAllTabs("clicked_browser_action_activate");
      setStorage('true');
    }
  });
  
  // Send a message to the active tab
    /*chrome.tabs.query({}, function(tabs) {
      var activeTabs;
      var index;
      for(index=0;index<tabs.length;index++){
        activeTabs = tabs[index];
        chrome.tabs.sendMessage(activeTabs.id, {"message": "clicked_browser_action"});
        console.log(activeTabs.id);
      }       
    });*/
  });


function tellAllTabs(str){
  chrome.tabs.query({}, function(tabs) {
    var activeTabs;
    var index;
    for(index=0;index<tabs.length;index++){
      activeTabs = tabs[index];
      chrome.tabs.sendMessage(activeTabs.id, {"message": str});
      console.log(activeTabs.id);
    }       
  });
}  

function setStorage(str){
  chrome.storage.sync.set({'wiki_activate': str}, function() {
    console.log('Value is set to false');
  });
}
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