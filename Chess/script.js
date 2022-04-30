
const kingsDeath = document.createElement('div');
document.body.appendChild(kingsDeath);
//create board
const board = document.createElement('table');
document.body.appendChild(board);
board.classList.add('board');
turns = document.createElement('div');
turns.classList.add('turn');
document.body.appendChild(turns);
const BLACK = 'black';
const WHITE = 'white';
let turn = WHITE;
turns.innerText = 'Player ' + turn;
const scoreBoard = document.createElement('div');
scoreBoard.classList.add('scoreBoard');
document.body.appendChild(scoreBoard);
scoreBoard.innerText = '0 : 0';


//DATA
let arrRow = [];
let charData = [];

class Char {
    constructor(type, name, row, col) {
        this.type = type;
        this.name = name;
        this.row = row;
        this.col = col;
    }
}

const game = new Game();
game.upsideDown(board);

let chosenOne;
let isChecked;

//everything that happens on a click
function active(row, col) {
    let char = undefined;
    char = charData[row][col];
    const charMoves = new MoveSet(row, col)
    kingsDeath.classList.remove('winner');

    turn = charMoves.nowMove(char, board, turn);
    turn = charMoves.nowKill(char, board, turn);

    game.dlt(board);

    //creating the different paths
    if (char !== undefined && chosenOne !== undefined && char.type !== chosenOne.type) {
        chosenOne = undefined;
    }
    else if (char !== undefined && char.type === turn) {
        board.rows[row].cells[col].classList.add('active');
        chosenOne = char;
        const path = charMoves.trulyMoves()
        game.createPaths(char, charData, path, board);
    }


    game.uponKingsDeath();

    //spins the board and chars
    if (turn === BLACK) {
        game.RupsideDown(board);
    }
    if (turn === WHITE && !kingsDeath.classList.contains('winner')) {
        setTimeout(game.upsideDown(board), 1100);

    }

    turns.innerText = 'Player ' + turn;
    if (turn === BLACK) { turns.classList.add('turnBlack'); }
    else turns.classList.remove('turnBlack');

}
//moves func fix
//check upgrade
