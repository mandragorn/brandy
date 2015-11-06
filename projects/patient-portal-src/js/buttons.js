// Part of a complete BREC/FaST

$(function() {
  // Add tabindex to make sure blur() event fires correctly
  $('.dropdown-toggle').mousedown(function() {
    $(this).closest('.btn-group').attr('tabindex', '-1');
  });

  // Add click handler to Dropdown Buttons and Split Buttons
  $('.dropdown-toggle').click(function() {
    $(this).closest('.btn-group').find('.dropdown-list').slideToggle('fast');
    return false;
  });

  // On click on Main Button in a Split Button, close the dropdown
  $('.btn-group button:not(.dropdown-toggle)').click(function() {
    $(this).closest('.btn-group').find('.dropdown-list').slideUp('fast');
    return false;
  });

  // On click of an item in a dropdown, close the dropdown
  $('.dropdown-list a').click(function() {
    $(this).closest('.dropdown-list').slideUp('fast');
    // return false;
  });

  // Hide dropdown on blur
  $('.btn-group').on('blur', function() {
    $(this).find('.dropdown-list').slideUp('fast');
  });

  var trigger_btn = function(elem) {
    $(elem).siblings().removeClass('selected');
    $(elem).addClass('selected');
  }

  // $('.btn-group:not(.switch) > .selectable').on('click', function() {
  //   trigger_btn(this);
  // });

  // Use mouseup, to allow dragging and clicking
  $('.switch').mouseup(function() {
    trigger_btn($(this).children('.btn:not(.selected)').first());
    return false;
  });
});
