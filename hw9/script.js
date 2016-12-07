/*** Patrick Son
     Patrick_Son@student.uml.edu
     University of Massachusetts, Lowell
     COMP 4610-201
     December, 2016
     Rough JavaScript for Scrabble game
        Given enough time, I wanted to do the whole game board.
***/
var dictionary = {};
var distribution = {"A": 9, "B": 2, "C": 2, "D": 4, "E": 12, "F": 2, "G": 3, "H": 2, "I": 9, "J": 1, "K": 1, "L": 4, "M": 2, "N": 6, "O": 8, "P": 2, "Q": 1, "R": 6, "S": 4, "T": 6, "U": 4, "V": 2, "W": 2, "X": 1, "Y": 2, "Z": 1, "Blank": 2};
var value = {"A": 1, "B": 3, "C": 3, "D": 2, "E": 1, "F": 4, "G": 2, "H": 4, "I": 1, "J": 8, "K": 5, "L": 1, "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1, "S": 1, "T": 1, "U": 1, "V": 4, "W": 4, "X": 8, "Y": 4, "Z": 10, "Blank": 0};
var totalScore = 0;

$.get("dictionary.txt", function(txt) {
    var wordList = txt.split("\n");

    for( i = 0 ; i < wordList.length ; i++ ) {
        dictionary[wordList[i]] = true;
    }
});

function validWord(word) {
    if(dictionary[word]) return true;
    else return false;
}

function checkWord() {
    // This function returns the score of the word, or a negative number idicating
    // what kind of error occurred
    var numWildcard = 0; // count blank tiles
    var valid = true;
    var entry = "";
    score = 0;

    $(".board-space").each(function(index) {
        if($(this).children().length == 0) {
            entry += " "; // build word exactly as it appears on board; trim whitespace later
        }
        else {
            letter = $(this).find("div").find("div").html(); //Letter is stored in HTML of a hidden div

            var multiplier = 1;

            if($(this).hasClass("double-letter")) {
                multiplier = 2;
            }
            score += multiplier * value[letter];

            if(letter == "Blank") {
                letter = "*";
                numWildcard += 1;
            }
            entry += letter;
        }
    });

    entry = entry.trim(); // trim white space

    if( entry.split(" ").length > 1 ) { // invalid if there's a space between letters
        return -1;
    }
    if( entry.length < 2 ) { // Invalid if the word is less than 2 letters long
        return -3;
    }

    if(numWildcard == 1) { //handle one blank tile in word
        var split = entry.split("*");
        valid = false;
        for(letter in distribution) {
            newWord = split[0] + letter + split[1];
            if( letter != "Blank" && validWord(newWord.toLowerCase())) {
                valid = true;
                break;
            }
        }
    }
    else if(numWildcard == 2) { // handle 2 blank tiles in word
        var split = entry.split("*");
        valid = false;
        for(letter1 in distribution) {
            first = split[0] + letter1 + split[1];
            for(letter2 in distribution) {
                second = first + letter2 + split[2];
                if( letter1 != "Blank" && letter2 != "Blank" && validWord(second.toLowerCase())) {
                    valid = true;
                    break;
                }
            }
            if(valid) break;
        }
    }
    else {
        valid = validWord(entry.toLowerCase());
    }

    if( valid ) return score;
    else return -2;
}

function generateTiles() {
    var bag = [];
    for( letter in distribution ) {
        for( i = 0 ; i < distribution[letter] ; i++ ) {
            bag.push(letter) // create an array with all 100 tiles
        }
    }

    var selected = [];

    for( i = 0; i < 7 ; i++ ) {
        var grab = Math.floor(Math.random() * bag.length);
        selected.push(bag.splice(grab, 1)[0]); // remove 7 tiles from the array
    }

    $("#rack .rack-space").each(function(index) {
        if($(this).children().length == 0) { // only replace missing tiles
            var $newTile = $('<div class="tile ui-draggable"><div>' + selected[index] + '</div></div>');
            $newTile.css("background-image", "url(img/Scrabble_Tile_" + selected[index] + ".jpg)");
            $(this).append($newTile);
        }
    });

    $(".tile.ui-draggable").draggable({ revert: "invalid" }); // Tiles return if not dropped in a good spot
    
}

$(document).ready(function() {
    generateTiles();
    $(".ui-droppable").droppable({
        drop: function(event, ui) {
            $(this).droppable("option", "accept", ui.draggable); // http://stackoverflow.com/a/8508917
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this); // http://stackoverflow.com/a/6003729
    },
        out: function(event, ui) {
            $(this).droppable("option", "accept", ".ui-draggable");
        }
    });

    // Initialize each space in the rack to only accept the tile it's holding
    $("#rack .rack-space").each(function(index) {
        $(this).droppable("option", "accept", $(this).children()[0]);
    });

    $("#reset").click(function() {
        $(".tile").remove();
        generateTiles();
        $(".board-space").each(function() {
            $(this).droppable("option", "accept", ".ui-draggable");
        })

        $("#rack .rack-space").each(function(index) {
            $(this).droppable("option", "accept", $(this).children()[0]);
        });

        $("#message").html("Drag letters to form a word.");
    });

    $("#restart").click(function() {
        totalScore = 0;
        $(".tile").remove();
        generateTiles();
        $(".board-space").each(function() {
            $(this).droppable("option", "accept", ".ui-draggable");
        })

        $("#rack .rack-space").each(function(index) {
            $(this).droppable("option", "accept", $(this).children()[0]);
        });

        $("#message").html("Drag letters to form a word.");
        $("#score").html("Total Score: 0");
    });

    $("#check").click(function() {
        var score = checkWord();

        if( score == -1 ) {
            $("#message").html('<span class="warning"><i class="fa fa-warning"></i> No spaces allowed in word.</span>');
            return;
        }
        if( score == -2 ) {
            $("#message").html('<span class="warning"><i class="fa fa-warning"></i> Not a valid word.</span>');
            return;
        }
        if( score == -3 ) {
            $("#message").html('<span class="warning"><i class="fa fa-warning"></i> Word must be at least 2 letters long.</span>');
            return;
        }

        $("#message").html("Valid word worth " + score + " points.");
    });

    $("#submit").click(function() {
        var score = checkWord();

        if( score == -1 ) {
            $("#message").html('<span class="warning"><i class="fa fa-warning"></i> No spaces allowed in word.</span>');
            return;
        }
        if( score == -2 ) {
            $("#message").html('<span class="warning"><i class="fa fa-warning"></i> Not a valid word.</span>');
            return;
        }
        if( score == -3 ) {
            $("#message").html('<span class="warning"><i class="fa fa-warning"></i> Word must be at least 2 letters long.</span>');
            return;
        }

        $("#message").html("Valid word worth " + score + " points.");

        $(".board-space .tile").remove();
        generateTiles();

        $(".board-space").each(function() {
            $(this).droppable("option", "accept", ".ui-draggable");
        })

        $("#rack .rack-space").each(function(index) {
            $(this).droppable("option", "accept", $(this).children()[0]);
        });

        totalScore += score;
        $("#score").html("Total Score: " + String(totalScore));
    })

});