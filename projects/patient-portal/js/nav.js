$(function() {
  // Nav Toggle
  $('.nav-toggle').click(function() {
    $('#app').toggleClass('focus-nav');
    return false;
  });

  $('header, main, footer').click(function() {
    if ($('#app').hasClass('focus-nav')) {
      $('#app').removeClass('focus-nav');
      return false;
    }
  });

  // Help Toggle
  $('.help-toggle').click(function() {
    $('.global, .help-toggle').toggleClass('focus-help');
    return false;
  });
});
