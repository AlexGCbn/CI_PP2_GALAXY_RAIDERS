document.getElementById("start-button").addEventListener("click", createGrids)

/**
 * Creates the grids in the HTML file, for the game-area.
 * They are created in JS so the HTML file is cleaner and faster to load.
 * In the If statement we declare the starting positions for our aliens.
 */
function createGrids() {
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
            
            if (y >= 1 && y <=12 && x >=1 && x <=3) {
                document.getElementById("game-area").innerHTML += 
                `<div id="col${x}row${y}" class="alien"></div>
                `
            } else {
            document.getElementById("game-area").innerHTML += 
            `<div id="col${x}row${y}"></div>
            `
            }
        }
    }
    alienMove()
}

function alienMove() {
    let alienPositions = document.getElementsByClassName("alien")
    console.log(alienPositions)

    let direction = "right"

    if (direction === "right") {
        for (let i = 0; i < alienPositions.length; i++){
            console.log(alienPositions[i].id)
        }
    }
}