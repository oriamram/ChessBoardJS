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
class MoveSet {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    //check if the click contains chars
    isChar() {
        if (charData[this.row][this.col] !== undefined) {
            return charData[this.row][this.col];
        }
        else return undefined;
    }
    // check for the vector of the specific char
    absuluteMoves() {
        const char = this.isChar();

        if (char.name === 'Bpawn') {
            return [[-1, 0]];
        }
        if (char.name === 'Wpawn') {
            return [[1, 0]];
        }
        if (char.name === 'rook') {
            let arr = [];
            for (let i = 1; i < 8; i++) {
                arr.push([i, 0]);
                arr.push([0, i]);
                arr.push([-i, 0]);
                arr.push([0, -i]);
            }
            return arr;
        }
        if (char.name == 'bishop') {
            let arr = [];
            for (let i = 1; i < 8; i++) {
                arr.push([i, i]);
                arr.push([i, -i]);
                arr.push([-i, i]);
                arr.push([-i, -i]);
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
                arr.push([i, -i]);
                arr.push([-i, i]);
                arr.push([-i, -i]);
            }
            for (let i = 1; i < 8; i++) {
                arr.push([i, 0]);
                arr.push([0, i]);
                arr.push([-i, 0]);
                arr.push([0, -i]);
            }
            return arr;
        } else return undefined;



    }
    //takes the vector and add it to the char place
    relativeMoves() {
        //add if possible true/false;
        const moves = this.absuluteMoves();
        let relMoves = [];
        for (let move of moves) {
            relMoves.push([this.row + move[0], this.col + move[1]]);
        }
        return relMoves;
    }
    //return the positions that the specific char can move to
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


//create cells inside board+characters and push them into the 2D array Data
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
        } else arrRow.push(undefined);

    }
    charData.push(arrRow);
    arrRow = [];
}

////////////////////////////////////////////////////////////////////////////////////
//creates a life
function theRiser(type, name, y, x) {
    const img = document.createElement('img');
    img.src = type + '/' + name + '.png';
    board.rows[y].cells[x].appendChild(img);
    arrRow.push(new Char(type, name, y, x));
}
//choose white pawn to put
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
//create the path
let chosenOne;
function active(row, col) {
    const char = charData[row][col];
    const charMoves = new MoveSet(row,col);
    //actually moves the char
    if(char===undefined&&board.rows[row].cells[col].classList.contains('path')){
        board.rows[row].cells[col].innerHTML = board.rows[chosenOne.row].cells[chosenOne.col].innerHTML;
        charData[row][col]= new Char(chosenOne.type,chosenOne.name,row,col);
        board.rows[chosenOne.row].cells[chosenOne.col].innerHTML = '';
        charData[chosenOne.row][chosenOne.col]=undefined;
        chosenOne=undefined;
    }
//reset all classes
    for (let row of board.rows) {
        for (let cell of row.cells) {
            cell.classList.remove('active');
            cell.classList.remove('path');
        }
    }
    board.rows[row].cells[col].classList.add('active');
//create path and add event listener for moving
    if (char !== undefined) {
        chosenOne = char;
        const path = charMoves.trulyMoves()
        for (let arr of path) {
            board.rows[arr[0]].cells[arr[1]].classList.add('path');
        }
    } else console.log(undefined);
}