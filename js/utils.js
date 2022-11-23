'use strict'


function countMineNeighbors(cellI, cellJ, mat) {
    var neighborsMineCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) neighborsMineCount++
        }
    }

    return neighborsMineCount
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function cellClicked(elClicked, cellI, cellJ, ev) {
    var elTime = document.querySelector('.timer')
    var currSec = elTime.innerText
    if (+currSec === 0 && !gTime) {


        gTime = setInterval(() => {
            timer()
        }, 1000);

    }
    switch (ev.button) {
        case 0:
            if (elClicked.innerHTML !== FLAG) {

                if (!gBoard[cellI][cellJ].isShown) {
                    gBoard[cellI][cellJ].minesAroundCount = countMineNeighbors(cellI, cellJ, gBoard)
                    elClicked.innerHTML = countMineNeighbors(cellI, cellJ, gBoard)
                    gBoard[cellI][cellJ].isShown = true
                    if (gBoard[cellI][cellJ].isMine) {

                        elClicked.innerHTML = MINE
                        elClicked.classList.add('cellRed')

                        gameOver(gBoard)
                    }

                }
            }
            break;

        case 2:
            // console.log('hi');
            if (elClicked.innerHTML !== FLAG) {
                elClicked.innerHTML = FLAG
                gBoard[cellI][cellJ].isMarked = true
                console.log(gBoard);
            } else elClicked.innerHTML = EMPTY
            break;
    }

    checkVictory(gBoard)

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function timer() {

    var elTime = document.querySelector('.timer')

    var currSec = elTime.innerText
    currSec++
    elTime.innerText = currSec
}
