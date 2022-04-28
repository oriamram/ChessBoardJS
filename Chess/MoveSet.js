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
//func to be able to know if the path is clear
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