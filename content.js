// content.js - do things in the browser

//define scroll function
function pageScroll(speed) {
    window.scrollBy(0,speed);
    scrolldelay = setTimeout(pageScroll,10);
}

// GET request from our server
function getSpeed(){
	$.ajax({
		url: 'http://jas920.itp.io:1990/',
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

function toBackground(){
  var port = chrome.runtime.connect({name: "sendToAPI"});
  port.postMessage({"location": window.scrollY});
}

function funcTimer(){
  getSpeed();       // call getSpeed on an interval
  toBackground();   // send data to background
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      setInterval(funcTimer,10);

      // ajax happens but data doesn't send - tried sending from background.js
      // saveData({"data": window.scrollY});

      // need to figure out thresholds
      // if ((Math.abs($(document).height() - ($(window).height() + $(window).scrollTop()))) < 5 ) {
      //    alert("bottom!");
      //    console.log(window.scrollY);
      // }

    } // if clicked browser close
  } // function
); // addListener

// console.log(window.scrollY);
// console.log($(window).height());
