/*** Patrick Son
     Patrick_Son@student.uml.edu
     University of Massachusetts, Lowell
     COMP 4610-201
     November 3, 2016
     Homework 7: JavaScript Multiplication Table v2
        New and improved! Now uses JQuery
***/

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

    $("#submit").click(function() {
        if( !$("#dataEntry").valid()) {
            return;
        }

        var $table = $("#table");
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
            
    });
});