// content.js
function pageScroll() {
    //works on some sites but not FB, Twitter, basicanalogcircuits
    window.scrollBy(0,10);

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
