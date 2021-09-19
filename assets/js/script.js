document.getElementById("start-button").addEventListener("click", createGrids)

const aliens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42
]

/**
 * Creates the grids in the HTML file.
 * They are created in JS so the HTML file is cleaner and faster to load.
 */
function createGrids() {
    for (let x = 0; x < 400; x++) {
        let gridCell = document.createElement("div")
        document.getElementById("game-area").appendChild(gridCell)
    }
}

