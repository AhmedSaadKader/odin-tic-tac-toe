const Gameboard = (() => {
    const gameboard = [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]
    return {
        gameboard
    }
})();

const Player = (name) => {
    const sayHello = () => console.log(`hello ${name}`);
    let score = 0;
    const winRound = () => score += 1;
    return {name, sayHello, winRound}
}