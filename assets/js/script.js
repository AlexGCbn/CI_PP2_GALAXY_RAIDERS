document.getElementById("start-button").addEventListener("click", createGrids)
document.getElementById("right-button").addEventListener("click", moveShipRight)
document.getElementById("left-button").addEventListener("click", moveShipLeft)
document.getElementById("initiate-button").addEventListener("click", mainMovement)

// Set Aliens global variable
var aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

// Set current position global variable
var currentPosition = 21

const unusedCells = [0, 19, 20, 39, 40, 59, 60, 79, 80, 99, 
100, 119, 120, 139, 140, 159, 160, 179,
180, 199, 200, 219, 220, 239, 240, 259, 260, 279, 280, 299, 
300, 319, 320, 339, 340, 359, 360, 379,
380, 399]

var movement = "right"

var movesLeft = 0

/**
 * Cuts the first row of the aliens array and calculates how many moves are on the left and right
 */
function totalMovesRow1() {
    let aliensRow1 = aliens.slice(0, 12)
    let aliensReverse = aliensRow1.slice().reverse()
    let rightMoves = 6
    let leftMoves = 6

    
    for (let alien of aliensRow1) {
        if (alien === 0) {
            leftMoves += 1
        } else {
            break
        }
    }

    for (let neila of aliensReverse) {
        if (neila === 0) {
            rightMoves += 1
        } else {
            break
        }
    }

    if (movement === "right") {
        return rightMoves
    } else {
        return leftMoves
    }
}

/**
 * Cuts the second row of the aliens array and calculates how many moves are on the left and right
 */
function totalMovesRow2() {
    let aliensRow2 = aliens.slice(12, 24)
    let aliensReverse = aliensRow2.slice().reverse()
    let rightMoves = 6
    let leftMoves = 6

    for (let alien of aliensRow2) {
        if (alien === 0) {
            leftMoves += 1
        } else {
            break
        }
    }

    for (let neila of aliensReverse) {
        if (neila === 0) {
            rightMoves += 1
        } else {
            break
        }
    }

    if (movement === "right") {
        return rightMoves
    } else {
        return leftMoves
    }
}

/**
 * Cuts the third row of the aliens array and calculates how many moves are on the left and right
 */
function totalMovesRow3() {
    let aliensRow3 = aliens.slice(24, 36)
    let aliensReverse = aliensRow3.slice().reverse()
    let rightMoves = 6
    let leftMoves = 6

    for (let alien of aliensRow3) {
        if (alien === 0) {
            leftMoves += 1
        } else {
            break
        }
    }

    for (let neila of aliensReverse) {
        if (neila === 0) {
            rightMoves += 1
        } else {
            break
        }
    }

    if (movement === "right") {
        return rightMoves
    } else {
        return leftMoves
    }
}

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
    

    // Position spaceship
    let gridCell = document.getElementsByClassName("empty-cell")
    gridCell[390].classList.add("spaceship")
}

/**
 * Function to position aliens. It takes the current position constant.
 */
function positionAliens() {
    let gridCell = document.getElementsByClassName("empty-cell")
    for (let alien of aliens) {
        if (alien > 0)
        gridCell[currentPosition - 1 + alien].classList.add("alien")
    }
}

function mainMovement() {
    let row1 = totalMovesRow1()
    let row2 = totalMovesRow2()
    let row3 = totalMovesRow3()

    movesLeft = Math.max(row1, row2, row3)
    console.log(movesLeft)
    // This might be the only line needed from this function. We can put it in initialization function
    intervalID = setInterval(moveRight, 1000)
}


function switchMovement() {
    console.log("switching movement!")
    // Switch the movement after 1 second, so it seems like it never stopped
    if (movement === "right") {
        // clearInterval(intervalID)
        movement = "left"
        let row1 = totalMovesRow1()
        let row2 = totalMovesRow2()
        let row3 = totalMovesRow3()
        movesLeft = Math.max(row1, row2, row3)
        console.log("Moves for LEFT =" + movesLeft)
        intervalID = setInterval(moveLeft, 1000)
    } else {
        // clearInterval(intervalID)
        movement = "right"
        let row1 = totalMovesRow1()
        let row2 = totalMovesRow2()
        let row3 = totalMovesRow3()
        movesLeft = Math.max(row1, row2, row3)
        console.log("Moves for RIGHT =" + movesLeft)
        intervalID = setInterval(moveRight, 1000)
    }
}

