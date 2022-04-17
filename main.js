const player1form = document.querySelector('#form-1')
const player2form = document.querySelector('#form-2')
const player1Display = document.querySelector('#player-1-display')
const player2Display = document.querySelector('#player-2-display')
const playGame = document.getElementById('play-game')
const boardDiv = document.getElementById('board')
let emptyCells = []
let Player1, Player2

const Gameboard = (() => {
    let gameboard = []
    let gameOver = false
    let turn = 'X'
    let clickBoardCounter = 0
    let winner, cells
    let cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8
    const mainBoard = document.querySelector('.board')
    const drawBoard = () => {
        for (let index = 0; index < 9; index++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('id', `cell-${index}`)
            mainBoard.appendChild(cell)
            gameboard.push(cell)
            cell0 = document.getElementById('cell-0')
            cell1 = document.getElementById('cell-1')
            cell2 = document.getElementById('cell-2')
            cell3 = document.getElementById('cell-3')
            cell4 = document.getElementById('cell-4')
            cell5 = document.getElementById('cell-5')
            cell6 = document.getElementById('cell-6')
            cell7 = document.getElementById('cell-7')
            cell8 = document.getElementById('cell-8')
        }
    }
    const play = () => {
        if (clickBoardCounter < 9) {
            clickBoardCounter % 2 == 0 ? turn = 'X' : turn = 'O'
            return turn
        } else { return }
    }

    const randomCompMove = () => {
        getEmptyCells()
        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (randomMove) {
            if (checkWin != 'Ok') {
                randomMove.innerHTML = 'O'
                randomMove.dataset.letter = 'O'
            }
        }
    }

    const getEmptyCells = () => {
        emptyCells = []
        cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            if (cell.innerHTML == '') {
                emptyCells.push(cell)
            }
        })
        return emptyCells
    }

    const minimax = (cells, arraylength, Player) => {
        getEmptyCells()
        let position = cells
        console.log(arraylength, position)

        if (arraylength == 0){
            console.log('game over')
            return 'game over'
        }
        else if (Player.type == 'AI'){
            console.log('hihi')
            let maxEval = -Infinity;
            position.forEach(cell => {
                if(Player.letter == "O"){
                    console.log(cell)
                    cell.innerHTML = "O"
                    minimax()
                }
                if(checkWin(Player1, Player2, position) == 'OK') {
                    console.log('xx')
                    return 
                }
            })
            
        }
    }

    const smartCompMove = () => {

    }

    const checkWin = (Player1, Player2, cells) => {
        cells = document.querySelectorAll('.cell')
        if (
            (cell0.dataset.letter == cell1.dataset.letter && cell1.dataset.letter == cell2.dataset.letter && cell0.dataset.letter != undefined) ||
            (cell3.dataset.letter == cell4.dataset.letter && cell4.dataset.letter == cell5.dataset.letter && cell3.dataset.letter != undefined) ||
            (cell6.dataset.letter == cell7.dataset.letter && cell7.dataset.letter == cell8.dataset.letter && cell6.dataset.letter != undefined) ||
            (cell0.dataset.letter == cell3.dataset.letter && cell3.dataset.letter == cell6.dataset.letter && cell0.dataset.letter != undefined) ||
            (cell1.dataset.letter == cell4.dataset.letter && cell4.dataset.letter == cell7.dataset.letter && cell1.dataset.letter != undefined) ||
            (cell2.dataset.letter == cell5.dataset.letter && cell5.dataset.letter == cell8.dataset.letter && cell2.dataset.letter != undefined) ||
            (cell0.dataset.letter == cell4.dataset.letter && cell4.dataset.letter == cell8.dataset.letter && cell0.dataset.letter != undefined) ||
            (cell2.dataset.letter == cell4.dataset.letter && cell4.dataset.letter == cell6.dataset.letter && cell2.dataset.letter != undefined)) {
            console.log(turn)
                return turn

        } else if (clickBoardCounter == 9) {

            return 'Tie'
        }
    }

    const winAction = () => {
        Player1.winRound(turn)
        Player2.winRound(turn)
        document.querySelector('#winner-announce').innerHTML = `<span>${turn}</span><span>&nbspwins</span>`
        document.querySelector('dialog').open = true
        return 'OK'
    }

    const tieAction = () => {
        document.querySelector('#winner-announce').innerHTML = '<span>Tie</span>'
        document.querySelector('dialog').open = true
    }

    const renderPlay = function (Player1, Player2, ...PlayersTypes) {
        drawBoard()
        gameboard.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (!gameOver) {
                    if (cell.innerHTML === '') {
                        play()
                        cell.innerHTML = turn
                        cell.dataset.letter = turn
                        clickBoardCounter++
                        if (checkWin(Player1, Player2)== turn) {
                            console.log(turn)
                            return winAction()
                        } else if (checkWin(Player1, Player2) == 'Tie'){
                            return tieAction()
                        }
                        if (PlayersTypes.includes('AI')) {
                            play()
                            randomCompMove()
                            if (checkWin(Player1, Player2) == turn) {
                                return winAction()
                            } else if (checkWin(Player1, Player2) == 'Tie'){
                                return tieAction()
                            }
                            clickBoardCounter++
                            // minimax(cells, emptyCells.length, Player2)
                        }
                    }
                }
            })
        });
    };
    const resetBoard = function () {
        gameboard = []
        gameOver = false
        turn = 'X'
        clickBoardCounter = 0
        while (mainBoard.firstChild) {
            mainBoard.removeChild(mainBoard.firstChild)
        }
    }
    return {
        renderPlay, resetBoard, turn, winner
    }

})();

