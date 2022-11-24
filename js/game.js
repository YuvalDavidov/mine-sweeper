'uses strict'

const MINE = '<img src="img/minesweeper.png">'
const EMPTY = ''
const FLAG = '🚩'
var gTime
var gBoard
var elSmile = document.querySelector('.restart')

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




function initGame() {
    gBoard = createBoard(gLevel)
    renderBoard(gBoard, '.board')

}


function createBoard(gLevel) {
    var size = gLevel.SIZE
    var mines = gLevel.MINES
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var cell = {
                location: { i: i, j: j },
                symbol: EMPTY,
                minesAroundCount: -1,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell

        }
    }
    // for (var k = 0; k < mines; k++) {
    //     var x = getRandomInt(0, gLevel.SIZE)
    //     var y = getRandomInt(0, gLevel.SIZE)
    //     if (board[x][y].isMine) {
    //         k--
    //     } else {
    //         var mine = {
    //             location: { i: x, j: y },
    //             symbol: MINE,
    //             // minesAroundCount: 4,
    //             isShown: false,
    //             isMine: true,
    //             isMarked: false
    //         }
    //         board[x][y] = mine
    //     }

    // }
    // console.log(board);
    return board
}

function renderBoard(mat, selector) {

    var strHTML = '<table border="0" align= "center"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            if (cell.isMine) cell.symbol = EMPTY

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
    var mineCount = gGame.shownCount
    var shownedCellCount = gGame.markedCount


    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine && currCell.isMarked) {
                mineCount++

            } else if (currCell.isShown) shownedCellCount++

        }
    }

    if (mineCount + shownedCellCount === gLevel.SIZE ** 2) {
        clearInterval(gTime)
        gGame.isOn = false
        elSmile.innerText = '😎'
        alert('you won!')
    }

}


function gameOver(board) {
    clearInterval(gTime)
    elSmile.innerText = '🤯'
    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) {
                var res = document.querySelector('.cell-' + i + '-' + j)
                res.innerHTML = MINE
            }

        }
    }
    gGame.isOn = false
}

function chooseLvl(el) {

    if (el.innerHTML === 'Medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
        restart()
    } else if (el.innerHTML === 'Expert') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
        restart()
    } else if (el.innerHTML === 'Beginner') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
        restart()
    }

}

function restart() {
    clearInterval(gTime)
    elSmile.innerText = '🙂'
    elFlagCount.innerText = gLevel.MINES
    var elSec = document.querySelector('.sec')
    var elMin = document.querySelector('.min')
    elSec.innerText = '00'
    elMin.innerText = '00'
    gTime = false
    gGame.isOn = false
    initGame()
}