class Game {
    constructor() {
        this.board = this.board();
        this.whiteScore = 0;
        this.blackScore = 0;
    }
    //creates the play board
    board() {

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
    theRiser(type, name, row, col) {
        const img = document.createElement('img');
        img.src = type + '/' + name + '.png';
        board.rows[row].cells[col].appendChild(img);
        arrRow.push(new Char(type, name, row, col));
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

    //alert for check
    check(charData, turn) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {

                if (charData[row][col] !== undefined) {
                    let path = new MoveSet(row, col).trulyMoves();
                    for (let step of path) {
                        if (charData[step[0]][step[1]] !== undefined && charData[step[0]][step[1]].type !== charData[row][col].type && charData[step[0]][step[1]].name === 'king') {
                            if (charData[step[0]][step[1]].type !== turn) {
                                setTimeout(() => alert('The ' + charData[step[0]][step[1]].type + ' King is in CHECK!'), 700);
                                return charData[step[0]][step[1]];
                            }
                        }

                    }
                }
            }
        }



    }

    //what happens whe nthe King is dead
    uponKingsDeath() {
        let typeOfKing = this.kingDeath(charData);
        if (typeOfKing !== undefined) {
            charData = [];
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (board.rows[i].cells[j].hasChildNodes()) board.rows[i].cells[j].removeChild(board.rows[i].cells[j].firstElementChild);
                    this.army(i, j);
                }
                charData.push(arrRow);
                arrRow = [];
            }
            kingsDeath.innerText = 'Player ' + typeOfKing + ' Win!'
            kingsDeath.classList.add('winner');
            this.score(typeOfKing);
            console.log('white_ ' + this.whiteScore + ' black_ ' + this.blackScore);
        }
    }


    //reset board classes
    dlt(board) {
        for (let row of board.rows) {
            for (let cell of row.cells) {
                cell.classList.remove('active');
                cell.classList.remove('path');
                cell.classList.remove('kill');
            }
        }
    }


    //spins the game
    upsideDown(board) {
        board.classList.add('upsideDown');
        for (let row of board.rows) {
            for (let cell of row.cells) {
                if (cell.firstChild !== null) cell.firstChild.classList.add('upsideDown');
            }
        }
    }



    //reverse spin the games
    RupsideDown(board) {
        board.classList.remove('upsideDown');
        for (let row of board.rows) {
            for (let cell of row.cells) {
                if (cell.firstChild !== null) cell.firstChild.classList.remove('upsideDown');
            }
        }
    }
    //creates a path for an active char
    createPaths(char, charData, path, board) {
        for (let step of path) {
            if (char.name.includes('pawn') && charData[step[0]][step[1]] === undefined && step[1] !== char.col) {
                board.rows[step[0]].cells[step[1]].classList.add('pawn');
            } else if (char.name.includes('pawn') && charData[step[0]][step[1]] !== undefined && charData[step[0]][step[1]].type !== char.type && step[1] !== char.col) {
                board.rows[step[0]].cells[step[1]].classList.add('kill');
            }
            else if ((!char.name.includes('pawn')) && charData[step[0]][step[1]] !== undefined && charData[step[0]][step[1]].type !== char.type) {
                board.rows[step[0]].cells[step[1]].classList.add('kill');

            }
            else if (char.name.includes('pawn') && step === path[path.length - 1] && (char.row !== 1 && char.row !== 6)) {
                board.rows[step[0]].cells[step[1]].classList.add('pawn');
            } else if (charData[step[0]][step[1]] === undefined) board.rows[step[0]].cells[step[1]].classList.add('path');
        }
    }

    score(typeOfKing) {
        if (typeOfKing === BLACK)
            this.blackScore++;
        if (typeOfKing === WHITE)
            this.whiteScore++;
        scoreBoard.innerText = this.blackScore + ' : ' + this.whiteScore;

    }

}