const player = (name, letter, type) => {
    let score = 0;
    let playerScoreP
    const updateDisplay = (playerDivID) => {
        const playerNameP = document.createElement('p')
        playerNameP.innerHTML = `<span>Player Name: </span> <h4 id="h4-margin-0">${name}</h4>`
        const humanOrAI = document.createElement('h4')
        humanOrAI.innerHTML = type
        playerScoreP = document.createElement('p')
        playerScoreP.innerHTML = `<span>Score: </span><h4>${score}</h4>`
        playerDivID.appendChild(playerNameP)
        playerDivID.appendChild(playerScoreP)
        playerDivID.appendChild(humanOrAI)
    };
    const winRound = (turn) => {
        if (letter == turn) {
            score += 1
            playerScoreP.innerHTML = `<span>Score: </span><h4>${score}</h4>`
        }
    };
    return { name, letter, type, updateDisplay, winRound }
}

player1form.addEventListener('submit', (e) => {
    e.preventDefault()
    const player1Name = player1form.elements.name.value
    const player1Type = player1form.elements.playerType.value
    Player1 = player(player1Name, 'X', player1Type)
    player1form.style.display = 'none'
    Player1.updateDisplay(player1Display);
    if (Player2 !== undefined) {
        playGame.classList.remove('hidden')
    }
})

player2form.addEventListener('submit', (e) => {
    e.preventDefault()
    const player2Name = player2form.elements.name.value
    const player2Type = player2form.elements.playerType.value
    Player2 = player(player2Name, 'O', player2Type)
    player2form.style.display = 'none'
    Player2.updateDisplay(player2Display);
    if (Player1 !== undefined) {
        playGame.classList.remove('hidden')
    }

})

const resetButton = document.getElementById('play-again')
const newGame = document.getElementById('new-game')

playGame.addEventListener('click', () => {
    Gameboard.renderPlay(Player1, Player2, Player1.type, Player2.type)
    playGame.classList.add('hidden')
    boardDiv.classList.add('active')
})
resetButton.addEventListener('click', () => {
    Gameboard.resetBoard()
    document.querySelector('dialog').open = false
    Gameboard.renderPlay(Player1, Player2, Player1.type, Player2.type)
})
newGame.addEventListener('click', () => {
    location.reload()
})