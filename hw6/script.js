/*** Patrick Son
     Patrick_Son@student.uml.edu
     University of Massachusetts, Lowell
     COMP 4610-201
     November 3, 2016
     Homework 6: JavaScript Multiplication Table
        My JavaScript runs a little long, but that's because so much error 
        checking needs to be done.
***/

function checkColumnValues() {
    // verify that the values in the text boxes are valid
    // return value: (Boolean) whether or not the input is valid

    var colWarning = document.getElementById('col-warning');
    var colIcon = document.getElementById('col-icon');
    var lower = Number(colLower.value);
    var upper = Number(colUpper.value);

    // reset all warnings before possibly adding new ones:
    colWarning.textContent = '';
    colIcon.style.display = 'none';
    colLower.className = '';
    colUpper.className = '';

    if(isNaN(colLower.value) || !Number.isInteger(lower)) {
        // add warnings for invalid input
        colIcon.style.display = 'inline-block'; //icon is initially hidden
        colWarning.textContent = 'Integers only, please.';
        colLower.className = 'warning';

        if(isNaN(colUpper.value) || !Number.isInteger(upper)) {
            colUpper.className = 'warning';
        }

        return false;
    }

    if(isNaN(colUpper.value) || !Number.isInteger(upper)) {
        colIcon.style.display = 'inline-block';
        colWarning.textContent = 'Integers only, please.';
        colUpper.className = 'warning';

        return false;
    }

    if(colLower.value.trim() != '' && colUpper.value.trim() != '' && upper < lower) {
        // add warnings for invalid ranges
        colIcon.style.display = 'inline-block';
        colWarning.textContent = 'Lower bound should be less than upper bound.';
        colLower.className = 'warning';
        colUpper.className = 'warning';

        return false;
    }

    return true;
}

function checkRowValues() {
    // verify that the values in the text boxes are valid
    // return value: (Boolean) whether or not the input is valid

    var rowWarning = document.getElementById('row-warning');
    var rowIcon = document.getElementById('row-icon');
    var lower = Number(rowLower.value);
    var upper = Number(rowUpper.value);

    // reset all warnings before possibly adding new ones:
    rowWarning.textContent = '';
    rowIcon.style.display = 'none';
    rowLower.className = '';
    rowUpper.className = '';

    if(isNaN(rowLower.value) || !Number.isInteger(lower)) {
        // add warnings for invalid input
        rowIcon.style.display = 'inline-block'; //icon is initially hidden
        rowWarning.textContent = 'Integers only, please.';
        rowLower.className = 'warning';

        if(isNaN(rowUpper.value) || !Number.isInteger(upper)) {
            rowUpper.className = 'warning';
        }

        return false;
    }

    if(isNaN(rowUpper.value) || !Number.isInteger(upper)) {
        rowIcon.style.display = 'inline-block';
        rowWarning.textContent = 'Integers only, please.';
        rowUpper.className = 'warning';

        return false;
    }

    if(rowLower.value.trim() != '' && rowUpper.value.trim() != '' && upper < lower) {
        // add warnings for invalid ranges
        rowIcon.style.display = 'inline-block';
        rowWarning.textContent = 'Lower bound should be less than upper bound.';
        rowLower.className = 'warning';
        rowUpper.className = 'warning';

        return false;
    }

    return true;
}

function finalCheck() {
    // do final checks before drawing the table, then draw it.

    if( !checkColumnValues() || !checkRowValues() ) {
        return;
    }

    var colWarning = document.getElementById('col-warning');
    var colIcon = document.getElementById('col-icon');
    var rowWarning = document.getElementById('row-warning');
    var rowIcon = document.getElementById('row-icon');

    var shouldReturn = false;
    // check each input for data
    if(colLower.value.trim() == '') {
        colIcon.style.display = 'inline-block';
        colWarning.textContent = 'Please enter a value.';
        colLower.className = 'warning';
        shouldReturn = true;
    }

    if(colUpper.value.trim() == '') {
        colIcon.style.display = 'inline-block';
        colWarning.textContent = 'Please enter a value.';
        colUpper.className = 'warning';
        shouldReturn = true;
    }

    if(rowLower.value.trim() == '') {
        rowIcon.style.display = 'inline-block';
        rowWarning.textContent = 'Please enter a value.';
        rowLower.className = 'warning'
        shouldReturn = true;
    }

    if(rowUpper.value.trim() == '') {
        rowIcon.style.display = 'inline-block';
        rowWarning.textContent = 'Please enter a value.';
        rowUpper.className = 'warning';
        shouldReturn = true;
    }

    if(shouldReturn) {
        return;
    }
    
    var colLowerValue = Number(colLower.value);
    var colUpperValue = Number(colUpper.value);
    var rowLowerValue = Number(rowLower.value);
    var rowUpperValue = Number(rowUpper.value);

    if((colUpperValue - colLowerValue + 1) * (rowUpperValue - rowLowerValue + 1) >= 20000) {
        if( !confirm("The output table will have a large amount of cells. It may take a long time to create, or it not might finish at all! Are you sure you want to continue?")) {
            return;
        }
    }

    drawTable(colLowerValue, colUpperValue, rowLowerValue, rowUpperValue);

}

function drawTable(cl, cu, rl, ru) {
    // Draw a table given the above bounds as parameters.
    var table = document.getElementById('table');

    // Empty the table
    table.innerHTML = '';

    // Create the top row with the column labels
    headerRow = document.createElement('tr');
    table.appendChild(headerRow);
    headerRow.appendChild(document.createElement('th'));
    for( i = cl ; i <= cu ; i++ ) {
        var cth = document.createElement('th');
        cth.innerHTML = String(i);
        headerRow.appendChild(cth);
    }

    for( j = rl ; j <= ru ; j++ ) {

        var firstPass = true;
        var newRow = document.createElement('tr');
        table.appendChild(newRow);
        for( i = cl ; i <= cu ; i++ ) {
            if(firstPass) {
                // Add the row label
                var rth = document.createElement('th');
                rth.innerHTML = String(j);
                newRow.appendChild(rth);
                firstPass = false;
            }
            // Add the cell data
            var cell = document.createElement('td');
            cell.innerHTML = String(i*j);
            newRow.appendChild(cell);
        }
    }
}

var colLower = document.getElementById('colLower');
var colUpper = document.getElementById('colUpper');
var rowLower = document.getElementById('rowLower');
var rowUpper = document.getElementById('rowUpper');

var submit   = document.getElementById('submit');

// Add event listeners
colLower.addEventListener('blur', checkColumnValues, false);
colUpper.addEventListener('blur', checkColumnValues, false);

rowLower.addEventListener('blur', checkRowValues, false);
rowUpper.addEventListener('blur', checkRowValues, false);

submit.addEventListener('click', finalCheck, false);
