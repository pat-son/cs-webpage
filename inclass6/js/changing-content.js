$(function() {
  $("li:contains('pine')").text("almonds");
  $(".hot").each(function(index) {
    $(this).html("<em>" + $(this).html() + "</em>");
  })
  $("#one").remove();
});