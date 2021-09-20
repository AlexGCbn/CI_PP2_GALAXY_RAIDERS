document.getElementById("start-button").addEventListener("click", createGrids)
document.getElementById("right-button").addEventListener("click", moveRight)
document.getElementById("left-button").addEventListener("click", moveLeft)
document.getElementById("down-button").addEventListener("click", moveDown)

// Set Aliens constant
const aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

// Set current position constant
var currentPosition = 21

const unusedCells = [0, 19, 20, 39, 40, 59, 60, 79, 80, 99, 
100, 119, 120, 139, 140, 159, 160, 179,
180, 199, 200, 219, 220, 239, 240, 259, 260, 279, 280, 299, 
300, 319, 320, 339, 340, 359, 360, 379,
380, 399]

var movement = "right"

var totalMoves = 6

// Interval ID to be able to clear the movement interval in future functions
var intervalID = null;

/**
 * Creates the grids in the HTML file.
 * They are created in JS so the HTML file is cleaner and faster to load.
 */
function createGrids() {
    for (let x = 0; x < 400; x++) {
        let gridCell = document.createElement("div")
        gridCell.classList.add("empty-cell")
        if (unusedCells.includes(x)) {
        gridCell.classList.add("unused-cell")
        }
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

/**
 * Move right function
 */
function moveRight() {
    let gridCell = document.getElementsByClassName("empty-cell")

    // Check whether the next (right) cell is the last cell (unused) so aliens can stop moving
    let lastCell1 = gridCell[currentPosition + 11].nextElementSibling.classList.contains("unused-cell")
    let lastCell2 = gridCell[currentPosition + 31].nextElementSibling.classList.contains("unused-cell")
    let lastCell3 = gridCell[currentPosition + 51].nextElementSibling.classList.contains("unused-cell")
    
    if (lastCell1 === false || lastCell2 === false || lastCell3 === false) {
        let gridCell = document.getElementsByClassName("empty-cell")
        currentPosition += 1
        positionAliens()
        gridCell[currentPosition - 1].classList.remove("alien")
        gridCell[currentPosition + 19].classList.remove("alien")
        gridCell[currentPosition + 39].classList.remove("alien")
    } else {
        moveDown()
    } 
}

function moveLeft() {
    let gridCell = document.getElementsByClassName("empty-cell")

    // Check whether the next (left) cell is the last cell (unused) so aliens can stop moving
    let lastCell1 = gridCell[currentPosition].previousElementSibling.classList.contains("unused-cell")
    let lastCell2 = gridCell[currentPosition + 20].previousElementSibling.classList.contains("unused-cell")
    let lastCell3 = gridCell[currentPosition + 40].previousElementSibling.classList.contains("unused-cell")
    
    if (lastCell1 === false || lastCell2 === false || lastCell3 === false) {
        let gridCell = document.getElementsByClassName("empty-cell")
        currentPosition -= 1
        positionAliens()
        gridCell[currentPosition + 12].classList.remove("alien")
        gridCell[currentPosition + 32].classList.remove("alien")
        gridCell[currentPosition + 52].classList.remove("alien")
    } else {
        moveDown()
    }
}

function moveDown() {
    let gridCell = document.getElementsByClassName("empty-cell")
    
    for (let i = 0; i < 12; i++) {
        gridCell[currentPosition + i].classList.remove("alien")
    }

    currentPosition += 20
    positionAliens()

    // Switch the movement after 1 second, so it seems like it never stopped
    if (movement === "right") {
        clearInterval(intervalID)
        intervalID = setInterval(moveLeft, 1000)
        movement = "left"
    } else {
        clearInterval(intervalID)
        intervalID = setInterval(moveRight, 1000)
        movement = "right"
    }
}
