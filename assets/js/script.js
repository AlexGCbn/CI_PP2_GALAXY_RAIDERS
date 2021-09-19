document.getElementById("start-button").addEventListener("click", createGrids)

// Set Aliens constant
const aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

// Set current position constant
const currentPosition = 21

const unusedCells = [0, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89,
90, 99, 100, 109, 110, 119, 120, 129, 130, 139, 140, 149, 150, 159, 160, 169, 170, 179,
180, 189, 190, 199]

const movement = "right"

const totalMoves = 6

/**
 * Creates the grids in the HTML file.
 * They are created in JS so the HTML file is cleaner and faster to load.
 */
function createGrids() {
    for (let x = 0; x < 400; x++) {
        let gridCell = document.createElement("div")
        gridCell.classList.add("empty-cell")
        document.getElementById("game-area").appendChild(gridCell)
    }
    positionAliens()
}

/**
 * Function to position aliens. It takes the current position constant.
 */
function positionAliens() {
    let gridCell = document.getElementsByClassName("empty-cell")
    for (let alien of aliens) {
        gridCell[currentPosition - 1 + alien].classList.add("alien")
    }
}


function moveRight() {
    let gridCell = document.getElementsByClassName("empty-cell")
    currentPosition += 1;
    positionAliens();
}

function moveLeft() {
    let gridCell = document.getElementsByClassName("empty-cell")
    currentPosition -= 1;
    positionAliens();
}