//all the char moves and actions
class MoveSet {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    //checks which char was clicked
    isChar() {
        if (charData[this.row][this.col] !== undefined) {
            return charData[this.row][this.col];
        }
        else return undefined;
    }
    //check for clear path
    isClear(row, col) {
        const char = this.isChar();
        if (row >= 0 && col >= 0 && row < 8 && col < 8 && charData[row][col] !== undefined) {
            return false;
        } else return true;
    }


    //check for the vector of the specific char considering players stuck in the middle of the path
    absuluteMoves() {
        const char = this.isChar();

        if (char.name === 'Bpawn') {
            return [[-1, 0], [-1, 1], [-1, -1]];
        }
        if (char.name === 'Wpawn') {
            return [[1, 0], [1, 1], [1, -1]];
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
    //check for the specific char moveset by(row/col)
    relativeMoves() {
        const moves = this.absuluteMoves();
        let relMoves = [];
        for (let move of moves) {
            relMoves.push([this.row + move[0], this.col + move[1]]);
        }
        return relMoves;
    }

    //this is all the truly possible moves for a char (filter move)
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

    //actually moves the char
    nowMove(char, board, turn) {
        const row = this.row;
        const col = this.col;
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
        return turn;
    }

    //killing player 
    nowKill(char, board, turn) {
        const row = this.row;
        const col = this.col;

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
        return turn;
    }

}