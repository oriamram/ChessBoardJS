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
let peacesIndex = [];
//object of a peace
class peace {
    constructor(type, name, row, con) {
        this.type = type;
        this.name = name;
        this.row = row;
        this.con = con;
    }
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
            tdBlack.addEventListener('click', active);
        } else {
            const tdWhite = document.createElement('td');
            tr.appendChild(tdWhite);
            tdWhite.addEventListener('click', active);
        }

        //staging pawns
        if (j > 0 && j < 9) {
            switch (i) {
                case 1:
                    theChooser(i, j, 'white');
                    break;
                case 2:
                    theRiser('White', 'pawn', i, j, peacesIndex);
                    break;
                case 7:
                    theRiser('black', 'pawn', i, j, peacesIndex);
                    break;
                case 8:
                    theChooser(i, j, 'black');
                    break;
            }
        }

    }
}
///////////////////////////////////////////////////////////////////

//creates a life
function theRiser(type, name, y, x, arr) {
    const img = document.createElement('img');
    img.src = type + '/' + name + '.png';
    table.rows[y].cells[x].appendChild(img);
    arr.push(new peace(type, name, y, x));
}


//choose white pawn to put
function theChooser(i, j, type) {
    switch (j) {
        case 1:
            theRiser(type, 'rook', i, j, peacesIndex);
            break;
        case 2:
            theRiser(type, 'knight', i, j, peacesIndex);
            break;
        case 3:
            theRiser(type, 'bishop', i, j, peacesIndex);
            break;
        case 4:
            theRiser(type, 'queen', i, j, peacesIndex);
            break;
        case 5:
            theRiser(type, 'king', i, j, peacesIndex);
            break;
        case 6:
            theRiser(type, 'bishop', i, j, peacesIndex);
            break;
        case 7:
            theRiser(type, 'knight', i, j, peacesIndex);
            break;
        case 8:
            theRiser(type, 'rook', i, j, peacesIndex);
            break;
    }
}
let selectedCell = undefined;
//make the cell turn colors
function active(e) {
    for (let row of table.rows) {
        for (let cell of row.cells) {
            cell.classList.remove('active');
        }
    }
    selectedCell = e.currentTarget;
    //selectedCell.classList.add('active');
    let row = selectedCell.parentElement.rowIndex;
    let con = selectedCell.cellIndex;

    for (let obj of peacesIndex) {
        if (obj.row === row && obj.con === con) {
            switch (obj.name) {
                case 'queen':
                    sides(obj.row, obj.con);
                    slants(obj.row, obj.con);
                    break;
                case 'bishop':
                    slants(obj.row, obj.con);
                    break;
                case 'rook':
                    sides(obj.row, obj.con);
                    break;
                case 'king':
                    let x = obj.con;
                    let y = obj.row;
                    table.rows[y].cells[x].classList.add('active');
                    if (x < 8) table.rows[y].cells[x + 1].classList.add('active');
                    if (y < 8) table.rows[y + 1].cells[x + 1].classList.add('active');
                    if (y > 1 && x < 8) table.rows[y - 1].cells[x + 1].classList.add('active');
                    if (y < 8) table.rows[y + 1].cells[x].classList.add('active');
                    if (y > 1 && x > 1) table.rows[y - 1].cells[x - 1].classList.add('active');
                    if (x > 1) table.rows[y].cells[x - 1].classList.add('active');
                    if (y > 1) table.rows[y - 1].cells[x].classList.add('active');
                    if (y < 8 && x > 1) table.rows[y + 1].cells[x - 1].classList.add('active');
                    break;

                case 'knight':
                    knightMove(obj.row,obj.con);
                    break;
            }
            if(obj.name==='pawn'&&obj.type==='black'){
                table.rows[obj.row].cells[obj.con].classList.add('active');
                if(obj.row>1)table.rows[obj.row-1].cells[obj.con].classList.add('active');
            } 
            
            if(obj.name==='pawn'&&obj.type==='White'){
                table.rows[obj.row].cells[obj.con].classList.add('active');
                if(obj.row<8)table.rows[obj.row+1].cells[obj.con].classList.add('active');
            }


        }

    }


}



//side selections
function sides(row, con) {
    for (let i = 1; i < 9; i++) {
        table.rows[row].cells[i].classList.add('active');
        table.rows[i].cells[con].classList.add('active');
    }
}
//slants selections
function slants(row, con) {
    let x = (con);
    let y = (row);

    while (y > 0 && x < 9) {

        table.rows[y].cells[x].classList.add('active');
        x++;
        y--;
    }
    x = con;
    y = row;
    while (y > 0 && x > 0) {

        table.rows[y].cells[x].classList.add('active');
        x--;
        y--;
    }
    x = con;
    y = row;
    while (y < 9 && x < 9) {

        table.rows[y].cells[x].classList.add('active');
        x++;
        y++;
    }
    x = con;
    y = row;
    while (y < 9 && x > 0) {
       
        table.rows[y].cells[x].classList.add('active');
        x--;
        y++;
    }
}

//i dont know what is that but it works..
function knightMove(row, con){
    let a=false;
    let b=false;
    let c=false;
    let d=false;
    table.rows[row].cells[con].classList.add('active');
    if(con<8){table.rows[row].cells[con+1].classList.add('active');}
    if(con<7){table.rows[row].cells[con+2].classList.add('active');a=true;}
    if(con>1){table.rows[row].cells[con-1].classList.add('active');}
    if(con>2){table.rows[row].cells[con-2].classList.add('active');b=true;}
    if(row<8){table.rows[row+1].cells[con].classList.add('active');}
    if(row<7){table.rows[row+2].cells[con].classList.add('active');c=true;}
    if(row>1){table.rows[row-1].cells[con].classList.add('active');}
    if(row>2){table.rows[row-2].cells[con].classList.add('active');d=true;}
    if(con<8&&d===true)table.rows[row-2].cells[con+1].classList.add('active');
    if(con>1&&d===true)table.rows[row-2].cells[con-1].classList.add('active');
    if(con<8&&c===true)table.rows[row+2].cells[con+1].classList.add('active');
    if(con>1&&c===true)table.rows[row+2].cells[con-1].classList.add('active');
    if(row<8&&a===true)table.rows[row+1].cells[con+2].classList.add('active');
    if(row>1&&a===true)table.rows[row-1].cells[con+2].classList.add('active');
    if(row<8&&b===true)table.rows[row+1].cells[con-2].classList.add('active');
    if(row>1&&b===true)table.rows[row-1].cells[con-2].classList.add('active');

}   


