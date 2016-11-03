/*** Patrick Son
     Patrick_Son@student.uml.edu
     University of Massachusetts, Lowell
     COMP 4610-201
     Updated November 1, 2016
     JavaScript for Patrick Son's CS webpage.
***/

function showProjectItem(e) {
    jumbo = $("#selected-project-box");
    jumbo.removeClass("jumbo-inactive");
    jumbo.empty();

    info = $(this).find(".project-info").clone();
    jumbo.append(info);
    info.show();
    jumbo.height(info.find(".project-info-title").outerHeight(true));
    // jumbo.height(info.outerHeight(true));
    jumbo.animate({height: '+=' + info.height()}, 500);
    if($(window).width < 1200) {
        $('html, body').animate({
            scrollTop: jumbo.offset().top // scroll code sampled from Stack Overflow: http://stackoverflow.com/a/6677069
        }, 500);
    }

}

$(document).ready(function() {
    $(".project-item").click(showProjectItem);
});
