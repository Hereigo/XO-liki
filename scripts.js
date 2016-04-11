$(document).ready(function () {
    var firstPlayer = true;
    var maxSize = 10;
    var promptText = "Set the field side. Not bigger than " + maxSize + "! (3 by default).";
    var tableSide = parseInt(prompt(promptText));
    if (isNaN(tableSide) || tableSide > maxSize || tableSide < 2) {
        tableSide = 3;
    }
    CreateTable(tableSide);
    $('#Xo').addClass("red");

    $('td').mouseover(
        (function () {
            if ($(this).is('td:empty')) {
                $(this).css("background-color", "darkseagreen ");
            }
        })
    );
    $('td').mouseout(
        (function () {
            $(this).css("background-color", "white");
        })
    );
    $('td').click(
        (function () {
            if ($(this).is('td:empty')) {
                if (firstPlayer) {
                    $(this).css("background-color", "white");
                    $(this).append("X");
                    $('#Ox').addClass("red");
                    $('#Xo').removeClass("red");
                    firstPlayer = false;
                }
                else {
                    $(this).css("background-color", "white");
                    $(this).append("O");
                    $('#Xo').addClass("red");
                    $('#Ox').removeClass("red");
                    firstPlayer = true;
                }
            }
            CheckDiagonal(tableSide, 0, 1);
            CheckDiagonal(tableSide, (tableSide - 1), (-1));
            CheckAllRows(tableSide);
            CheckAllColumns(tableSide);
        })
    );
});

function CreateTable(tableSide) {
    for (var i = 0; i < tableSide; i++) {
        $('table').append('<tr></tr>');
    }
    for (var j = 0; j < tableSide; j++) {
        $('table tr').append('<td></td>');
    }
}

function CheckAllRows(tableSide) {
    $('tr').each(
        (function () {
            //  CREATE AN ARRAY FOR EVERY ROW :
            var eachRow = new Array();
            $(this).find('td').each(function () {
                var tdContent = $(this).html().trim();
                if (tdContent.length > 0)
                    eachRow[eachRow.length] = tdContent;
            });
            //  IF ALL =TD= IN THE ROW ARE FILLED :
            if (eachRow.length == tableSide) {
                checkAllElemsEquality(eachRow);
            }
            eachRow = [];
        })
    );
}

function CheckDiagonal(tableSide, startColumnNum, increment) {
    var diagonal = new Array();
    var currRowInd = startColumnNum;
    //  CREATE DIAGONAL ARRAY :
    $('tr').each(
        (function () {
            $(this).find('td:eq(' + currRowInd + ')').each(
                (function () {
                    var tdContent = $(this).html().trim();
                    if (tdContent.length > 0)
                        diagonal[diagonal.length] = tdContent;
                })
            );
            currRowInd += increment;
        })
    );
    // IF ALL ITEM IN THE CURRENT DIAGONAL ARE FILLED :
    if (diagonal.length == tableSide) {
        checkAllElemsEquality(diagonal);
    }
    diagonal = [];
}

function CheckAllColumns(tableSide) {
    for (var i = 0; i < tableSide; i++) {
        // CREATE ARRAY FOR EVERY COLUMN:
        var currColumn = new Array();
        $('tr').each(
            (function () {
                $(this).find('td:eq(' + i + ')').each(
                    (function () {
                        var tdContent = $(this).html().trim();
                        if (tdContent.length > 0)
                            currColumn[currColumn.length] = tdContent;
                    })
                )
            })
        );
        // IF ALL ITEM IN THE CURRENT COLUMN ARE FILLED :
        if (currColumn.length == tableSide) {
            checkAllElemsEquality(currColumn);
        }
        currColumn = [];
    }
}

function checkAllElemsEquality(eachRow) {
    var allElemsEqual = true;
    var firstElem = eachRow[0];
    for (var i = 0; i < eachRow.length; i++) {
        if (firstElem != eachRow[i]) allElemsEqual = false;
    }
    if (allElemsEqual)
        GameOver(firstElem);
}

function GameOver(winnerSymbol) {
    alert("Yahoo!  " + winnerSymbol + " - are Winners!");
    location.reload();
}