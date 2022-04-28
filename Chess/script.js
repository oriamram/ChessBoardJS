
const kingsDeath=document.createElement('div');
document.body.appendChild(kingsDeath);
//create board
const board = document.createElement('table');
document.body.appendChild(board);
board.classList.add('board');
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
//all the char moves
class MoveSet {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    //checks if i ckicked on a char 
    isChar() {
        if (charData[this.row][this.col] !== undefined) {
            return charData[this.row][this.col];
        }
        else return undefined;
    }

    isClear(row, col) {
        const char = this.isChar();
        if (row >= 0 && col >= 0 && row < 8 && col < 8 && charData[row][col] !== undefined) {
            return false;
        } else return true;
    }


    // check for the vector of the specific char
    absuluteMoves() {
        const char = this.isChar();

        if (char.name === 'Bpawn') {
            return [[-1, 0],[-1,1],[-1,-1]];
        }
        if (char.name === 'Wpawn') {
            return [[1, 0],[1,1],[1,-1]];
        }
        if (char.name === 'rook') {
            let arr = [];
            for (let i = 1; i < 8; i++) {
                arr.push([i, 0]);
                if (this.isClear(char.row + i, char.col) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([0, i]);
                if (this.isClear(char.row, char.col + i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([-i, 0]);
                if (this.isClear(char.row - i, char.col) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([0, -i]);
                if (this.isClear(char.row, char.col - i) === false) break;
            }
            return arr;
        }
        if (char.name == 'bishop') {
            let arr = [];
            for (let i = 1; i < 8; i++) {
                arr.push([i, i]);
                if (this.isClear(char.row + i, char.col + i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([i, -i]);
                if (this.isClear(char.row + i, char.col - i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([-i, i]);
                if (this.isClear(char.row - i, char.col + i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([-i, -i]);
                if (this.isClear(char.row - i, char.col - i) === false) break;
            }
            return arr;
        }
        if (char.name === 'knight') {
            let arr = [];
            arr.push([-2, 1]);
            arr.push([-2, -1]);
            arr.push([2, 1]);
            arr.push([2, -1]);
            arr.push([-1, 2]);
            arr.push([-1, -2]);
            arr.push([1, 2]);
            arr.push([1, -2]);
            return arr;
        }
        if (char.name === 'king') {
            let arr = [];
            arr.push([1, 1]);
            arr.push([1, -1]);
            arr.push([-1, 1]);
            arr.push([-1, -1]);
            arr.push([0, 1]);
            arr.push([0, -1]);
            arr.push([1, 0]);
            arr.push([-1, 0]);
            return arr;
        }
        if (char.name === 'queen') {
            let arr = [];
            for (let i = 1; i < 8; i++) {
                arr.push([i, i]);
                if (this.isClear(char.row + i, char.col + i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([i, -i]);
                if (this.isClear(char.row + i, char.col - i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([-i, i]);
                if (this.isClear(char.row - i, char.col + i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([-i, -i]);
                if (this.isClear(char.row - i, char.col - i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([i, 0]);
                if (this.isClear(char.row + i, char.col) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([0, i]);
                if (this.isClear(char.row, char.col + i) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([-i, 0]);
                if (this.isClear(char.row - i, char.col) === false) break;
            }
            for (let i = 1; i < 8; i++) {
                arr.push([0, -i]);
                if (this.isClear(char.row, char.col - i) === false) break;
            }
            return arr;
        } else return undefined;
    }
    //check for the specific char moveset
    relativeMoves() {
        const moves = this.absuluteMoves();
        let relMoves = [];
        for (let move of moves) {
            relMoves.push([this.row + move[0], this.col + move[1]]);
        }
        return relMoves;
    }
    //this is all the truly possible moves for a char
    trulyMoves() {
        let possible = [];
        const relative = this.relativeMoves();
        for (let cel of relative) {
            if (cel[0] >= 0 && cel[0] < 8 && cel[1] >= 0 && cel[1] < 8) {
                possible.push(cel);
            }
        }
        return possible;
    }


}

//creates the play board
for (let i = 0; i < 8; i++) {
    const row = board.insertRow()
    for (let j = 0; j < 8; j++) {
        const cell = row.insertCell();
        if (((i + j) % 2) !== 0) {
            cell.classList.add('black');
            cell.addEventListener('click', () => active(i, j));
        } else {
            cell.classList.add('white');
            cell.addEventListener('click', () => active(i, j));
        }
        army(i, j);
    }
    charData.push(arrRow);
    arrRow = [];
}

////////////////////////////////////////////////////////////////////////////////////

//orgnize the pawns on the board
function army(i, j) {
    if (i === 0) {
        theChooser(i, j, WHITE);
    }
    else if (i === 1) {
        theRiser(WHITE, 'Wpawn', i, j);
    }
    else if (i === 7) {
        theChooser(i, j, BLACK);
    }
    else if (i === 6) {
        theRiser(BLACK, 'Bpawn', i, j);
    } else 
    arrRow.push(undefined);
}

//creates a life
function theRiser(type, name, y, x) {
    const img = document.createElement('img');
    img.src = type + '/' + name + '.png';
    board.rows[y].cells[x].appendChild(img);
    arrRow.push(new Char(type, name, y, x));
}

//organize the chars
function theChooser(i, j, type) {
    switch (j) {
        case 0:
            theRiser(type, 'rook', i, j);
            break;
        case 1:
            theRiser(type, 'knight', i, j);
            break;
        case 2:
            theRiser(type, 'bishop', i, j);
            break;
        case 3:
            theRiser(type, 'king', i, j);
            break;
        case 4:
            theRiser(type, 'queen', i, j);
            break;
        case 5:
            theRiser(type, 'bishop', i, j);
            break;
        case 6:
            theRiser(type, 'knight', i, j);
            break;
        case 7:
            theRiser(type, 'rook', i, j);
            break;
    }
}
//check for a kings death
function kingDeath() {
    let black = false;
    let white = false;
    for (let row of charData) {
        for (let char of row) {
            if (char !== undefined) {
                if (char.name === 'king' && char.type === BLACK) {
                    black = true;
                }
                if (char.name === 'king' && char.type === WHITE) {
                    white = true;
                }
            }
        }
    }
    if (black === false) {
        return WHITE;
    }
    else if (white === false) {
        return BLACK;
    } else return undefined;

}




let chosenOne;
let turn = WHITE;
//everything that happens on a click
function active(row, col) {
    if(kingsDeath.classList.contains('winner')) kingsDeath.classList.remove('winner');
    const char = charData[row][col];
    const charMoves = new MoveSet(row, col);
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
    board.rows[row].cells[col].classList.add('active');

    //create path and add event listener for moving+ resets chosenone
    if (chosenOne !== undefined && char.type !== chosenOne.type) {
        chosenOne = undefined;
    }
    else if (char !== undefined && char.type === turn) {
        chosenOne = char;
        const path = charMoves.trulyMoves()
        for (let arr of path) {
            if(char.name.includes('pawn')&&charData[arr[0]][arr[1]] === undefined&&(arr===path[1]||arr===path[2])){
                board.rows[arr[0]].cells[arr[1]].classList.add('pawn');
            } else if(char.name.includes('pawn')&&charData[arr[0]][arr[1]] !== undefined && charData[arr[0]][arr[1]].type !== char.type&&(arr===path[1]||arr===path[2])){
                board.rows[arr[0]].cells[arr[1]].classList.add('kill');
            }
            else if ((!char.name.includes('pawn'))&&charData[arr[0]][arr[1]] !== undefined && charData[arr[0]][arr[1]].type !== char.type) {
                board.rows[arr[0]].cells[arr[1]].classList.add('kill');

            } else if (charData[arr[0]][arr[1]] === undefined) board.rows[arr[0]].cells[arr[1]].classList.add('path');
        }
    }
    //upon kings death
    if (kingDeath() !== undefined) {
        
        charData=[];
        let type = kingDeath();
        for (let i = 0; i<8;i++) {
            for (let j = 0;j<8;j++) {
                if(board.rows[i].cells[j].hasChildNodes()){
                board.rows[i].cells[j].removeChild(board.rows[i].cells[j].firstElementChild);
                }
                army(i,j);
            }
            charData.push(arrRow);
            arrRow = [];
        }
        kingsDeath.innerText = 'Player '+ type + ' Win!' 
        kingsDeath.classList.add('winner');
        
    }
}

