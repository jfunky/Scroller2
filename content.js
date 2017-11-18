// content.js - do things in the browser

//define scroll function
function pageScroll(speed) {
    window.scrollBy(0,speed);
    scrolldelay = setTimeout(pageScroll,10);
}

// GET request from our server
function getSpeed(){
	$.ajax({
		url: 'https://jas920.itp.io:443/',
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("SUCCESS");
      // page scroll when state is true
      if (data.data.state) {
        pageScroll(data.data.speed) ;
      }
		}
	});
}

function saveData(obj){
	$.ajax({
		url: 'https://jas920.itp.io:443/chromesubmit',
		type: 'POST',
		data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
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

function funcTimer(){
  pagePos = window.scrollY;
  var pageData = new Object();
	pageData.data = pagePos;

  console.log(pageData);
  getSpeed();       // call getSpeed on an interval
  saveData(pageData);   // send data to background
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      //setInterval(funcTimer, 10);
      setInterval(getSpeed, 10);

    } // if clicked browser close
  } // function
); // addListener
