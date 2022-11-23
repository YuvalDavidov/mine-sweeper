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
    var elTime = document.querySelector('.sec')
    var currSec = elTime.innerText
    if (currSec === '00' && !gTime) {
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
                    if (+elClicked.innerHTML === 0 && !gBoard[cellI][cellJ].isMine) {
                        revealNeighbors(cellI, cellJ)

                    }

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
    var tens = '0'

    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    if (currSec > 9) tens = ''
    elSec.innerText = tens + currSec

    var tens2 = '0'
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText

    if (currSec >= 60) {
        currMin++
        currSec = 0
        elSec.innerText = 0
        tens = '0'
        if (currMin > 9) tens2 = ''
        elMin.innerText = tens2 + currMin
        elSec.innerText = tens + currSec
    }




}

function revealNeighbors(iCell, jCell) {

    for (var i = iCell - 1; i <= iCell + 1; i++) {

        for (var j = jCell - 1; j <= jCell + 1; j++) {
            if (i === iCell && j === jCell) continue
            if (i < 0 || i > gBoard[0].length - 1 || j > gBoard[0].length - 1 || j < 0) continue
            else {
                var currCell = gBoard[i][j]
                currCell.isShown = true
                renderCell(currCell.location, countMineNeighbors(i, j, gBoard))
            }
        }
    }
}
