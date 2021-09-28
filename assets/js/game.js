document.getElementById("start-button").addEventListener("click", createGrids);
document.getElementById("right-button").addEventListener("click", moveShipRight);
document.getElementById("left-button").addEventListener("click", moveShipLeft);
document.getElementById("shoot-button").addEventListener("click", shootRocket);
window.addEventListener("keydown", gameButtons);
window.addEventListener("keyup", clearMovementInterval);

// Set Aliens global variables
var aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
];

// Game control, so buttons don't give errors
var gameActive = false;

// Set current position global variable
var currentPosition = 21;

// Unused cells, so ship and rockets don't move in them
var unusedCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 
    16, 17, 18, 19, 20, 380, 399];

// Interval ID to be able to clear the movement interval in future functions
var intervalID = null;

// Global variables needed for functions to communicate
var movement = "right";
var movesLeft = 0;
var rightMoves = 0;
var leftMoves = 0;

// Global variable for ship position
var shipPosition = 390;

// Global variable to control rocket fire
var rocketCanFire = true;
var waitingForInterval = false;

// Global interval IDs for keyboard buttons
var moveRightInterval = null;
var shipMovingRight = false;
var moveLeftInterval = null;
var shipMovingLeft = false;
var shipShootingInterval = null;
var shipShooting = false;

// Global score variables
var score = 0;
var difficultyScore = 0;
var shootingRate = 1500;

/**
 * Calculates if there are destroyed columns in aliens array to the right, so it can add more moves.
 */
function rightMovesAllRows() {
    let aliensRow1 = aliens.slice(0, 12);
    let aliensReverse1 = aliensRow1.slice().reverse();
    let aliensRow2 = aliens.slice(12, 24);
    let aliensReverse2 = aliensRow2.slice().reverse();
    let aliensRow3 = aliens.slice(24, 36);
    let aliensReverse3 = aliensRow3.slice().reverse();
    rightMoves = 0;

    for (let i = 0; i < 12; i++) {
        if (aliensReverse1[i] === 0 && aliensReverse2[i] === 0 && aliensReverse3[i] === 0) {
            rightMoves++;
        } else {
            break;
        }
    }

    return rightMoves + 6 + leftMoves;
}

/**
 * Calculates if there are destroyed columns in aliens array to the right, so it can add more moves.
 */
function leftMovesAllRows() {
    let aliensRow1 = aliens.slice(0, 12);
    let aliensRow2 = aliens.slice(12, 24);
    let aliensRow3 = aliens.slice(24, 36);
    leftMoves = 0;

    for (let i = 0; i < 12; i++) {
        if (aliensRow1[i] === 0 && aliensRow2[i] === 0 && aliensRow3[i] === 0) {
            leftMoves++;
        } else {
            break;
        }
    }

    return leftMoves + 6 + rightMoves;
}

/**
 * Creates the grids in the HTML file.
 * They are created in JS so the HTML file is cleaner and faster to load.
 */
function createGrids() {
    gameActive = true;
    for (let x = 0; x < 400; x++) {
        let gridCellCreator = document.createElement("div");
        gridCellCreator.classList.add("empty-cell");
        if (unusedCells.includes(x)) {
        gridCellCreator.classList.add("unused-cell");
        }
        document.getElementById("game-area").appendChild(gridCellCreator);
    }

    positionAliens();
    

    // Position spaceship
    let gridCell = document.getElementsByClassName("empty-cell");
    gridCell[shipPosition].classList.add("spaceship");

    // Start rocket positioning function
    positionRockets();

    // Start the game
    mainMovement();
}

var gridCell = document.getElementsByClassName("empty-cell");

/**
 * Function to position aliens. It takes the current position variable so it can be called any time.
 */
function positionAliens() {
    for (let alien of aliens) {
        if (alien > 0) {
        gridCell[currentPosition - 1 + alien].classList.add("alien");
        }
    }
}

/** Function to remove all aliens.
 * Used to clear the board any time the aliens move, so it does not have to be declared or calculated.
 */
function removeAliens() {
    for (let i = 0; i < gridCell.length; i++) {
        gridCell[i].classList.remove("alien");
    }
}

/**
 * Movement starting function.
 */
function mainMovement() {
    movesLeft = rightMovesAllRows();
    intervalID = setInterval(moveRight, (1000 - difficultyScore));
}

/**
 * Switches the aliens' movement to the left or right, depending on the current direction (movement variable)
 */
function switchMovement() {
    // Switch the movement after 1 second, so it seems like it never stopped
    if (movement === "right") {
        movement = "left";
        movesLeft = leftMovesAllRows();
        intervalID = setInterval(moveLeft, (1000 - difficultyScore));
    } else {
        movement = "right";
        movesLeft = rightMovesAllRows();
        intervalID = setInterval(moveRight, (1000 - difficultyScore));
    }
}

