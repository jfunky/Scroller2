// content.js
var speed = 10;

function pageScroll() {
    window.scrollBy(0,speed);
    scrolldelay = setTimeout(pageScroll,10);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      pageScroll();

      if($(window).scrollTop() + $(window).height() == $(document).height()) {
         alert("bottom!");
         console.log(window.scrollY);
      }
    }
  }
);
