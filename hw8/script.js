/*** Patrick Son
     Patrick_Son@student.uml.edu
     University of Massachusetts, Lowell
     COMP 4610-201
     November 3, 2016
     Homework 8: JavaScript Multiplication Table v3
        Added sliders for the inputs.
        Wasn't able to get tabs working; going to use a resubmission token to 
        fix it
***/

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
        }
    });

    $("#colUpper").on("blur", function() {
        if($("#colUpper").valid()) {
            $("#colUpperSlider").slider("value", $(this).val());
            drawTable();
        }
    });

    $("#rowLower").on("blur", function() {
        if($("#rowLower").valid()) {
            $("#rowLowerSlider").slider("value", $(this).val());
            drawTable();
        }
    });

    $("#rowUpper").on("blur", function() {
        if($("#rowUpper").valid()) {
            $("#rowUpperSlider").slider("value", $(this).val());
            drawTable();
        }
    });

    // set up sliders. 
    $("#colLowerSlider").slider({min: 0, max: 100, value: 0,
        change: function(e, ui) {
            // update input field
            $("#colLower").val(ui.value);
            drawTable();
        }});
    $("#colUpperSlider").slider({min: 0, max: 100, value: 10,
        change: function(e, ui) {
            $("#colUpper").val(ui.value);
            drawTable();
        }});
    $("#rowLowerSlider").slider({min: 0, max: 100, value: 0,
        change: function(e, ui) {
            $("#rowLower").val(ui.value);
            drawTable();
        }});
    $("#rowUpperSlider").slider({min: 0, max: 100, value: 10,
        change: function(e, ui) {
            $("#rowUpper").val(ui.value);
            drawTable();
        }});

    // TODO: get the tabs working
    $("#table-wrapper").tabs();
    $("#submit").click(function() {
        $("#tab-list").append('<li><a href="#b">Tab B</a></li>');
        $("#table-wrapper").append('<div id="#b">TEST CONTENT</div>');
        $("#table-wrapper").tabs("refresh");
    });
});