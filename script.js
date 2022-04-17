/////////////////Creating the board and bg
// added container for the table and bg connected to class and body
const div = document.createElement('div');
document.body.appendChild(div);
div.classList.add('container');

// added table connected to container
const table = document.createElement('table');
div.appendChild(table);
table.className = 'table';

//arrays for the sides of the board
const arrCharsU = ['', 'H', '⅁', 'ᖵ', 'Ǝ', 'ᗡ', 'Ͻ', 'ꓭ', '∀', ''];
const arrNumsU = ['', '⇂', '↊', '↋', 'ߤ', '5', '9', '𝘓', '8', ''];
const arrChars = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
const arrNums = ['', '8', '7', '6', '5', '4', '3', '2', '1', ''];

//creats the sides cells
function theCreator(index, classNamer, arr, tr) {
    const th = document.createElement('th');
    tr.appendChild(th);
    th.innerText = arr[index];
    if (classNamer === 'head') {
        tr.className = classNamer;
    } else th.className = classNamer;
}

//creates all of the board includes the Numbers and Chars on the sides and pawns
for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (let j = 0; j < 10; j++) {
        if (i === 0) {
            theCreator(j, 'head', arrCharsU, tr);
        }
        else if (j === 0) {
            theCreator(i, 'sides', arrNumsU, tr);
        }
        else if (j === 9) {
            theCreator(i, 'sides', arrNums, tr);
        }
        else if (i === 9) {
            theCreator(j, 'head', arrChars, tr);
        }
        else if ((i + j) % 2 !== 0) {
            const tdBlack = document.createElement('td');
            tr.appendChild(tdBlack);
            tdBlack.className = 'black';
            tdBlack.addEventListener('click', () => active(tdBlack));
        } else {
            const tdWhite = document.createElement('td');
            tr.appendChild(tdWhite);
            tdWhite.addEventListener('click', () => active(tdWhite));

        }
        //staging pawns
        if (j > 0 && j < 9) {
            switch (i) {
                case 1:
                    theChooser(i, j, 'white');
                    break;
                case 2:
                    theRiser('White', 'pawn', i, j);
                    break;
                case 7:
                    theRiser('black', 'pawn', i, j);
                    break;
                case 8:
                    theChooser(i, j, 'black');
                    break;
            }
        }

    }
}
///////////////////////////////////////////////////////////////////

//creates a pawn
function theRiser(type, name, y, x) {
    const img = document.createElement('img');
    img.src = type + '/' + name + '.png';
    table.rows[y].cells[x].appendChild(img);
}
//choose white pawn to put
function theChooser(i, j, type) {
    switch (j) {
        case 1:
            theRiser(type, 'rook', i, j);
            break;
        case 2:
            theRiser(type, 'knight', i, j);
            break;
        case 3:
            theRiser(type, 'bishop', i, j);
            break;
        case 4:
            theRiser(type, 'queen', i, j);
            break;
        case 5:
            theRiser(type, 'king', i, j);
            break;
        case 6:
            theRiser(type, 'bishop', i, j);
            break;
        case 7:
            theRiser(type, 'knight', i, j);
            break;
        case 8:
            theRiser(type, 'rook', i, j);
            break;
    }
}
//make the cell turn colors
function active(cell) {
    for (let row of table.rows) {
        for (let box of row.cells) {
            box.classList.remove('active');
        }
    }
    cell.classList.toggle('active');
}















