
const kingsDeath = document.createElement('div');
document.body.appendChild(kingsDeath);
//create board
const board = document.createElement('table');
document.body.appendChild(board);
board.classList.add('board');
board.classList.add('upsideDown');


const BLACK = 'black';
const WHITE = 'white';
let selectedCell;

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

////////////////////////////////////////////////////////////////////////////////////

const game = new Game();




let chosenOne;
let turn = WHITE;
//everything that happens on a click
function active(row, col) {
   
        
    
    kingsDeath.classList.remove('winner');
    let char = undefined;
    const charMoves = new MoveSet(row, col)
    char = charData[row][col];

    //actually moves the char
    if (char === undefined && board.rows[row].cells[col].classList.contains('path')) {
        board.rows[row].cells[col].innerHTML = board.rows[chosenOne.row].cells[chosenOne.col].innerHTML;
        charData[row][col] = new Char(chosenOne.type, chosenOne.name, row, col);
        board.rows[chosenOne.row].cells[chosenOne.col].innerHTML = '';
        charData[chosenOne.row][chosenOne.col] = undefined;
        chosenOne = undefined;
        switch (turn) {
            case BLACK:
                turn = WHITE;
                break;
            case WHITE:
                turn = BLACK;
        }
    }
    //killing player 
    if (char !== undefined && board.rows[row].cells[col].classList.contains('kill')) {
        charData[row][col] = new Char(chosenOne.type, chosenOne.name, row, col);
        charData[chosenOne.row][chosenOne.col] = undefined;
        board.rows[row].cells[col].innerHTML = board.rows[chosenOne.row].cells[chosenOne.col].innerHTML;
        board.rows[chosenOne.row].cells[chosenOne.col].innerHTML = '';

        switch (turn) {
            case BLACK:
                turn = WHITE;
                break;
            case WHITE:
                turn = BLACK;
        }
    }

    //reset all classes
    for (let row of board.rows) {
        for (let cell of row.cells) {
            cell.classList.remove('active');
            cell.classList.remove('path');
            cell.classList.remove('kill');
        }
    }
    

    //create path and add event listener for moving+ resets chosenone
    if (chosenOne !== undefined && char.type !== chosenOne.type) {
        chosenOne = undefined;
    }
    else if (char !== undefined && char.type === turn) {
        board.rows[row].cells[col].classList.add('active');
        chosenOne = char;
        const path = charMoves.trulyMoves()
        for (let arr of path) {
            setTimeout(()=>{},1000);
            if (char.name.includes('pawn') && charData[arr[0]][arr[1]] === undefined && (arr === path[1] || arr === path[2])) {
                board.rows[arr[0]].cells[arr[1]].classList.add('pawn');
            } else if (char.name.includes('pawn') && charData[arr[0]][arr[1]] !== undefined && charData[arr[0]][arr[1]].type !== char.type && (arr === path[1] || arr === path[2])) {
                board.rows[arr[0]].cells[arr[1]].classList.add('kill');
            }
            else if ((!char.name.includes('pawn')) && charData[arr[0]][arr[1]] !== undefined && charData[arr[0]][arr[1]].type !== char.type) {
                board.rows[arr[0]].cells[arr[1]].classList.add('kill');

            } else if (charData[arr[0]][arr[1]] === undefined) board.rows[arr[0]].cells[arr[1]].classList.add('path');
        }
    }

    //upon kings death
    if (game.kingDeath(charData) !== undefined) {
        charData = [];
        let type = game.kingDeath(charData);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board.rows[i].cells[j].hasChildNodes()) {
                    board.rows[i].cells[j].removeChild(board.rows[i].cells[j].firstElementChild);
                }
                game.army(i, j);
            }
            charData.push(arrRow);
            arrRow = [];
        }
        kingsDeath.innerText = 'Player ' + type + ' Win!'
        kingsDeath.classList.add('winner');

    }
    if(turn===BLACK)
    board.classList.remove('upsideDown');
    if(turn===WHITE&&!kingsDeath.classList.contains('winner'))
    setTimeout(board.classList.add('upsideDown'), 1100);
}

