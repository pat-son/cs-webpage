function showProjectItem(e) {
    jumbo = $("#selected-project-box");
    jumbo.removeClass("jumbo-inactive");
    jumbo.empty();

    info = $(this).find(".project-info").clone();
    jumbo.append(info);
    info.show();
    jumbo.height(info.find(".project-info-title").outerHeight(true));
    if($(window).width < 1200) {
        $('html, body').animate({
            scrollTop: jumbo.offset().top // scroll code sampled from Stack Overflow: http://stackoverflow.com/a/6677069
        }, 500);
    }

}

$(document).ready(function() {
    $(".project-item").click(showProjectItem);
});
