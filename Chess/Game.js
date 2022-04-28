class Game {
    constructor() {
        this.board();
    }

    board() {
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
                this.army(i, j);
            }
            charData.push(arrRow);
            arrRow = [];
        }
    }

    //orgnize the pawns on the board
    army(i, j) {
        if (i === 0) {
            this.theChooser(i, j, WHITE);
        }
        else if (i === 1) {
            this.theRiser(WHITE, 'Wpawn', i, j);
        }
        else if (i === 7) {
            this.theChooser(i, j, BLACK);
        }
        else if (i === 6) {
            this.theRiser(BLACK, 'Bpawn', i, j);
        } else
            arrRow.push(undefined);
    }

    //creates a life
    theRiser(type, name, y, x) {
        const img = document.createElement('img');
        img.src = type + '/' + name + '.png';
        board.rows[y].cells[x].appendChild(img);
        arrRow.push(new Char(type, name, y, x));
    }

    //organize the chars
    theChooser(i, j, type) {
        switch (j) {
            case 0:
                this.theRiser(type, 'rook', i, j);
                break;
            case 1:
                this.theRiser(type, 'knight', i, j);
                break;
            case 2:
                this.theRiser(type, 'bishop', i, j);
                break;
            case 3:
                this.theRiser(type, 'king', i, j);
                break;
            case 4:
                this.theRiser(type, 'queen', i, j);
                break;
            case 5:
                this.theRiser(type, 'bishop', i, j);
                break;
            case 6:
                this.theRiser(type, 'knight', i, j);
                break;
            case 7:
                this.theRiser(type, 'rook', i, j);
                break;
        }
    }



    //check for a kings death
    kingDeath(charData) {
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
    //check for chess
    chess(charData,name) {

        for (let row = 0; row < 8; row++) {
            for (let cell = 0; cell < 8; cell++) {

                if (charData[row][cell] !== undefined) {
                    const moves = new MoveSet(row, cell).trulyMoves();
                    for (let move of moves) {
                        if (charData[move[0]][move[1]] !== undefined && charData[row][cell].name !== name && charData[row][cell].type !== charData[move[0]][move[1]].type && charData[move[0]][move[1]].name === name) {
                            return [charData[move[0]][move[1]],charData[row][cell]];
                        }
                    }
                }
            }
        }
        return undefined;
    }



}