/**
 * Moves aliens to the right as many times as movesLeft permits.
 * Calls functions to remove all aliens then place them again.
 */
function moveRight() {
    if (movesLeft > 0) {
        currentPosition++;
        removeAliens();
        positionAliens();
        movesLeft -= 1;
    } else {
        clearInterval(intervalID);
        moveDown();
    }
}

/**
 * Moves aliens to the left as many times as movesLeft permits.
 * Calls functions to remove all aliens then place them again.
 */
function moveLeft() {
    if (movesLeft > 0) {
        currentPosition -= 1;
        removeAliens();
        positionAliens();
        movesLeft -= 1;
    } else {
        clearInterval(intervalID);
        moveDown();
    }
}


/**
 * Checks if Aliens can move down or it's game over.
 * Moves aliens down once.
 * Removes the aliens, places them again to the correct cells and then switches the movement.
 */
function moveDown() {
    if (gameActive) {
        for (let x = 360; x < 380; x++) {
            if (gridCell[x].classList.contains("alien")) {
                gameOver();
            }
        }
        currentPosition += 20;
        removeAliens();
        positionAliens();
        switchMovement();
    }
}


/**
 * Moves spaceship to the right by adding the class name 
 * to the next element and removing it from the current one.
 */
function moveShipRight() {
    if (gameActive) {
        if (!gridCell[shipPosition + 1].classList.contains("unused-cell")) {
            gridCell[shipPosition + 1].classList.add("spaceship");
            gridCell[shipPosition].classList.remove("spaceship");
            shipPosition++;
        }
    }
}

/**
 * Moves spaceship to the left by adding the class name 
 * to the previous element and removing it from the current one.
 */
function moveShipLeft() {
    if (gameActive) {
        if (!gridCell[shipPosition - 1].classList.contains("unused-cell")) {
            gridCell[shipPosition - 1].classList.add("spaceship");
            gridCell[shipPosition].classList.remove("spaceship");
            shipPosition--;
        }
    }
}

/**
 * Adds a rocket in front of the spaceship (20 cells before it)
 */
function shootRocket() {
    if (gameActive) {
        if (rocketCanFire === true) {
            gridCell[shipPosition - 20].classList.add("rocket");
            rocketCanFire = false;
            waitingForInterval = false;
            rocketTimer();
        } 
    }
}

/**
 * Controls rocket firing rate. Change timeout ms to change firing rate.
 */
function rocketTimer() {
    if (!rocketCanFire) {
        setTimeout(() => {
            rocketCanFire = true;
            waitingForInterval = true;
        }, shootingRate); //Controls how frequently rockets can be fired
    }
}

/**
 * Rocket positioning function. Works in tandem with moveRocket()
 */
function positionRockets() {
    let rocketCell = document.getElementsByClassName("rocket");
    let indexNum = 0;
    let rocketIndex = [];

    // Calculate as many rockets as needed
    for (let i = 0; i < gridCell.length; i++) {
        for (let x = 0; x < rocketCell.length; x++) {
            if (gridCell[i] == rocketCell[x]) {
                rocketIndex.push(indexNum);
            }
        }
        indexNum++;
    }
    setTimeout(moveRocket(rocketIndex), 250); 
}

/**
 * Makes all rockets either move up one space or disappear.
 */
function moveRocket(rockets) {
    let cellNum = 0;
    for (let i = 0; i < rockets.length; i++) {
        cellNum = rockets[i];
        if (gridCell[cellNum].classList.contains("alien")) {
            cellNum = cellNum + 20;
            explodeAlien(cellNum);
        } else if (gridCell[cellNum - 20].classList.contains("alien")) {
            explodeAlien(cellNum);
        } else if (gridCell[cellNum - 20].classList.contains("unused-cell")) {
            gridCell[cellNum].classList.remove("rocket");
        } else if (gridCell[cellNum - 20].classList.contains("empty-cell")) {
            gridCell[cellNum].classList.remove("rocket");
            gridCell[cellNum - 20].classList.add("rocket");
        }
    }
    setTimeout(positionRockets, 250); // Change timeout for rocket speed
}

/**
 * Moving and shooting functions for keyboard events.
 * Variables provide the functionality to shoot while moving 
 * and also stop the ship from moving in 2 directions at the same time.
 */
