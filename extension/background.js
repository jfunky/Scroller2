// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// Post req to our server
function saveData(obj){
	$.ajax({
		url: 'https://jas920.itp.io:1990/chromesubmit',
		type: 'GET',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('WooHoo!');
			console.log(resp);
		}
	});
}

// listen for data to send to server
var port = chrome.runtime.connect({name: "sendToAPI"});
port.onMessage.addListener(function(msg) {
  saveData(msg);
});
