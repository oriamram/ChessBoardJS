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

//creates all of the board includes the Numbers and Chars on the sides
for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (let j = 0; j < 10; j++) {
        if (i === 0) {
            const th = document.createElement('th');
            tr.appendChild(th);
            tr.className = 'head';
            th.innerText = arrCharsU[j];
        }
        else if (j === 0) {
            const th = document.createElement('th');
            tr.appendChild(th);
            th.innerText = arrNumsU[i];
            th.className = 'sides';
        }
        else if (j === 9) {
            const th = document.createElement('th');
            tr.appendChild(th);
            th.innerText = arrNums[i];
            th.className = 'sides';
        }
        else if (i === 9) {
            const th = document.createElement('th');
            tr.appendChild(th);
            th.innerText = arrChars[j];
            tr.className = 'head';
        }
        else if ((i+j) % 2 !== 0) {
            const tdBlack = document.createElement('td');
            tr.appendChild(tdBlack);
            tdBlack.className = 'black';
            tdBlack.id=(i+'_'+j);
        } else {
            const tdWhite = document.createElement('td');
            tr.appendChild(tdWhite);
            tdWhite.id=(i+'_'+j);
        }
    }
}
///////////////////////////////////////////////////////////////////
//creating and positioning all the pions Black
 const kingBlack = document.createElement('img');
 kingBlack.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png';
 document.getElementById('8_4').appendChild(kingBlack);
 const queenBlack = document.createElement('img');
 queenBlack.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png';
 document.getElementById('8_5').appendChild(queenBlack);
 
 const rook1Black = document.createElement('img');
 rook1Black.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png';
 document.getElementById('8_1').appendChild(rook1Black);
 const rook2Black = document.createElement('img');
 rook2Black.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png';
 document.getElementById('8_8').appendChild(rook2Black);

 const bishop1Black = document.createElement('img');
 bishop1Black.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png';
 document.getElementById('8_2').appendChild(bishop1Black);
 const bishop2Black = document.createElement('img');
 bishop2Black.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png';
 document.getElementById('8_7').appendChild(bishop2Black);

 const knight1Black = document.createElement('img');
 knight1Black.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png';
 document.getElementById('8_3').appendChild(knight1Black);
 const knight2Black = document.createElement('img');
 knight2Black.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png';
 document.getElementById('8_6').appendChild(knight2Black);
 //creates arry of pawns
 const pawnsBlack=['1','2','3','4','5','6','7','8']
 for(let i=1;i<=8;i++){
    pawnsBlack[i-1] = document.createElement('img');
    pawnsBlack[i-1].src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png';
    document.getElementById('7_'+i).appendChild(pawnsBlack[i-1]);

 }

//creating and positioning all the pions White
 const kingWhite = document.createElement('img');
 kingWhite.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Chess_flt45.svg/45px-Chess_flt45.svg.png';
 document.getElementById('1_4').appendChild(kingWhite);
 const queenWhite = document.createElement('img');
 queenWhite.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_glt45.svg/45px-Chess_glt45.svg.png';
 document.getElementById('1_5').appendChild(queenWhite);
 
 const rook1White = document.createElement('img');
 rook1White.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Chess_mlt45.svg/45px-Chess_mlt45.svg.png';
 document.getElementById('1_1').appendChild(rook1White);
 const rook2White = document.createElement('img');
 rook2White.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Chess_mlt45.svg/45px-Chess_mlt45.svg.png';
 document.getElementById('1_8').appendChild(rook2White);

 const bishop1White = document.createElement('img');
 bishop1White.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Chess_elt45.svg/45px-Chess_elt45.svg.png';
 document.getElementById('1_2').appendChild(bishop1White);
 const bishop2White = document.createElement('img');
 bishop2White.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Chess_elt45.svg/45px-Chess_elt45.svg.png';
 document.getElementById('1_7').appendChild(bishop2White);

 const knight1White = document.createElement('img');
 knight1White.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Chess_Nlt45.svg/45px-Chess_Nlt45.svg.png';
 document.getElementById('1_3').appendChild(knight1White);
 const knight2White = document.createElement('img');
 knight2White.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Chess_Nlt45.svg/45px-Chess_Nlt45.svg.png';
 document.getElementById('1_6').appendChild(knight2White);
 //creates arry of pawns
 const pawnsWhite=['1','2','3','4','5','6','7','8']
 for(let i=1;i<=8;i++){
    pawnsWhite[i-1] = document.createElement('img');
    pawnsWhite[i-1].src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Chess_hlt45.svg/45px-Chess_hlt45.svg.png';
    document.getElementById('2_'+i).appendChild(pawnsWhite[i-1]);

 }