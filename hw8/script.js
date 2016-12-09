/*** Patrick Son
     Patrick_Son@student.uml.edu
     University of Massachusetts, Lowell
     COMP 4610-201
     December 9, 2016
     Homework 8: JavaScript Multiplication Table v3 Resumbission
        Got tabs working, but didn't implement the "remove multiple" feature
***/

var tabCount = 1;
var rawTabCount = 1;
var activeIndex = 0;

function drawTable() {
    if( !$("#dataEntry").valid()) {
        return;
    }

    var $table = $(".active table");
    $table.html("");

    var cl = parseInt($("#colLower").val());
    var cu = parseInt($("#colUpper").val());
    var rl = parseInt($("#rowLower").val());
    var ru = parseInt($("#rowUpper").val());

    var $headerRow = $("<tr></tr>");
    $table.append($headerRow);
    $headerRow.append($("<th></th>"));
    for( i = cl ; i <= cu ; i++ ) {
        // add column labels
        $headerRow.append($("<th>" + String(i) + "</th>"));
    }

    for( j = rl ; j <= ru ; j++ ) {
        var firstPass = true;
        var $newRow = $("<tr></tr>");
        $table.append($newRow);

        for( i = cl ; i <= cu ; i++ ) {
            if(firstPass) {
                // add the row label
                $newRow.append($("<th>" + String(j) + "</th>"));
                firstPass = false;
            }
            // add the cell data
            $newRow.append("<td>" + String(i*j) + "</td>");
        }

    }
        
}

function updateTab() {
    var cl = $("#colLower").val();
    var cu = $("#colUpper").val();
    var rl = $("#rowLower").val();
    var ru = $("#rowUpper").val();

    $(".selected a").html("(" + cl + ", " + cu + ") x (" + rl + ", " + ru + ")");

    $(".active .hidden-data .hidden-colLower").html(cl);
    $(".active .hidden-data .hidden-colUpper").html(cu);
    $(".active .hidden-data .hidden-rowLower").html(rl);
    $(".active .hidden-data .hidden-rowUpper").html(ru);
}

