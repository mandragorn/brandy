/**
 * Usage:
 * $('input[type=tel]').formatInput('(000) 000-0000');
 * $('input[type=tel]').formatInput('(000) 000-0000 x000000');
 * $('input.ssn').formatInput('000-00-0000');
 *
 * Params:
 * {string} pattern (0 = a numeric digit; all other characters are literals)
 */


jQuery.fn.extend({
  formatInput: function(pattern) {
    this.each(function() {
      var format = pattern.split(''),
          $this = $(this),
          placeholder;

      placeholder = $('<pre/>')
        .addClass('input-placeholder')
        .css({
          top: $this.position().top - 15,
          left: $this.position().left
        })
        .text(pattern.replace(/0/g, '_'));

      $this
        .css({
          position: 'relative',
          width: '15em',
          zIndex: 2,
          background: 'none',
          fontFamily: 'monospace'
        })
        .before(placeholder);

      // Prevent extra keystrokes
      // $this.keypress(function (e) {
      //   if ($(this).val().length >= pattern.length) {
      //     e.preventDefault();
      //   }
      // });

      // Format input
      $this.keyup(function (e) {
        var value = $this.val().replace(/\D/g,'').split(''),
            formattedValue = "",
            caretPos = this.selectionStart,
            setCaretPos = true;
            f = 0,
            v = 0;

        $.each(format, function(i, formatChar) {
          if (formatChar === '0') {
            if (v < value.length) {
              formattedValue += value[v++];
            } else {
              // formattedValue += '_'

              // if (setCaretPos && (caretPos > i || value.length === 0)) {
              //   caretPos = i;
              //   setCaretPos = false;
              // }

              caretPos = i;
              return false;
            }
          } else {
            // formattedValue += formatChar;
            formattedValue += ' ';

            // if (caretPos === i && ((e.which > 47 && e.which < 58) || (e.which > 95 && e.which < 106))) {
            //   caretPos = i+1;
            // }
          }

          // if (caretPos > i && v >= value.length) {
          // if (v >= value.length) {
          //   // caretPos = i+1;
          //   return false;
          // }
        });

        $this.val(formattedValue);

        this.selectionStart = caretPos;
        this.selectionEnd = caretPos;
      });

      $this.focus(function () {
        var caretPos = null,
            formattedValue = "";

        if ($this.val().replace(/\D/g,'').split('').length == 0) {
          // $this.val(pattern.replace(/0/g, '_'));

          $.each(format, function(i, formatChar) {
            if (formatChar === '0') {
              // formattedValue += '_'

              // if (caretPos === null) {
              //   caretPos = i;
              // }
              return false;
            } else {
              // formattedValue += formatChar;
              formattedValue += ' ';
            }
          });

          $this.val(formattedValue);

          // setTimeout(function() {
          //   console.log(this.selectionStart, caretPos)
          //   this.selectionStart = caretPos;
          //   this.selectionEnd = caretPos;
          // }, 500);
        }
      });

      // Don't leave orphan format characters
      $this.blur(function () {
        if ($this.val().replace(/\D/g,'').split('').length == 0) {
          $this.val('');
        }
      });
    })
  }
});
