'use strict'
var elFlagCount = document.querySelector('.flags')
elFlagCount.innerText = gLevel.MINES

var elLives = document.querySelector('.lives')
elLives.innerText = gGame.lives

var elHints = document.querySelector('.hints')
elHints.innerText = gGame.hints


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

    if (!gGame.isOn) {
        var mines = gLevel.MINES
        for (var k = 0; k < mines; k++) {
            var x = getRandomInt(0, gLevel.SIZE)
            var y = getRandomInt(0, gLevel.SIZE)
            if (gBoard[x][y].isMine) {
                k--
            } if (x === cellI && y === cellJ) {
                k--
            }
            else {
                var mine = {
                    location: { i: x, j: y },
                    symbol: MINE,
                    // minesAroundCount: 4,
                    isShown: false,
                    isMine: true,
                    isMarked: false
                }
                gBoard[x][y] = mine
            }

        }
    }

    var elTime = document.querySelector('.sec')
    var currSec = elTime.innerText
    if (currSec === '00' && !gTime) {
        gGame.isOn = true
        gTime = setInterval(() => {

            timer()
        }, 1000);

    }

    if (gGame.isOn) {
        switch (ev.button) {
            case 0:
                if (elClicked.innerHTML !== FLAG) {

                    if (!gBoard[cellI][cellJ].isShown) {
                        gBoard[cellI][cellJ].minesAroundCount = countMineNeighbors(cellI, cellJ, gBoard)
                        if (gBoard[cellI][cellJ].minesAroundCount === 0) {
                            elClicked.innerHTML = ' '
                            elClicked.classList.add('cellShown')
                        } else {
                            elClicked.innerHTML = gBoard[cellI][cellJ].minesAroundCount
                            elClicked.classList.add('cellShown')
                        }

                        if (gBoard[cellI][cellJ].minesAroundCount === 0 && !gBoard[cellI][cellJ].isMine) {
                            revealNeighbors(cellI, cellJ)

                        }

                        gBoard[cellI][cellJ].isShown = true
                        if (gBoard[cellI][cellJ].isMine) {
                            gGame.lives--
                            elLives.innerText = gGame.lives
                            elClicked.innerHTML = MINE
                            elClicked.classList.add('cellRed')
                            if (gGame.lives === 0) {
                                gameOver(gBoard)
                            }


                        }

                    }
                }
                break;

            case 2:
                // console.log('hi');
                if (elClicked.innerHTML !== FLAG && elFlagCount.innerText !== '0') {

                    elClicked.innerHTML = FLAG
                    elFlagCount.innerText--
                    gBoard[cellI][cellJ].isMarked = true
                    console.log(gBoard);

                } else if (elClicked.innerHTML === FLAG) {
                    elClicked.innerHTML = EMPTY
                    elFlagCount.innerText++
                }
                break;
        }
    } else return
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

    gBoard[iCell][jCell].minesAroundCount = countMineNeighbors(iCell, jCell, gBoard)
    if (gBoard[iCell][jCell].minesAroundCount !== 0) {
        var currCell = gBoard[iCell][jCell]
        currCell.isShown = true
        var elCell = document.querySelector(`.cell-${iCell}-${jCell}`)
        elCell.classList.add('cellShown')
        renderCell(currCell.location, gBoard[iCell][jCell].minesAroundCount)
        return
    }
    else {
        var currCell = gBoard[iCell][jCell]
        currCell.isShown = true
        var elCell = document.querySelector(`.cell-${iCell}-${jCell}`)
        elCell.classList.add('cellShown')
        renderCell(currCell.location, ' ')
        for (var i = iCell - 1; i <= iCell + 1; i++) {
            for (var j = jCell - 1; j <= jCell + 1; j++) {
                if (i === iCell && j === jCell) continue
                else if (i < 0 || i > gBoard[0].length - 1 || j > gBoard[0].length - 1 || j < 0) continue
                var currentCell = gBoard[i][j]
                if (currentCell.isMine) continue
                if (!currentCell.isShown) {

                    revealNeighbors(i, j)
                }
            }
        }
    }

}

function hints() {

}
