function collapseBox(node) {
    //Animate box into its collapsed height and toggle symbols.
    node.addClass("hoverable");
    infoBox = node.find(".info");
    node.animate({height: '-=' + infoBox.outerHeight(true)}, 500);
    node.find(".symbol-collapse").hide();
    node.find(".symbol-expand").show();

    node.one('click', expandBox) //rebind the expandBox function to this box.
}

function expandBox(e) {
    //Animate box into its expanded height and toggle symbols.
    if(expandedBox) {
        collapseBox(expandedBox);
    }

    expandedBox = $(this);
    expandedBox.removeClass("hoverable");
    infoBox = expandedBox.find(".info");
    expandedBox.animate({height: '+=' + infoBox.outerHeight(true)}, 500);
    expandedBox.find(".symbol-expand").hide();
    expandedBox.find(".symbol-collapse").show();
}

var expandedBox; //keep track of which box is currently expanded.

$(document).ready(function() {
    $("body").removeClass("preload"); //enable CSS3 animations once page is ready.
    //$("#topbar").height($("#header-title").outerHeight(true))

    $(".project-box").one('click', expandBox); //bind expandBox to each box only once.

    $(".symbol-collapse").click(function(e) {
        e.stopPropagation(); //prevent click from bubbling up to parent div, re-expanding the box.
        collapseBox($(this).parent());
        expandedBox = null;
    });

    $(".header-icon").click(function(e) {
        e.preventDefault();
        $(this).animate({top: '+=' + 120}, 1000, function() { $(this).remove()});
    });

    $("#remove-styles").one("click", function(e) {
        console.log("TEST");
        $("link[rel='stylesheet']").remove();
    })
});

$(window).resize(function() {
    if(expandedBox) {
        expandedBox.height(25 + expandedBox.find(".info").outerHeight(true));
    }
})