let rowSize = 3;
let colSize = 3;
let winAmount = 3;

document.getElementById("rowSize").addEventListener("input", (e) => {
    document.getElementById("rowSizeCount").innerText = e.target.value;
    rowSize = e.target.value;
    updateWinCondition();}
    )
document.getElementById("colSize").addEventListener("input", (e) => {
    document.getElementById("colSizeCount").innerText = e.target.value;
    colSize = e.target.value;
    updateWinCondition();})
document.getElementById("winAmount").addEventListener("input", (e) => {
    document.getElementById("winAmountCount").innerText = e.target.value;
    winAmount = e.target.value;
    updateWinCondition();})

if(!(localStorage.getItem("rowSize")  == null)){
    rowSize = localStorage.getItem("rowSize");
    document.getElementById("rowSize").value = rowSize;
    document.getElementById("rowSizeCount").innerText = rowSize;

    colSize = localStorage.getItem("colSize");
    document.getElementById("colSize").value = colSize;
    document.getElementById("colSizeCount").innerText = colSize;

    winAmount = localStorage.getItem("winAmount");
    winAmount = Math.min(Math.max(rowSize, colSize), winAmount);
    document.getElementById("winAmount").value = winAmount;
    document.getElementById("winAmountCount").innerText = winAmount;
}

function updateWinCondition() {
    winAmount = Math.min(Math.max(rowSize, colSize), winAmount);
    document.getElementById("winAmountCount").innerText = winAmount;
    document.getElementById("winAmount").value = winAmount;
}

function enter() {
    localStorage.setItem("rowSize", rowSize);
    localStorage.setItem("colSize", colSize);
    localStorage.setItem("winAmount" , winAmount);
    window.location.href = "game.html";
}