/**
 * Moves aliens to the right. 
 * Checks the cells on the right to see if the aliens should not move there.
 */
function moveRight() {
    console.log("Moving right!")
    // let gridCell = document.getElementsByClassName("empty-cell")

    // Check whether the next (right) cell is the last cell (unused) so aliens can stop moving
    // let lastCell1 = gridCell[currentPosition + movesLeft].nextElementSibling.classList.contains("unused-cell")
    // let lastCell2 = gridCell[currentPosition + movesLeft].nextElementSibling.classList.contains("unused-cell")
    // let lastCell3 = gridCell[currentPosition + movesLeft].nextElementSibling.classList.contains("unused-cell")
    
    // if (lastCell1 === false || lastCell2 === false || lastCell3 === false) {
    if (movesLeft > 0) {
        console.log(movesLeft)
        let gridCell = document.getElementsByClassName("empty-cell")
        currentPosition += 1
        positionAliens()
        gridCell[currentPosition - 1].classList.remove("alien")
        gridCell[currentPosition + 19].classList.remove("alien")
        gridCell[currentPosition + 39].classList.remove("alien")
        movesLeft -= 1
    } else {
        clearInterval(intervalID)
        moveDown()
    }

    
    // } else {
    //     moveDown()
    // } 
}

/**
 * Moves aliens to the left. 
 * Checks the cells on the left to see if the aliens should not move there.
 */
function moveLeft() {
    console.log("Moving left!")
    // let gridCell = document.getElementsByClassName("empty-cell")

    // // Check whether the next (left) cell is the last cell (unused) so aliens can stop moving
    // let lastCell1 = gridCell[currentPosition - movesLeft].previousElementSibling.classList.contains("unused-cell")
    // let lastCell2 = gridCell[currentPosition - movesLeft].previousElementSibling.classList.contains("unused-cell")
    // let lastCell3 = gridCell[currentPosition - movesLeft].previousElementSibling.classList.contains("unused-cell")
    
    // if (lastCell1 === false || lastCell2 === false || lastCell3 === false) {
    if (movesLeft > 0) {
        console.log(movesLeft)
        let gridCell = document.getElementsByClassName("empty-cell")
        currentPosition -= 1
        positionAliens()
        gridCell[currentPosition + 12].classList.remove("alien")
        gridCell[currentPosition + 32].classList.remove("alien")
        gridCell[currentPosition + 52].classList.remove("alien")
        movesLeft -= 1
    } else {
        clearInterval(intervalID)
        moveDown()
    }
    // } else {
    //     moveDown()
    // }
}


/**
 * Moves aliens down by changing the current position and calling the positionAliens function.
 * It then calls the movement functions in 1 second intervals
 */
function moveDown() {
    console.log("Moving down!")
    let gridCell = document.getElementsByClassName("empty-cell")
    
    for (let i = 0; i < 12; i++) {
        gridCell[currentPosition + i].classList.remove("alien")
    }

    currentPosition += 20
    positionAliens()

    switchMovement()
}


/**
 * Moves spaceship to the right by adding the class name 
 * to the next element and removing it from the current one
 */
function moveShipRight() {
    let shipPosition = document.getElementsByClassName("spaceship")[0];

    if (!shipPosition.nextElementSibling.classList.contains("unused-cell")) {
        shipPosition.nextElementSibling.classList.add("spaceship")
        shipPosition.classList.remove("spaceship")
    }
}

/**
 * Moves spaceship to the left by adding the class name 
 * to the previous element and removing it from the current one
 */
function moveShipLeft() {
    let shipPosition = document.getElementsByClassName("spaceship")[0];

    if (!shipPosition.previousElementSibling.classList.contains("unused-cell")) {
        shipPosition.previousElementSibling.classList.add("spaceship")
        shipPosition.classList.remove("spaceship")
    }
}