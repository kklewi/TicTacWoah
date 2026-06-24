let winningText = document.getElementById("winning-team");
let winner = localStorage.getItem("winner");

if (winner === "Tie") {
    winningText.classList.add("purple-text");
    document.getElementById("winning-state-text").remove();
    winningText.innerText = winner + ", you're both bad!";
}
else {
    winningText.classList.add(winner === "X" ? "red-text" : "blue-text");
    winningText.innerText = winner;
}