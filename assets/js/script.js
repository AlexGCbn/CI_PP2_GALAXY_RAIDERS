document.getElementById("start-button").addEventListener("click", createGrids)
document.getElementById("right-button").addEventListener("click", moveShipRight)
document.getElementById("left-button").addEventListener("click", moveShipLeft)
document.getElementById("initiate-button").addEventListener("click", mainMovement)
document.getElementById("shoot-button").addEventListener("click", shootRocket)

// Set Aliens global variable
var aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

// Set current position global variable
var currentPosition = 21

const unusedCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 
    16, 17, 18, 19, 20, 380, 399]

// Interval ID to be able to clear the movement interval in future functions
var intervalID = null;

// Global variables needed for functions to communicate
var movement = "right"
var movesLeft = 0
var rightMoves = 6
var leftMoves = 6

// Global variable for ship position
var shipPosition = 390

/**
 * Calculates if there are destroyed columns in aliens array to the right, so it can add more moves.
 */
function rightMovesAllRows() {
    let aliensRow1 = aliens.slice(0, 12)
    let aliensReverse1 = aliensRow1.slice().reverse()
    let aliensRow2 = aliens.slice(12, 24)
    let aliensReverse2 = aliensRow2.slice().reverse()
    let aliensRow3 = aliens.slice(24, 36)
    let aliensReverse3 = aliensRow3.slice().reverse()
    rightMoves = leftMoves

    for (let i = 0; i < 12; i++) {
        console.log("Calculating moves...")
        if (aliensReverse1[i] === 0 && aliensReverse2[i] === 0 && aliensReverse3[i] === 0) {
            console.log("+1 moves right!")
            rightMoves++
            console.log(rightMoves)
        } else {
            break
        }
    }

    return rightMoves
}

/**
 * Calculates if there are destroyed columns in aliens array to the right, so it can add more moves.
 */
function leftMovesAllRows() {
    let aliensRow1 = aliens.slice(0, 12)
    let aliensRow2 = aliens.slice(12, 24)
    let aliensRow3 = aliens.slice(24, 36)
    leftMoves = rightMoves

    for (let i = 0; i < 12; i++) {
        if (aliensRow1[i] === 0 && aliensRow2[i] === 0 && aliensRow3[i] === 0) {
            leftMoves++
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
        let gridCellCreator = document.createElement("div")
        gridCellCreator.classList.add("empty-cell")
        if (unusedCells.includes(x)) {
        gridCellCreator.classList.add("unused-cell")
        }
        document.getElementById("game-area").appendChild(gridCellCreator)
    }

    positionAliens()
    

    // Position spaceship
    let gridCell = document.getElementsByClassName("empty-cell")
    gridCell[shipPosition].classList.add("spaceship")

    // Start rocket positioning function
    positionRockets()
}

var gridCell = document.getElementsByClassName("empty-cell")

/**
 * Function to position aliens. It takes the current position variable so it can be called any time.
 */
function positionAliens() {
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
        currentPosition++
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
    // let shipPosition = document.getElementsByClassName("spaceship")[0];

    if (!gridCell[shipPosition + 1].classList.contains("unused-cell")) {
        gridCell[shipPosition + 1].classList.add("spaceship")
        gridCell[shipPosition].classList.remove("spaceship")
        shipPosition++
    }
}

/**
 * Moves spaceship to the left by adding the class name 
 * to the previous element and removing it from the current one.
 */
function moveShipLeft() {
    // let shipPosition = document.getElementsByClassName("spaceship")[0];

    if (!gridCell[shipPosition - 1].classList.contains("unused-cell")) {
        gridCell[shipPosition - 1].classList.add("spaceship")
        gridCell[shipPosition].classList.remove("spaceship")
        shipPosition--
    }
}

function shootRocket() {
    gridCell[shipPosition - 20].classList.add("rocket")
}

function positionRockets() {
    let rocketCell = document.getElementsByClassName("rocket")
    let indexNum = 0
    let rocketIndex = []

    // Calculate as many rockets as needed
    for (let i = 0; i < gridCell.length; i++) {
        for (let x = 0; x < rocketCell.length; x++) {
            if (gridCell[i] == rocketCell[x]) {
                rocketIndex.push(indexNum)
                console.log("ADD MORE ROCKETS")
            }
        }
        indexNum++
    }
    setTimeout(moveRocket(rocketIndex), 250)
}

/**
 * Makes all rockets either move up one space or disappear.
 */
function moveRocket(rockets) {
    let cellNum = 0
    for (let i = 0; i < rockets.length; i++) {
        cellNum = rockets[i]
        console.log(gridCell[cellNum - 20])
        if (gridCell[cellNum - 20].classList.contains("alien")) {
            gridCell[cellNum].classList.remove("rocket")
        } else if (gridCell[cellNum - 20].classList.contains("unused-cell")) {
            gridCell[cellNum].classList.remove("rocket")
        } else if (gridCell[cellNum - 20].classList.contains("empty-cell")) {
            gridCell[cellNum].classList.remove("rocket")
            gridCell[cellNum - 20].classList.add("rocket")
        }
    }
    setTimeout(positionRockets, 250)
}

