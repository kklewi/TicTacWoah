let team = 0; // 0 is x, 1 is o

function takeTurn(position){
    // Check that space isn't occupied
    if(document.getElementById(position).innerText == "") {
        switch (team) {
            case 0:
                team = 1;
                document.getElementById(position).innerText = "X";
                break;
            case 1:
                team = 0;
                document.getElementById(position).innerText = "O";
                break;
        }
    }

}

function isWinner(boardSize){
    
}