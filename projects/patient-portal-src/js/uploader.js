// Part of a complete BREC/FaST

$(function() {
  // Force file input click for Firefox
  // $(".uploader-btn").on('click keydown', function(e) {
  //   // click, space, or enter
  //   if ((e.type === 'click') || (e.type === 'keydown' && e.which === 13) || (e.type === 'keydown' && e.which === 32)) {
  //     // Prevent file input double click for Chrome
  //     e.preventDefault();
  //     $('#' + $(this).attr('data-for')).click();
  //   }
  // });

  $("input.image-uploader").change(function() {
    var image_input = this;
    var _i;

    if (FileReader !== undefined) {
      var files = this.files;
      var reader = new FileReader();
      reader.onload = function(e) {
        if ($(image_input).attr('data-target')) {
          $($(image_input).attr('data-target')).attr('src', e.target.result);
          $($(image_input).attr('data-target')).parent('.img-placeholder').removeClass('clear');
        } else {
          var sample_image = $("<div/>")
            .addClass('image-preview-wrapper')
            .append($("<img/>").attr('src', e.target.result).addClass('image-preview'));
          $(image_input).before(sample_image);
        }
      };

      for (i = 0; i < files.length; i++) {
        // Set timeout to prevent DOM exception
        setTimeout(function(_i) {
          reader.readAsDataURL(files[_i]);
        }, 20 * i, i);
      }
    }
  });

  $('form').on('click', '.image-preview', function() {
    var rotation = parseInt($(this).data('rotation') || 0) + 90;
    if (rotation >= 360) rotation = 0;

    $(this)
      .css('transform', 'rotate(' + rotation + 'deg)')
      .data('rotation', rotation);
  });

  $('.image-uploader-change, .image-uploader-choose').click(function() {
    $(this).closest('.img-placeholder').find('.image-uploader').click();
    return false;
  });

  $('.image-uploader-remove').click(function() {
    $(this).closest('.img-placeholder').addClass('clear').find('img').attr('src', '');
    return false;
  });
});
