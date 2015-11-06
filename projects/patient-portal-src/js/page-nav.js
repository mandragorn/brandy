$(function() {
  if ($('.page-nav-link').length) {
    var target = null;
    var scrollContainer = $(window);
    var scrollOffset = $('header').height();

    $('.page-nav-link').click(function() {
      _this = this;
      window.scrollTo(0, $($(this).attr('href')).offset().top - $('header').height() - 30);

      // Slight timeout to make sure this occurs AFTER scroll event (for last item on page)
      setTimeout(function() {
        $('.page-nav-link').removeClass('active');
        $(_this).addClass('active');
      }, 10);

      return false;
    })

    scrollContainer.scroll(function() {
      $('.page-nav-link').each(function() {
        target = $($(this).attr('href'));
        if (target.position().top < scrollContainer.scrollTop() + 5) {
          $('.page-nav-link').removeClass('active');
          $(this).addClass('active');
        }
      })
    })
  }
})
;
