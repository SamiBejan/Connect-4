const grid = document.querySelector(".grid");
let table = new Array(7);
let piecesCnt = 0, end = false;

let colLevel = new Array(8);
colLevel.fill(0);

createTable();

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
        if (piecesCnt >= 7) {
            checkWinner(colLevel[y], y);
        }
    }   
}

function checkWinner(x, y) {
    let lineLength = 0, stop = false;
    //check down
    if (x >= 4) {
        for (let i = x, j = y; i >= 1 && !stop; --i) {
            calculate(i, j);
        }
        setTo0();
    }
    //check left-down
    if (x >= 4 && y >= 4) {
        for (let i = x, j = y; i >= 1 && !stop; --i, --j) {
            calculate(i, j);
        }
        setTo0();
    }
    //check left
    if (y >= 4) {
        for (let i = x, j = y; j >= 1 && !stop; --j) {
            calculate(i, j);
        }
        setTo0();
    }
    //check left-up
    if (x < 4 && y >= 4) {
        for (let i = x, j = y; j >= 1 && !stop; ++i, --j) {
            calculate(i, j);
        }
        setTo0();
    }
    //check right-up
    if (x < 4 && y <= 4) {
        for (let i = x, j = y; j <= 7 && !stop; ++i, ++j) {
            calculate(i, j);
        }
        setTo0();
    }
    //check right
    if (y <= 4) {
        for (let i = x, j = y; j <= 7 && !stop; ++j) {
            calculate(i, j);
        }
        setTo0();
    }
    //check right-down
    if (x >= 4 && y <= 4) {
        for (let i = x, j = y; i >= 1 && !stop; --i, ++j) {
            calculate(i, j);
        }
        setTo0();
    }
    function calculate(i, j) {
        if (table[i][j].id === table[x][y].id) {
            ++lineLength;
            table[i][j].classList.add("winner");
            if (lineLength === 4) {
                let winners = document.getElementsByClassName("winner");
                for (let i = 0; i < winners.length; ++i) {
                    if (winners[i].id === "red") {
                        winners[i].style.background = "#f7575f";
                    } else {
                        winners[i].style.background = "#e0cb26";
                    }
                }
                end = true;
            }
        } else {
            stop = true;
        }
    }
    function setTo0() {
        lineLength = 0, stop = false;
        let winners = document.getElementsByClassName("winner");
        while(winners.length) {
            winners[0].classList.remove("winner");
        }
    }
}
