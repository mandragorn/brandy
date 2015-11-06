/**
 * Requires pickadate (http://amsul.ca/pickadate.js/)
 * Requires momentjs (http://momentjs.com/)
 *
 * Usage:
 * $('.datepicker').datepicker({
 *    format: 'mmmm dd, yyyy',
 *    formatSubmit: 'mm/dd/yyyy',
 *    selectYears: 100,
 *    selectMonths: true,
 *    min: new Date(1900, 0, 1),
 *    max: new Date(),
 *    today: false,
 *    clear: false
 *  });
 *
 * Params:
 * {object} pickadateOptions (see: http://amsul.ca/pickadate.js/date.htm#options)
 */


jQuery.fn.extend({
  datepicker: function(pickadateOptions) {
    this.each(function() {
      var $this = $(this),
          $inputText = $('<input type="text" class="datepicker-textinput">'),
          $toggle = $('<label for="' + $this.attr('id') + '" class="btn datepicker-toggle"><span class="icon-calendar"></span></label>'),
          picker;

      $this
        .pickadate(pickadateOptions)
        .attr('tabindex', '-1')
        .before($inputText)
        .after($toggle);

      picker = $this.pickadate('picker');

      $inputText.on({
        change: function() {
          var parsedDate = $inputText.val().length ? moment( $inputText.val() ) : "";
          if ( parsedDate ) {
            picker.set( 'select', [parsedDate.year(), parsedDate.month(), parsedDate.date()] );
          }
        }
      });

      picker.on({
        set: function(thing) {
          $inputText.val(this.get('value'));
        }
      });
    });
  }
});
