// Dims page and shows loading animation

window.Brecfast = window.Brecfast || {};

(function(Brecfast) {
  Brecfast.showLoader = function() {
    document.getElementsByClassName('dimmer')[0].style.display = 'block';
    setTimeout(function() {
      document.getElementsByTagName('body')[0].className = 'dim';
    }, 10);
  }

  Brecfast.hideLoader = function() {
    setTimeout(function() {
      document.getElementsByClassName('dimmer')[0].style.display='none';
    }, 250);
    document.getElementsByTagName('body')[0].className = '';
  }
})(Brecfast);
