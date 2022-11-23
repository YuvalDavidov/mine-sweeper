'uses strict'

const MINE = '💣'
const EMPTY = ''
const FLAG = '🚩'
var gTime

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gBoard
var gSize = gLevel.SIZE

function initGame() {
    gBoard = createBoard(gSize)
    renderBoard(gBoard, '.board')

}


function createBoard(gSize) {
    var size = gSize
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var cell = {
                location: { i: i, j: j },
                symbol: EMPTY,
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell

        }
    }
    for (var k = 0; k < gLevel.MINES; k++) {
        var x = getRandomInt(0, gLevel.SIZE)
        var y = getRandomInt(0, gLevel.SIZE)
        if (board[x][y].isMine) {
            k--
        } else {
            var mine = {
                location: { i: x, j: y },
                symbol: MINE,
                // minesAroundCount: 4,
                isShown: false,
                isMine: true,
                isMarked: false
            }
            board[x][y] = mine
        }

    }
    // console.log(board);
    return board
}

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            if (cell.symbol === MINE) cell.symbol = EMPTY

            strHTML += `<td class="${className}" onmousedown="cellClicked(this,${cell.location.i},${cell.location.j},event)">${cell.symbol}</td>`
            // console.log(cell);
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}

function checkVictory(board) {
    var mineCount = 0
    var shownedCellCount = 0

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine && currCell.isMarked) {
                mineCount++
            } else if (currCell.isShown) shownedCellCount++

        }
    }

    if (mineCount + shownedCellCount === gSize ** 2) {
        clearInterval(gTime)
        alert('you won!')
    }

}


function gameOver(board) {
    clearInterval(gTime)

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) {
                var res = document.querySelector('.cell-' + i + '-' + j)
                res.innerHTML = MINE
            }

        }
    }
    // console.log(elClicked, cellI, cellJ);
    // document.querySelectorAll()



}



function restart() {

}