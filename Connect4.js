const grid = document.querySelector(".grid");
let table = new Array(7);
let piecesCnt = 0, end = false;
let colLevel = new Array(8);
colLevel.fill(0);

createTable();

//We create the game table
function createTable() {
    for (let i = 1; i < table.length; ++i) {
        table[i] = new Array(8);
    }
    for (let i = 1; i < table.length; ++i) {
        const row = document.createElement("tr");
        for (let j = 1; j < table[i].length; ++j) {
            table[i][j] = document.createElement("td");
            table[i][j].onclick = function() {addPiece(j)};
            row.appendChild(table[i][j]);
        }
        grid.prepend(row);
    }
}

function addPiece(y) {
    if (!end && colLevel[y] < 6) {
        ++piecesCnt;
        ++colLevel[y];
        if (piecesCnt % 2 != 0) {
            table[colLevel[y]][y].setAttribute("id", "red");
        } else {
            table[colLevel[y]][y].setAttribute("id", "yellow");
        }
        if (piecesCnt === 42) {
            end = true;
        }
    }   
}
