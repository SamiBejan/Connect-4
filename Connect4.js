const grid = document.querySelector(".grid");
let table = new Array(7);
let piecesCnt = 0, end = false, lineLength = 0, stop = false;
let colLevel = new Array(8);
colLevel.fill(0);
let second = 0, minute = 0;
let winnerPlayer, timer;

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

//we add pieces on the table (red, yellow). The player turn box is also updated
function addPiece(y) {
    if (!end && colLevel[y] < 6) {
        ++piecesCnt;
        ++colLevel[y];
        if (piecesCnt === 1) {
            timer = setInterval(cntTime, 1000);
        }
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

//we check all directions from the new piece position
function checkWinner(x, y) {
    lineLength = 0, stop = false;
    //check down
    if (x >= 4) {
        for (let i = x, j = y; i >= 1 && !stop; --i) {
            calculate(x, y, i, j);
        }
        setTo0();
    }
    //check horizontal
    for (let i = x, j = y; j >= 1 && !stop; --j) {
        calculate(x, y, i, j);
    }
    stop = false;
    for (let i = x, j = y + 1; j <= 7 && !stop; ++j) {
        calculate(x, y, i, j);
    }
    setTo0();
    //check primary diagonal
    for (let i = x, j = y; i <= 6 && j >= 1 && !stop; ++i, --j) {
        calculate(x, y, i, j);
    }
    stop = false;
    for (let i = x - 1, j = y + 1; i >= 1 && j <= 7 && !stop; --i, ++j) {
        calculate(x, y, i, j);
    }
    setTo0();
     //check secondary diagonal
    for (let i = x, j = y; i <= 6 && j <= 7 && !stop; ++i, ++j) {
        calculate(x, y, i, j);
    } 
    stop = false;
    for (let i = x - 1, j = y - 1; i >= 1 && j >= 1 && !stop; --i, --j) {
        calculate(x, y, i, j);
    }
    setTo0();    
}

//We count the number of consecutive cells of the same colour
function calculate(x, y, i, j) {
    if (table[i][j].id === table[x][y].id) {
        ++lineLength;
        table[i][j].classList.add("winner");
        /* if the number is 4 or more, a special colour is given to these cells,
        the winner is registered and the game is finished */
        if (lineLength >= 4) {
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
    } 
    //if we find a cell with a different colour, we stop the counting
    else {
        stop = true;
    }
}

//The countdown is set to 0
function setTo0() {
    lineLength = 0, stop = false;
    let winners = document.getElementsByClassName("winner");
    while(winners.length) {
        winners[0].classList.remove("winner");
    }
}

function cntTime() {
    ++second;
    let prefixMin = "0", prefixSec = "0";
    if (second === 60) {
        second = 0;
        ++minute;
    }
    if (minute >= 10) {
        prefixMin = "";
    }
    if (second >= 10) {
        prefixSec = "";
    }
    document.querySelector(".timer").innerText = prefixMin + minute + ":" + prefixSec + second;
}

//The end game pop-up is displayed -> it contains the winner player, the game time and the start again button
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
