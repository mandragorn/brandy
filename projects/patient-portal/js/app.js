/**
* App.js
*/


jQuery(function($) {
  // Accessibility "skip navigation" links
  $('a.skip-link').click(function() {
    var $target = $($(this).attr('href'));
    $target
      .attr('tabindex', -1)
      .on('blur focusout', function() {
        $target.removeAttr('tabindex');
      })
      .focus();

    $('#app').scrollTo($target, 100);
    return false;
  });

  // $('select').chosen({
  //   disable_search_threshold: 10
  // });

  // Nav touch improvements
  $(document).on('tap', 'html.touch .nav-item > .icon-caret-down', function(e) {
    // $(this).parent().attr('tab-index', -1).focus();
    $(this).parent().toggleClass('active');
  });

  // Toggle filter display
  $('.toolbar-filter').click(function() {
    $('.filter-list').toggle('slide');
    return false;
  });

  // Toggle filter selection
  $('.filter-link').click(function() {
    $(this).toggleClass('selected');
    return false;
  });

  // Show new message form on "new message" link
  $('.new-message-link').click(function() {
    $('.new-message').addClass('open').scrollIntoView();
    return false;
  });

  // Close new message form
  $('.close-new-message').click(function() {
    $('.new-message').removeClass('open');
  });

  // Create new message on page load
  if (getURLParameter('reply-body') != null) {
    var new_message = $(
      "<section class='message open unread hidden'>" +
        "<header class='message-header'>" +
          "<h3><span class='icon-comment'></span> You <small>Today</small></h3>" +
        "</header>" +
        "<div class='message-body'>" +
          "<p>" + getURLParameter('reply-body') + "</p>" +
        "</div>" +
      "</section>");

    $('#new-message').before(new_message);
    new_message.delay(250).slideDown(250, function() {
      $('#new-message').scrollIntoView();
    });
  }

  // Add delay on new message submit
  $('#new-message-submit').click(function (e) {
    e.preventDefault();

    var $this = $(this),
        la = loadingAnimation();

    $this.after(la);

    setTimeout(function () {
      $this.closest('form').submit();
    }, 1000);
  });

  // Create new message on submit
  $('#new-message-form').submit(function (e) {
    e.preventDefault();

    var la = loadingAnimation(),
        new_message = $(
          "<section class='message open unread hidden'>" +
            "<header class='message-header'>" +
              "<h3><span class='icon-comment'></span> You <small>Today</small></h3>" +
            "</header>" +
            "<div class='message-body'>" +
              "<p>" + $('#reply-body').val().replace(/\n/g, '<br />') + "</p>" +
            "</div>" +
          "</section>");

    $('button.primary').after(la);

    setTimeout(function () {
      $('#new-message').before(new_message);

      new_message.children('.message-header').click(function() {
        $(this).parent().toggleClass('open').delay(250).scrollIntoView();
        return false;
      });

      new_message.delay(100).slideDown(250, function() {
        $('#new-message').scrollIntoView();
      });

      $('#reply-body').val("");

      $('.message-count').text(parseInt($('.message-count').text()) + 1);

      la.remove();
    }, Math.random() * 2000 + 1000);
  });

  $('.itemized-input').keyup(function() {
    total = 0;

    $('.itemized-input').each(function() {
      total += parseFloat($(this).val());
    });

    $('.itemized-amount').text('$' + total.toFixed(2));
  });

  $('#cc-number').keyup(function() {
    var cvvMessage = "Your verification code is the 3-digit number printed on the back of your card",
        cvvAmexMessage = "Your verification code is the 4-digit number printed on the front of your card, above the credit card number";

    if ($(this).val().match(/^4/)) { // Visa 4300123456789012
      $('.cc-icon:not(.cc-cvv)').addClass('dim');
      $('.cc-visa').removeClass('dim');
      $('.cc-amex-cvv').removeClass('cc-amex-cvv');
      $('.cvv-help').attr('title', cvvMessage);
    } else if ($(this).val().match(/^5[1-5]/)) { // MC 5438123456789012
      $('.cc-icon:not(.cc-cvv)').addClass('dim');
      $('.cc-mc').removeClass('dim');
      $('.cc-amex-cvv').removeClass('cc-amex-cvv');
      $('.cvv-help').attr('title', cvvMessage);
    } else if ($(this).val().match(/^3[47]/)) { // AmEx 371112345678901
      $('.cc-icon:not(.cc-cvv)').addClass('dim');
      $('.cc-amex').removeClass('dim');
      $('.cc-cvv').addClass('cc-amex-cvv');
      $('.cvv-help').attr('title', cvvAmexMessage);
    } else if ($(this).val().match(/^6(?:011|5)/)) { // Discover 6011123456789012
      $('.cc-icon:not(.cc-cvv)').addClass('dim');
      $('.cc-discover').removeClass('dim');
      $('.cc-amex-cvv').removeClass('cc-amex-cvv');
      $('.cvv-help').attr('title', cvvMessage);
    } else {
      $('.cc-icon:not(.cc-cvv)').removeClass('dim');
      $('.cc-amex-cvv').removeClass('cc-amex-cvv');
      $('.cvv-help').attr('title', cvvMessage);
    }
  });

  // Show/hide modal
  $('a[data-modal]').click(function() {
    var modalId = $(this).attr('data-modal');

    $('.modal').addClass('hidden');
    $('#' + modalId).removeClass('hidden');
    $('.modals').fadeIn(function() {
      $('#app').addClass('hide-for-small');
      $('#' + modalId).focus();
    });
    // $('.topnav :focus').blur();
    return false;
  });

  $('.modals-bg').click(function(event) {
    $('#app').removeClass('hide-for-small');
    $('.modals').fadeOut(function() {
      $('.modal').addClass('hidden');
    });
    return false;
  });

  $('.modal-close, [data-action=modal-close]').click(function() {
    var _this = this;
    $('#app').removeClass('hide-for-small');
    $('.modals').fadeOut(function() {
      $(_this).closest('.modal').addClass('hidden');
    });
    return false;
  });

  // Close modal when user hits ESC
  $('.modal').keyup(function(e) {
    var _this = this;

    if (e.keyCode == 27) {
      $('#app').removeClass('hide-for-small');
      $('.modals').fadeOut(function() {
        $(_this).closest('.modal').addClass('hidden');
      });
      return false;
    }
  });

  $('.highlight').delay(250).removeClass('highlight');

  $('textarea').autogrow();

  $('.side-nav').mouseenter(function() {
    $('body').addClass('menu-hover');
  });

  $('.side-nav').mouseleave(function() {
    $('body').removeClass('menu-hover');
  });

  $('.index-toggle-grid').click(function() {
    $('.index-list')
      .removeClass('index-list')
      .addClass('index-grid');
  });

  $('.index-toggle-list').click(function() {
    $('.index-grid')
      .removeClass('index-grid')
      .addClass('index-list');
  });

  // Scroll down alert
  if ($(".alert-scroll").length) {
    $(".alert-scroll").css('width', $(".form-buttons").width())

    $('#app').on('scroll', function() {
      if ($(window).scrollTop() + $(window).height() > $(".form-buttons").offset().top) {
        $(".alert-scroll").fadeOut();
      } else {
        $(".alert-scroll").fadeIn();
      }
    });
  }

  $(window).resize(function() {
    $(".alert-scroll").css('width', $(".form-buttons").width())
  });

  if ($(".form-buttons").length && $(window).scrollTop() + $(window).height() > $(".form-buttons").offset().top) {
    $(".alert-scroll").hide();
  }

  // Tabs
  $('.tab').click(function() {
    $this = $(this);
    $this.parent().removeClass('show-all');
    $('.current.tab[data-tab-group=' + $this.attr('data-tab-group') + ']').removeClass('current');
    $this.addClass('current');
    $('.tab-content[data-tab-group=' + $this.attr('data-tab-group') + ']').addClass('hidden');
    $('#' + $this.attr('data-tab')).removeClass('hidden');
    return false;
  });

  $('.tab-more').click(function() {
    $(this).parent().addClass('show-all');
    return false;
  });

  // Date/time calendar
  $("input[type=checkbox][name=request-date-time]").change(function() {
    var i = 0;
    if ($(this).is(':checked')) {
      if ($("input[type=checkbox][name=request-date-time]:checked").length > 3) { // Allow only up to 3 times selected
        $(this).attr('checked', false);
        alert("You can only select up to 3 appointment times.");
      } else {
        $('#time-selections').empty();
        $("input[type=checkbox][name=request-date-time]:checked").each(function() {
          var id = $(this).attr('id');
          var item = $("<input type='hidden' name='time-selection-" + (i++) + "' id='input-" + id + "' value='" + $(this).val() + "'>");
          $('#time-selections').append(item);
        });
      }
    } else {
      $('#time-selections').empty();
      $("input[type=checkbox][name=request-date-time]:checked").each(function() {
        var id = $(this).attr('id');
        var item = $("<input type='hidden' name='time-selection-" + (i++) + "' id='input-" + id + "' value='" + $(this).val()+ "'>");
        $('#time-selections').append(item);
      });
    }

    $('.selected-count').text($("input[type=checkbox][name=request-date-time]:checked").length);
  });

  $('.btn-next-week').click(function() {
    $('.week-one').hide();
    $('.week-two').show();
  });

  $('.btn-prev-week').click(function() {
    $('.week-two').hide();
    $('.week-one').show();
  });

  // Checkbox/radio :checked pseudoclass polyfill
  var toggleChecked = function($el) {
    $el.toggleClass('checked', $el.is(':checked'));
  }

  $('input[type=checkbox]').change(function() {
    toggleChecked($(this));
  });

  $('input[type=radio]').change(function() {
    $('input[name=' + $(this).attr('name') + ']').each(function() {
      toggleChecked($(this));
    });
  });

  // Radio button deselect
  $(document).mouseup('input[type=radio] + label.btn', function(e) {
    if ($('#' + $(e.target).attr('for')).prop('checked')) {
      setTimeout(function() {
        $('#' + $(e.target).attr('for')).prop('checked', false);
        toggleChecked($('#' + $(e.target).attr('for')));
      }, 1)
    }
  });

  // Radio button deselect
  $(document).keyup('input[type=radio]', function(e) {
    if (e.keyCode == 32 && $(e.target).prop('checked')) {
      setTimeout(function() {
        $(e.target).prop('checked', false);
        toggleChecked($(e.target));
      }, 1)
    }
  });

  // Datepicker
  $('.datepicker').datepicker({
    format: 'mmmm dd, yyyy',
    formatSubmit: 'mm/dd/yyyy',
    selectYears: 100,
    selectMonths: true,
    min: new Date(1900, 0, 1),
    max: new Date(),
    today: false,
    clear: false
  });

  // Printing
  $('[data-action="print"]').click(function() {
    var selectors = [];

    $('input[data-print-target]:checked').each(function() {
      selectors.push($(this).attr('data-print-target'))
    });

    $(selectors.join()).print();

    return false;
  });

  $('[data-print]').click(function() {
    $( $(this).attr('data-print') ).print();
    return false;
  });

  // Details polyfill
  $('.summary').on('click keydown', function(e) {
    // click, space, or enter
    if ((e.type === 'click') || (e.type === 'keydown' && e.which === 13) || (e.type === 'keydown' && e.which === 32)) {
      $(this).toggleClass('open');
      $(this).next().slideToggle();

      e.preventDefault();
    }
  });

  // Nav menu keyboard accessibility
  $('.nav-link').keydown(function(e) {
    var $this = $(this);

    // On up arrow, focus on previous link
    if (e.keyCode == 38 && $this.parent().parent().hasClass('nav-dropdown') && $this.parent().is(':first-child')) {
      $this.parent().parent().siblings('.nav-link').focus();
    } else if (e.keyCode == 38 && $this.parent().parent().hasClass('nav-dropdown')) {
      $this.parent().prev().children('.nav-link').focus();
    }

    // On down arrow, focus on next link
    if (e.keyCode == 40 && $this.hasClass('nav-dropdown-toggle')) {
      $this.siblings('.nav-dropdown').find('.nav-link').first().focus();
      return false;
    } else if (e.keyCode == 40 && $this.parent().parent().hasClass('nav-dropdown')) {
      $this.parent().next().children('.nav-link').focus();
      return false;
    }

    // On right arrow, focus next nav link
    if (e.keyCode == 39 && $this.parent().parent().hasClass('nav-dropdown') && $this.parent().parent().parent().is(':last-child')) {
      // Inside a dropdown menu and relative parent is last in .nav-list
      $this.closest('.nav-list').next().children('.nav-item').last().children('.nav-link').first().focus();
    } else if (e.keyCode == 39 && $this.parent().parent().hasClass('nav-dropdown')) {
      // Inside a dropdown menu
      $this.parent().parent().parent().next().find('.nav-link').first().focus();
    } else if (e.keyCode == 39 && $this.parent().is(':last-child')) {
      // On last child of .nav-list
      $this.closest('.nav-list').next().children('.nav-item').last().children('.nav-link').first().focus();
    } else if (e.keyCode == 39) {
      $this.parent().next().children('.nav-link').focus();
    }

    // On left arrow, focus previous nav link
    if (e.keyCode == 37 && $this.parent().is(':first-child')) {
      // On first child of .nav-list
      $this.parent().parent().prev().children('.nav-item').last().children('.nav-link').first().focus();
    } else if (e.keyCode == 37 && $this.parent().parent().hasClass('nav-dropdown')) {
      // Inside a dropdown menu
      $this.parent().parent().parent().prev().find('.nav-link').first().focus();
    } else if (e.keyCode == 37) {
      $this.parent().prev().children('.nav-link').focus();
      return false;
    }
  });

  $('.nav-item').focusin(function(e) {
    var $this = $(this);
    $this.addClass('active');
    console.log(e)
  });

  $('.nav-item').focusout(function(e) {
    var $this = $(this);
    setTimeout(function() {
      if ($this.find(':focus').length == 0) {
        $this.removeClass('active');
      }
    }, 10);
  });

  /**
   * Creates a jQuery element to display the loading animation
   * The remove() method is overloaded to show CSS animation before removing the element from the DOM.
   *
   * @param options insertAfter   If specified, the loading animation is inserted after this element
   *                insertBefore  If specified, the loading animation is inserted before this element
   *                appendTo      If specified, the loading animation is appended to this element
   *                prependTo     If specified, the loading animation is prepended to this element
   *
   * @return {jQuery object} Loading animation jQuery element
   *
   * @example
   * var la = loadingAnimation({ insertAfter: $('button') }),
   *     cb = function() {
   *       la.remove();
   *     };
   *
   * @example
   * var la = loadingAnimation(),
   *     cb = function() {
   *       la.remove();
   *     };
   * $('button').after(la);
   */
  var loadingAnimation = function(options) {
    var animation = $('<span class="loadingclock">Please wait...</span>'),
        originalRemove = animation.remove;

    if (options && options.insertAfter) {
      animation.insertAfter($(options.insertAfter));
    } else if (options && options.insertBefore) {
      animation.insertBefore($(options.insertBefore));
    } else if (options && options.appendTo) {
      animation.appendTo($(options.appendTo));
    } else if (options && options.prependTo) {
      animation.prependTo($(options.prependTo));
    }

    animation.remove = function() {
      animation.addClass('disappear');

      setTimeout(function () {
        originalRemove.apply(animation);
      }, 250);
    }

    return animation;
  }

  // Prevent focus styling and showing dropdown when clicking on nav link
  $(document).on('click', '.nav-link', function() {
    this.blur();
  });

  // Send PHR form behavior example
  $('#form-send-phr').submit(function () {
    var $this = $(this),
        $submit = $(this).find('button'),
        la = loadingAnimation({ insertAfter: $submit });

    $submit.prop('disabled', true);

    // Simulate AJAX complete callback
    setTimeout(function () {
      $submit.prop('disabled', false);
      la.remove()
      $('#email-label').before('<div class=\'alert success\'><a href=\'#!\' class=\'close\'></a>Your Health Record has been sent to ' + $('#email').val() + '.</div>');
      $('#email').val('');
    }, Math.random() * 7000 + 1000)

    return false;
  });

  // Phone input
  $('input[type=tel]').formatInput('(000) 000-0000 x00000');

  // SVG fallback
  if (!Modernizr.svg) {
    $('img[src$=".svg"]').each(function() {
      var $this = $(this);
      $this.attr('src', $this.attr('src').replace('.svg', '.png'));
    });
  }
});
