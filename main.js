const player1form = document.querySelector('#form-1')

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
            document.querySelector('dialog').open = true
        } else if (clickBoardCounter == 9) {
            document.querySelector('dialog').innerHTML = 'tie'
            document.querySelector('dialog').open = true
        }
    }
    const renderPlay = function() {
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

    return {
        renderPlay, turn
    }
})();


const Player = (name, XorO) => { 
    const sayHello = () => console.log(`hello ${name}`);
    let score = 0;
    const winRound = (turn) => {
        score += 1
    };
    return {name, XorO, sayHello, winRound}
}

const Player1 = Player('Ahmed', 'X')
const Player2 = Player('AI', 'O')

Gameboard.renderPlay()
console.log(Gameboard.turn, Player1.XorO, )