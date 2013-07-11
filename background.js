// Background JS to manage tab time datastructure and closing of tabs

// Debugging
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('tabs.onCreated --'
              + ' window: ' + tab.windowId
              + ' tab: '    + tab.id
              + ' index: '  + tab.index
              + ' url: '    + tab.url);
});

var tabs = {};
var KILL_TIME = 10;

chrome.tabs.onCreated.addListener(function(tab) {
  // Add new tab to key-value dictionary
  var seconds = new Date().getTime() / 1000;
  tabs[tab.id] = seconds;
  console.log('Tab: ' + tab.id + ' at ' + tabs[tab.id])

  // Iterate over current tabs in key value dictionary and close any over 24 hours
  for (t in tabs) {
    console.log('Tab ' + t + ' seconds: ' + (seconds-tabs[t]))
    if ((seconds - tabs[t]) > KILL_TIME*60*60) {
      console.log('Killed Tab ' + t)
      delete tabs[t];
      chrome.tabs.remove(parseInt(t));
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  delete tabs[tabId];
  console.log('Closed Tab ' + tabId)
});

