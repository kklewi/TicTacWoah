let team = Math.floor(Math.random() + 0.5); // 0 is X, 1 is O
let slotContents = new Array(9).fill("");
let boardRows = 3;
let boardCols = 3;

function takeTurn(position){
    // Check that space isn't occupied
    if(slotContents[position] === "") {
        switch (team) {
            case 0:
                team = 1;
                document.getElementById(position).innerText = "X";
                slotContents[position] = "X";
                break;
            case 1:
                team = 0;
                document.getElementById(position).innerText = "O";
                slotContents[position] = "O";
                break;
        }
    }
}

function restart(){
    slotContents.fill("");
    team = Math.floor(Math.random() + 0.5);
    for(let i = 0; i < 9; i++){
        document.getElementById(String(i)).innerText = "";
    }
}

function isWinner(winCondition, currentPosition){
    //Still need to make win algo
}