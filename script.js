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

//creates all of the board
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
        else if (i % 2 !== 0) {
            const tdBlack = document.createElement('td');
            tr.appendChild(tdBlack);
            tdBlack.className = 'black';
            const tdWhite = document.createElement('td');
            tr.appendChild(tdWhite);
            j++;
        } else {
            const tdWhite = document.createElement('td');
            tr.appendChild(tdWhite);
            const tdBlack = document.createElement('td');
            tr.appendChild(tdBlack);
            tdBlack.className = 'black';
            j++
        }
    }
}
