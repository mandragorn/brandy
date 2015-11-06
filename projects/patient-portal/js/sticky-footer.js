(function() {
  // Only use sticky footer for IE8+ and modern browsers
  if ($('.grail').css('display') == 'table') {
    var scrollContainer = $(window);
    var footerHeight = $('footer').height();
    var scrollOffset = parseInt($('.grail').css('padding-top')) + $('.footer-center').height();
    var fixFooter = function () {
      var footerDisplay = 'none';
      $('.message').each(function() {
        // If message has a footer
        if ($(this).find('.message-footer').length) {
          // If message is in view
          if (footerDisplay == 'none' &&
              $(this).position().top + $(this).height() + scrollOffset > scrollContainer.scrollTop() + scrollContainer.height() && 
              $(this).position().top + $(this).find('h1').height() + footerHeight < scrollContainer.height() + scrollContainer.scrollTop()) {
            $(this).find('.message-footer').addClass('message-footer-fixed');
            footerDisplay = 'block';

            // Show footer directly below h1
            if (scrollContainer.scrollTop() + scrollContainer.height() - $(this).position().top - $(this).find('h1').height() - scrollOffset < 15) {
              var marginBottom = scrollContainer.scrollTop() + scrollContainer.height() - $(this).position().top - $(this).find('h1').height() - scrollOffset - 15;
              $(this).find('.message-footer').css('margin-bottom', marginBottom + 'px');
              $('.footer-center').css('bottom', marginBottom + 'px');
            } else {
              $(this).find('.message-footer').css('margin-bottom', 0);
              $('.footer-center').css('bottom', 0);
            }
          } else {
            $(this).find('.message-footer').css('margin-bottom', 0);
            $(this).find('.message-footer').removeClass('message-footer-fixed');
          }
        }
      })
      $('.footer-center').css('display', footerDisplay);
    }

    $(function() {
      scrollContainer.scroll(fixFooter);
      fixFooter();
    });
  }
})();
