$(function() {
  $('.help-link').click(function() {
    $('.dimmer, .help-screen').addClass('show');

    $('[data-help]').each(function() {
      var helpElem = $('<div/>')
        .html("<span class='icon-arrow-left'></span> " + $(this).attr('data-help'))
        .css(
          $(this).css('position') == 'fixed' || $(this).offsetParent().css('position') == 'fixed' ?
          {
            position: 'fixed',
            top: $(this).position().top + 15,
            left: $(this).position().left + 15
          } : {
            position: 'absolute',
            top: $(this).offset().top + 15,
            left: $(this).offset().left + 15
          })
        .appendTo('.help-screen')
    })

    return false;
  });

  $('.dimmer, .help-screen').click(function() {
    $('.dimmer, .help-screen').removeClass('show');
    $('.help-screen').empty();
  });
})
;
