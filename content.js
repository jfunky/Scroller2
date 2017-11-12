// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);

      function pageScroll() {
          //works on some sites but not FB, Twitter, basicanalogcircuits
          window.scrollBy(0,10);

          // works on FB and some other sites
          // window.document.documentElement.scrollBy(0,10);
          
          scrolldelay = setTimeout(pageScroll,10);
      }

      window.addEventListener('load', pageScroll);

      $(window).scroll(function() {
         if($(window).scrollTop() + $(window).height() == $(document).height()) {
             alert("bottom!");
             console.log(window.scrollY);
         }
      });
    }
  }
);
