document.getElementById("start-button").addEventListener("click", createGrids)

function createGrids() {
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
            document.getElementById("game-area").innerHTML += `<div id="col${x}row${y}"></div>
            `
        }
    }
    console.log(document.getElementById("game-area").innerHTML)
}