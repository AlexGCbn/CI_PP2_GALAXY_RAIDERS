document.getElementById("start-button").addEventListener("click", createGrids)
document.getElementById("right-button").addEventListener("click", moveShipRight)
document.getElementById("left-button").addEventListener("click", moveShipLeft)
document.getElementById("initiate-button").addEventListener("click", mainMovement)

// Set Aliens global variable
var aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 0, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 0
]

// Set current position global variable
var currentPosition = 21

const unusedCells = [0, 19, 20, 39, 40, 59, 60, 79, 80, 99, 
100, 119, 120, 139, 140, 159, 160, 179,
180, 199, 200, 219, 220, 239, 240, 259, 260, 279, 280, 299, 
300, 319, 320, 339, 340, 359, 360, 379,
380, 399]

// Interval ID to be able to clear the movement interval in future functions
var intervalID = null;

// Global variables needed for functions to communicate
var movement = "right"
var movesLeft = 0
var rightMoves = 6
var leftMoves = 6

function rightMovesAllRows() {
    let aliensRow1 = aliens.slice(0, 12)
    let aliensReverse1 = aliensRow1.slice().reverse()
    let aliensRow2 = aliens.slice(12, 24)
    let aliensReverse2 = aliensRow2.slice().reverse()
    let aliensRow3 = aliens.slice(24, 36)
    let aliensReverse3 = aliensRow3.slice().reverse()
    rightMoves = 6

    for (let i = 0; i < 12; i++) {
        console.log("Calculating moves...")
        if (aliensReverse1[i] === 0 && aliensReverse2[i] === 0 && aliensReverse3[i] === 0) {
            console.log("+1 moves right!")
            rightMoves += 1
            console.log(rightMoves)
        } else {
            break
        }
    }

    return rightMoves
}

function leftMovesAllRows() {
    let aliensRow1 = aliens.slice(0, 12)
    let aliensRow2 = aliens.slice(12, 24)
    let aliensRow3 = aliens.slice(24, 36)
    leftMoves = rightMoves

    for (let i = 0; i < 12; i++) {
        if (aliensRow1[i] === 0 && aliensRow2[i] === 0 && aliensRow3[i] === 0) {
            leftMoves += 1
        } else {
            break
        }
    }

    return leftMoves
}

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
 * Function to position aliens. It takes the current position variable so it can be called any time.
 */
function positionAliens() {
    let gridCell = document.getElementsByClassName("empty-cell")
    for (let alien of aliens) {
        if (alien > 0) {
        gridCell[currentPosition - 1 + alien].classList.add("alien")
        }
    }
}

/** Function to remove all aliens.
 * Used to clear the board any time the aliens move, so it does not have to be declared or calculated.
 */
function removeAliens() {
    let gridCell = document.getElementsByClassName("empty-cell")
    for (let i = 0; i < gridCell.length; i++) {
        gridCell[i].classList.remove("alien")
    }
}

/**
 * Movement starting function.
 */
function mainMovement() {
    movesLeft = rightMovesAllRows()
    console.log(movesLeft)
    rightMovesAllRows()
    intervalID = setInterval(moveRight, 1000)
}

/**
 * Switches the aliens' movement to the left or right, depending on the current direction (movement variable)
 */
function switchMovement() {
    console.log("switching movement!")
    // Switch the movement after 1 second, so it seems like it never stopped
    if (movement === "right") {
        movement = "left"
        movesLeft = leftMovesAllRows()
        console.log("Moves for LEFT =" + leftMoves)
        intervalID = setInterval(moveLeft, 1000)
    } else {
        movement = "right"
        movesLeft = rightMovesAllRows()
        console.log("Moves for RIGHT =" + rightMoves)
        intervalID = setInterval(moveRight, 1000)
    }
}

/**
 * Moves aliens to the right as many times as movesLeft permits.
 * Calls functions to remove all aliens then place them again.
 */
function moveRight() {
    console.log("Moving right!")

    if (movesLeft > 0) {
        console.log(movesLeft)
        currentPosition += 1
        removeAliens()
        positionAliens()
        movesLeft -= 1
    } else {
        clearInterval(intervalID)
        moveDown()
    }
}

/**
 * Moves aliens to the left as many times as movesLeft permits.
 * Calls functions to remove all aliens then place them again.
 */
function moveLeft() {
    console.log("Moving left!")

    if (movesLeft > 0) {
        console.log(movesLeft)
        currentPosition -= 1
        removeAliens()
        positionAliens()
        movesLeft -= 1
    } else {
        clearInterval(intervalID)
        moveDown()
    }
}


/**
 * Moves aliens down once.
 * Removes the aliens, places them again to the correct cells and then switches the movement.
 */
function moveDown() {
    console.log("Moving down!")

    currentPosition += 20
    removeAliens()
    positionAliens()

    switchMovement()
}


/**
 * Moves spaceship to the right by adding the class name 
 * to the next element and removing it from the current one.
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
 * to the previous element and removing it from the current one.
 */
function moveShipLeft() {
    let shipPosition = document.getElementsByClassName("spaceship")[0];

    if (!shipPosition.previousElementSibling.classList.contains("unused-cell")) {
        shipPosition.previousElementSibling.classList.add("spaceship")
        shipPosition.classList.remove("spaceship")
    }
}