function gameButtons(e) {
    if (gameActive) {
        if (e.key === "ArrowRight" && !shipMovingRight && !shipMovingLeft) {
            setTimeout(moveShipRight, 10);
            moveRightInterval = setInterval(moveShipRight, 100);
            shipMovingRight = true;
    
            document.getElementById("right-button").innerHTML = `<i class="fas fa-caret-square-right"></i>`;
            document.getElementById("right-button").style.background = "radial-gradient(closest-side, red, transparent)";
        } else if (e.key === "ArrowLeft" && !shipMovingLeft && !shipMovingRight) {
            setTimeout(moveShipLeft, 10);
            moveLeftInterval = setInterval(moveShipLeft, 100);
            shipMovingLeft = true;
    
            document.getElementById("left-button").innerHTML = `<i class="fas fa-caret-square-left"></i>`;
            document.getElementById("left-button").style.background = "radial-gradient(closest-side, red, transparent)";
        } else if (e.key === "Control" && !shipShooting) {
            shootRocket();
            shipShootingInterval = setInterval(shootRocket, 1);
            shipShooting = true;
    
            document.getElementById("shoot-button").style.background = "radial-gradient(closest-side, red, transparent)";
        }
    }
}

/**
 * Clears interval from gameButtons() function when they keys are released
 */
function clearMovementInterval(e) {
    if (gameActive) {
        if (e.key === "ArrowRight") {
            shipMovingRight = false;
            clearInterval(moveRightInterval);
            document.getElementById("right-button").innerHTML = `<i class="far fa-caret-square-right"></i>`;
            document.getElementById("right-button").style.color = "inherit";
            document.getElementById("right-button").style.background = "inherit";
        } else if (e.key === "ArrowLeft") {
            shipMovingLeft = false;
            clearInterval(moveLeftInterval);
            document.getElementById("left-button").innerHTML = `<i class="far fa-caret-square-left"></i>`;
            document.getElementById("left-button").style.color = "inherit";
            document.getElementById("left-button").style.background = "inherit";
        } else if (e.key === "Control") {
            shipShooting = false;
            clearInterval(shipShootingInterval);
            document.getElementById("shoot-button").style.color = "inherit";
            document.getElementById("shoot-button").style.background = "inherit";
        }
    }
}

/**
 * Gets the cell number of the rocket and calculates the array index to change to 0.
 * Adds the "boom" class for 100ms, to give the effect of an explosion.
 */
function explodeAlien(cellNum) {
    let arrayIndex = aliens.indexOf(cellNum - 19 - currentPosition);
    gridCell[cellNum].classList.remove("rocket");
    gridCell[cellNum + 20].classList.remove("rocket");
    gridCell[cellNum - 20].classList.remove("rocket");
    gridCell[cellNum - 20].classList.remove("alien");
    gridCell[cellNum - 20].classList.add("boom");
    aliens[arrayIndex] = 0;
    scoreIncrease();
    setTimeout(() => {gridCell[cellNum - 20].classList.remove("boom");}, 50);
}

/**
 * Increases score and checks for victory or defeat.
 */
function scoreIncrease() {
    switch (difficultyScore) {
        case 0:
            score += 10;
            break;
        case 150:
            score += 15;
            break;
        case 400:
            score += 20;
            break;
        case 600:
            score += 25;
            break;
        case 700:
            score += 30;
            break;
    }
    document.getElementById("score").innerHTML = `${score}`;
    document.getElementById("scoreboard").classList.add("score-increase");
    setTimeout(() => {document.getElementById("scoreboard").classList.remove("score-increase");}, 500);
    if (aliens.every(checkAliens)) {
        victory();
    }
}

/**
 * Resets aliens and currentPosition. Makes ship shoot faster. Increases difficulty. 
 */
function victory() {
    aliens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
    switch (shootingRate) {
        case 1500:
            shootingRate = 1250;
            difficultyScore = 150;
            break;
        case 1250:
            shootingRate = 1000;
            difficultyScore = 400;
            break;
        case 1000:
            shootingRate = 750;
            difficultyScore = 600;
            break;
        case 750:
            shootingRate = 550;
            difficultyScore = 700;
            break;
    }
    currentPosition = 21;

    movement = "right";
    movesLeft = 0;
    rightMoves = 0;
    leftMoves = 0;
    clearInterval(intervalID);
    positionAliens();
    mainMovement();
}

/**
 * Removes everything from the grid and replaces it with the game over banner.
 */
function gameOver() {
    gameActive = false;
    document.getElementById("game-area").style.display = "inline";
    document.getElementById("game-area").innerHTML = `<h2 id="game-over-banner">GAME OVER! Score: ${score}</h2>`;
    clearInterval(moveLeftInterval);
    clearInterval(moveRightInterval);
    clearInterval(shipShootingInterval);
    return;
}

function checkAliens(alien) {
    return alien === 0;
}