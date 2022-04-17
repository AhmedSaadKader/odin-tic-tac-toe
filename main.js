const Gameboard = (() => {
    let gameboard = []
    let gameOver = false
    let turn = 'X'
    let clickBoardCounter = 0
    let winner, cells
    const mainBoard = document.querySelector('.board')
    const drawBoard = ()=>{
        for (let index = 0; index < 9; index++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            mainBoard.appendChild(cell)
            gameboard.push(cell)
        }
    }
    const play = () => {
        if(clickBoardCounter < 9){
            clickBoardCounter % 2 == 0 ? turn = 'X': turn = 'O'
            return turn
        } else {return}
    }

    const randomCompMove = (Player1, Player2) => {
        cells = document.querySelectorAll('.cell')
        let emptyCells = []
        cells.forEach(cell => {
            if (cell.innerHTML == ''){
                emptyCells.push(cell)
            }
        })
        const randomMove =  emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (randomMove){
                randomMove.innerHTML = 'O'
            }
    }

    const win = (Player1, Player2) => {
        cells = document.querySelectorAll('.cell')
        if (
        (cells[0].innerHTML == cells[1].innerHTML && cells[1].innerHTML == cells[2].innerHTML && cells[0].innerHTML != '')||
        (cells[3].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[5].innerHTML && cells[3].innerHTML != '')||
        (cells[6].innerHTML == cells[7].innerHTML && cells[7].innerHTML == cells[8].innerHTML && cells[6].innerHTML != '')||
        (cells[0].innerHTML == cells[3].innerHTML && cells[3].innerHTML == cells[6].innerHTML && cells[0].innerHTML != '')||
        (cells[1].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[7].innerHTML && cells[1].innerHTML != '')||
        (cells[2].innerHTML == cells[5].innerHTML && cells[5].innerHTML == cells[8].innerHTML && cells[2].innerHTML != '')||
        (cells[0].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[8].innerHTML && cells[0].innerHTML != '')||
        (cells[2].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[6].innerHTML && cells[2].innerHTML != '')){
            gameOver = true
            Player1.winRound(turn)
            Player2.winRound(turn)
            document.querySelector('#winner-announce').innerHTML = `<span>${turn}</span><span>&nbspwins</span>`
            document.querySelector('dialog').open = true
            return 'OK'
        } else if (clickBoardCounter == 9) {
            document.querySelector('#winner-announce').innerHTML = '<span>Tie</span>'
            document.querySelector('dialog').open = true
            return
        }
    }
    const renderPlay = function(Player1, Player2, ...PlayersTypes) {
        drawBoard()
        gameboard.forEach((cell) => {
                cell.addEventListener('click', () => {
                    if (!gameOver){
                        if (cell.innerHTML === '') {
                            play()
                            cell.innerHTML = turn
                            clickBoardCounter ++
                            if (win(Player1, Player2) == 'OK') {
                                return
                            }
                            if (PlayersTypes.includes('AI')){
                                play()
                                randomCompMove()
                                win(Player1, Player2)
                                clickBoardCounter ++
                            }
                        }
                    }
            })
        });
    };
    const resetBoard = function(){
        gameboard = []
        gameOver = false
        turn = 'X'
        clickBoardCounter = 0
        while(mainBoard.firstChild){
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
        if (letter == turn){
            score += 1
            playerScoreP.innerHTML = `<span>Score: </span><h4>${score}</h4>`
        }
    };
    return {name, letter,type, updateDisplay, winRound}
}


const player1form = document.querySelector('#form-1')
const player2form = document.querySelector('#form-2')
const player1Display = document.querySelector('#player-1-display')
const player2Display = document.querySelector('#player-2-display')
const playGame = document.getElementById('play-game')
let Player1, Player2

player1form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const player1Name = player1form.elements.name.value
    const player1Type = player1form.elements.playerType.value
    Player1 = player(player1Name, 'X', player1Type)
    player1form.style.display = 'none'
    Player1.updateDisplay(player1Display);
    if (Player2 !== undefined){
        playGame.classList.remove('hidden')
    }
})

player2form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const player2Name = player2form.elements.name.value
    const player2Type = player2form.elements.playerType.value
    Player2 = player(player2Name, 'O', player2Type)
    player2form.style.display = 'none'
    Player2.updateDisplay(player2Display);
    if (Player1 !== undefined){
        playGame.classList.remove('hidden')
    }

})

const resetButton = document.getElementById('play-again')
const newGame = document.getElementById('new-game')

playGame.addEventListener('click', () =>{
    Gameboard.renderPlay(Player1, Player2, Player1.type, Player2.type)
    playGame.classList.add('hidden')
})
resetButton.addEventListener('click', ()=> {
    Gameboard.resetBoard()
    document.querySelector('dialog').open = false
    Gameboard.renderPlay(Player1, Player2,Player1.type, Player2.type)
})
newGame.addEventListener('click', ()=> {
    location.reload()
})