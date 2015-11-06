$(function() {
  $('#name').keyup(function() {
    // console.log($(this).val(), $(this).val().match(/^[^\s]+/));
    $('#first-name').val($(this).val().match(/^[^\s]+/));
    $('#last-name').val($(this).val().match(/[^\s]+$/));
  })
})
;
