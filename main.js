const Gameboard = (() => {
    let gameboard = []
    let gameOver = false
    let turn = 'X'
    let clickBoardCounter = 0
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
    const win = () => {
        const cells = document.querySelectorAll('.cell')
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
            document.querySelector('#winner-announce').innerHTML = `${turn}`
            document.querySelector('dialog').open = true
        } else if (clickBoardCounter == 9) {
            document.querySelector('#winner-announce').innerHTML = 'tie'
            document.querySelector('dialog').open = true
        }
    }
    const renderPlay = function(...playersLetters) {
        drawBoard()
        gameboard.forEach((cell) => {
                cell.addEventListener('click', () => {
                    if (!gameOver){
                        if (cell.innerHTML === '') {
                            play()
                            cell.innerHTML = turn
                            clickBoardCounter ++
                            win()
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
        renderPlay, turn, resetBoard
    }

})();


const player = (name, letter) => {
    let score = 0;
    let playerScoreP
    const updateDisplay = (playerDivID) => {
        const playerNameP = document.createElement('p')
        playerNameP.innerHTML = `Player Name: ${name}`
        playerScoreP = document.createElement('p')
        playerScoreP.innerHTML = `Score: ${score}`
        playerDivID.appendChild(playerNameP)
        playerDivID.appendChild(playerScoreP)
    };
    const winRound = () => {
        console.log(document.querySelector('#winner-announce').innerHTML)
        if (letter == document.querySelector('#winner-announce').innerHTML){
            score += 1
            console.log(`${name}: ${score}`)
            playerScoreP.innerHTML = `Score: ${score}`
        }
    };
    return {name, letter, updateDisplay, winRound}
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
    // const player1Letter = player1form.elements.letter.value
    Player1 = player(player1Name, 'X')
    player1form.style.display = 'none'
    Player1.updateDisplay(player1Display);
    if (player2form.elements.name.value !== ''){
        playGame.classList.remove('hidden')
    }
})

player2form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const player2Name = player2form.elements.name.value
    // const player2Letter = player2form.elements.letter.value
    Player2 = player(player2Name, 'O')
    player2form.style.display = 'none'
    Player2.updateDisplay(player2Display);
    if (player1form.elements.name.value !== ''){
        playGame.classList.remove('hidden')
    }

})

const resetButton = document.getElementById('play-again')
const newGame = document.getElementById('new-game')

playGame.addEventListener('click', () =>{
    Gameboard.renderPlay()
})
resetButton.addEventListener('click', ()=> {
    Player1.winRound(Gameboard.turn)
    Player2.winRound(Gameboard.turn)
    Gameboard.resetBoard()
    document.querySelector('dialog').open = false
    Gameboard.renderPlay()

})
newGame.addEventListener('click', ()=> {
    location.reload()
})

console.log(player1form.elements.name.value == '')