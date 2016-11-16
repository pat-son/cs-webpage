$(function() {
  $("ul").before("<p>Just Updated");
  $(".hot").prepend("+ ");
  $newItem = $("<li id='five'><em>gluten-free</em> soy sauce</li>");
  $("li:last").after($newItem);
});