$(document).ready(function() {

    // Add validator methods to make sure ranges are not invalid
    $.validator.addMethod("less", function(value, element, parameter) {
        var $other = $(parameter);

        if($other.val() == "") {
            return true;
        }
        return parseInt(value) <= parseInt($other.val());
    });

    $.validator.addMethod("greater", function(value, element, parameter) {
        var $other = $(parameter);

        if($other.val() == "") {
            return true;
        }
        return parseInt(value) >= parseInt($other.val());
    });

    $("#dataEntry").validate({
        rules: {
            colLower: {
                required: true,
                digits: true,
                less: "#colUpper"
            },
            colUpper: {
                required: true,
                digits: true,
                greater: "#colLower"
            },
            rowLower: {
                required: true,
                digits: true,
                less: "#rowUpper"
            },
            rowUpper: {
                required: true,
                digits: true,
                greater: "#rowLower"
            }
        },
        messages: {
            colLower: {
                required: "<i class='fa fa-warning'></i>Lower bound required.",
                digits: "<i class='fa fa-warning'></i>Integers only, please.",
                less: "<i class='fa fa-warning'></i>Entry must be less than upper bound"
            },
            colUpper: {
                required: "<i class='fa fa-warning'></i>Upper bound required.",
                digits: "<i class='fa fa-warning'></i>Integers only, please.",
                greater: "<i class='fa fa-warning'></i>Entry must be greater than lower bound"
            },
            rowLower: {
                required: "<i class='fa fa-warning'></i>Lower bound required.",
                digits: "<i class='fa fa-warning'></i>Integers only, please.",
                less: "<i class='fa fa-warning'></i>Entry must be less than upper bound"
            },
            rowUpper: {
                required: "<i class='fa fa-warning'></i>Upper bound required.",
                digits: "<i class='fa fa-warning'></i>Integers only, please.",
                greater: "<i class='fa fa-warning'></i>Entry must be greater than lower bound"
            },
            
        }
    });

    drawTable();

    // Update the sliders if the input is valid
    $("#colLower").on("blur", function() {
        if($("#colLower").valid()) {
            $("#colLowerSlider").slider("value", $(this).val());
            drawTable();
            updateTab();
        }
    });

    $("#colUpper").on("blur", function() {
        if($("#colUpper").valid()) {
            $("#colUpperSlider").slider("value", $(this).val());
            drawTable();
            updateTab();
        }
    });

    $("#rowLower").on("blur", function() {
        if($("#rowLower").valid()) {
            $("#rowLowerSlider").slider("value", $(this).val());
            drawTable();
            updateTab();
        }
    });

    $("#rowUpper").on("blur", function() {
        if($("#rowUpper").valid()) {
            $("#rowUpperSlider").slider("value", $(this).val());
            drawTable();
            updateTab();
        }
    });

    // set up sliders. 
    $("#colLowerSlider").slider({min: 0, max: 100, value: 0,
        change: function(e, ui) {
            // update input field
            $("#colLower").val(ui.value);
            drawTable();
            updateTab();
        }});
    $("#colUpperSlider").slider({min: 0, max: 100, value: 10,
        change: function(e, ui) {
            $("#colUpper").val(ui.value);
            drawTable();
            updateTab();

        }});
    $("#rowLowerSlider").slider({min: 0, max: 100, value: 0,
        change: function(e, ui) {
            $("#rowLower").val(ui.value);
            drawTable();
            updateTab();
        }});
    $("#rowUpperSlider").slider({min: 0, max: 100, value: 10,
        change: function(e, ui) {
            $("#rowUpper").val(ui.value);
            drawTable();
            updateTab();
        }});

    // tabs are now working
    $("#table-wrapper").tabs({
        activate: function(e, ui) {
            activeIndex = ui.newTab.index();
            $(".selected").removeClass("selected");
            $(".active").removeClass("active");
            $(ui.newTab).addClass("selected");
            $(ui.newPanel).addClass("active");

            cl = $(".active .hidden-data .hidden-colLower").html();
            cu = $(".active .hidden-data .hidden-colUpper").html();
            rl = $(".active .hidden-data .hidden-rowLower").html();
            ru = $(".active .hidden-data .hidden-rowUpper").html();

            $("#colLower").val(cl);
            $("#colLowerSlider").slider("value", cl);
            $("#colUpper").val(cu);
            $("#colUpperSlider").slider("value", cu);
            $("#rowLower").val(rl);
            $("#rowLowerSlider").slider("value", rl);
            $("#rowUpper").val(ru);
            $("#rowUpperSlider").slider("value", ru);
        }
    });

    $("#submit").click(function() {
        tabCount++;
        rawTabCount++;
        id = "tab-" + String(tabCount);
        $(".active").removeClass("active");
        $(".selected").removeClass("selected");
        $("#tab-list").append('<li class="selected"><a href="#' + id + '">New Tab</a></li>');

        var cl = $("#colLower").val();
        var cu = $("#colUpper").val();
        var rl = $("#rowLower").val();
        var ru = $("#rowUpper").val();

        $("#table-wrapper").append('<div id="' + id + '" class="active"><table class="table"></table><div class="hidden-data"><div class="hidden-colLower">' + cl + '</div><div class="hidden-colUpper">' + cu + '</div><div class="hidden-rowLower">' + rl + '</div><div class="hidden-rowUpper">' + ru + '</div></div></div>');
        $("#table-wrapper").tabs("refresh");

        $("#table-wrapper").tabs("option", "active", tabCount - 1);
        drawTable();
        updateTab();
    });

    // ran out of time to implement remove multiple
    $("#remove").click(function() {
        if( rawTabCount < 2) {
            alert("You must have at least one tab");
            return;
        }

        $(".selected").remove();
        $(".active").remove();

        rawTabCount--;

        $("#table-wrapper").tabs("refresh");
        $("#table-wrapper").tabs("option", "active", 0);
    })
});