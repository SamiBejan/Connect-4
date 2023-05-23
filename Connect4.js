const grid = document.querySelector(".grid");
let table = new Array(7);

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
            row.appendChild(table[i][j]);
        }
        grid.prepend(row);
    }
}

