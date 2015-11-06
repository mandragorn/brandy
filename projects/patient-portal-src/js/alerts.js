$(function() {
  $(document).on('click', '.alert .close, .notice .close', function() {
    $(this).closest('.alert, .notice').slideUp();
    return false;
  });
});
