let winningText = document.getElementById("winning-team");
let winner = localStorage.getItem("winner");


winningText.innerText = winner;
winningText.classList.add(winner === "X" ? "h1-red" : "h1-blue");