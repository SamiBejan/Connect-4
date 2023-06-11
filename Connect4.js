const grid = document.querySelector(".grid");
let table = new Array(7);
let piecesCnt = 0, end = false;
let colLevel = new Array(8);
colLevel.fill(0);
let second = 0, minute = 0;
let winnerPlayer;

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
            table[colLevel[y]][y].setAttribute("id", "Player-1");
            document.querySelector(".circle").style.backgroundColor = "yellow";
        } else {
            table[colLevel[y]][y].setAttribute("id", "Player-2");
            document.querySelector(".circle").style.backgroundColor = "red";
        }
        if (piecesCnt >= 7) {
            checkWinner(colLevel[y], y);
        }
        if (piecesCnt === 42) {
            end = true;
            clearInterval(timer);
            setTimeout(endGame, 1000);
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
                    if (winners[i].id === "Player-1") {
                        winners[i].style.background = "#f7575f";
                    } else if (winners[i].id === "Player-2") {
                        winners[i].style.background = "#e0cb26";
                    }
                }
                winnerPlayer = winners[0].id.slice(-1);
                end = true;
                clearInterval(timer);
                setTimeout(endGame, 1000);
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

let timer = setInterval(cntTime, 1000);

function cntTime() {
    ++second;
    let prefixMin = "0", prefixSec = "0";
    if (minute >= 10) {
        prefixMin = "";
    }
    if (second >= 10) {
        prefixSec = "";
    }
    if (second === 60) {
        second = 0;
        ++minute;
    }
    document.querySelector(".timer").innerText = prefixMin + minute + ":" + prefixSec + second;
}

function endGame() {
    document.querySelector(".circle").style.backgroundColor = "transparent";
    document.querySelector(".popup").style.visibility = "visible";
    if (winnerPlayer) {
        document.querySelector(".text").innerText = "Player " + winnerPlayer + " won!  \n \n Total time: " + document.querySelector(".timer").textContent;
    } else {
        document.querySelector(".text").innerText = "It's a draw!  \n \n Total time: " + document.querySelector(".timer").textContent; 
    }
    
}

function startAgain() {
    window.location.reload();
}
