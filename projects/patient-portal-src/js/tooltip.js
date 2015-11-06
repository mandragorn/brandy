/**
 * Tooltip script
 * powered by jQuery (http://www.jquery.com)
 *
 * written by Alen Grakalic (http://cssglobe.com)
 *
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */


this.tooltip = function(){
  /* CONFIG */
    xOffset = 10;
    yOffset = 20;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
  /* END CONFIG */
  $("a.tooltip").hover(function(e){
    this.t = this.title;
    this.title = "";
    $("body").append("<p class='tooltip-tag' id='tooltip'>"+ this.t +"</p>");
    $("#tooltip")
      .css("top",(e.pageY - xOffset) + "px")
      .css("left",(e.pageX + yOffset) + "px")
      .fadeIn("fast");
    },
    function(){
      this.title = this.t;
      $("#tooltip").remove();
    });
  $("a.tooltip").mousemove(function(e){
    $("#tooltip")
      .css("top",(e.pageY - xOffset) + "px")
      .css("left",(e.pageX + yOffset) + "px");
  });

  $("input[data-tooltip]").focus(function(e){
    $this= $(this);
    this.t = $this.attr('data-tooltip');
    $("#app").append("<div class='tooltip-tag' id='tooltip'>"+ this.t +"</div>");
    $("#tooltip")
      .css("top", $this.offset().top + $('#app').scrollTop() + "px")
      .css("left", ($this.offset().left + $this.width() + 25) + "px")
      .fadeIn("fast");
  });
  $("input[data-tooltip]").blur(function(){
    $("#tooltip").remove();
  });

  $("input[data-error-tooltip]").each(function(){
    $this= $(this);
    this.t = $this.attr('data-error-tooltip');
    var thisTooltip = $("<div class='tooltip error'>"+ this.t +"</div>")
    $this.after(thisTooltip);
    thisTooltip.show();
  });
};

// starting the script on page load
$(document).ready(function(){
  tooltip();
});
