let team = Math.floor(Math.random() + 0.5); // 0 is X, 1 is O
let slotContents = new Array(9).fill("");
let boardRows = 3;
let boardCols = 3;
let winCondition = 3;

/*New, experimental stuff*/
let currentGroupKey = 0;
let verticalGroups = new Map();
let horizontalGroups = new Map();
let topLeftDiagonalGroups = new Map();
let topRightDiagonalGroups = new Map();


/* 0 vertical, 1 is horizontal, 2 is top left diagonal, 3 is top right diagonal
I am going to replace this soon because there has to be a cleaner way to structure this.
I could definitely replace the way the data about the grid is stored into a 2d array
*/

let slotGroups = Array.from({ length: boardRows * boardCols}, () => Array(4).fill(-1))

function takeTurn(position){
    // Check that space isn't occupied
    if(slotContents[position] === "") {
        if (isWinner(winCondition, parseInt(position, 10), team ? "O" : "X")) {
            win();
        }
        else{
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
}

function restart(){
    slotContents.fill("");
    team = Math.floor(Math.random() + 0.5);
    for(let i = 0; i < 9; i++){
        document.getElementById(String(i)).innerText = "";
    }
    currentGroupKey = 0;

    // Reset maps so that new gameplay works
    verticalGroups.clear();
    horizontalGroups.clear();
    topLeftDiagonalGroups.clear();
    topRightDiagonalGroups.clear();
}

function win(){
    localStorage.setItem('winner', team ? "O" : "X")
    window.location.href = 'win.html'
}

/**
 * Checks if the player wins after taking their turn
 * @param {*} winCondition - size in a row required to win
 * @param {*} currentPosition - place the player placed their piece
 * @param {*} teamString - current team in string form 
 * @returns - true for winning, false for not
 */
function isWinner(winCondition, currentPosition, teamString){
    let topPosition = currentPosition - boardCols;
    let bottomPosition = currentPosition + boardCols;

    /* This will become less complex when I switch to a 2d array 
    it just checks if we're on the edge of the board and sets as such so 
    that the calculated value doesn't wrap around when it should be invalid*/
    let leftPosition = currentPosition % boardCols == 0 ? null : currentPosition - 1;
    let rightPosition = (currentPosition - (boardCols - 1)) % boardCols == 0 ?
    null : currentPosition + 1;
    let topLeftPosition = currentPosition % boardCols == 0 ? null : topPosition - 1;
    let topRightPosition = (currentPosition - (boardCols - 1)) % boardCols == 0 ? 
    null : topPosition + 1;
    let bottomLeftPosition = currentPosition % boardCols == 0 ? null : bottomPosition - 1;
    let bottomRightPosition = (currentPosition - (boardCols - 1)) % boardCols == 0 ? 
    null : bottomPosition + 1;

    return isWinnerOnConfig(verticalGroups, 0, topPosition, bottomPosition, currentPosition, teamString) || 
    isWinnerOnConfig(horizontalGroups, 1, leftPosition, rightPosition, currentPosition, teamString) ||
    isWinnerOnConfig(topLeftDiagonalGroups, 2, topLeftPosition, bottomRightPosition, currentPosition, teamString) ||
    isWinnerOnConfig(topRightDiagonalGroups, 3, topRightPosition, bottomLeftPosition, currentPosition, teamString);    
}

/**
 * Checks two positions on either side of the currently placed peice (ex: left/right)
 * to see if the total of the current position (1) and the distance assigned to
 * each of those pieces is greater than or equal to the win condition when combined.
 * 
 * @param {*} configMap - mapGiving group sizes for the corresponding orientation (id, size)
 * @param {*} configInt - the position of the configuration to be able to find the id for 
 * targeted slots
 * @param {*} pos1 - the first config position (ex: top)
 * @param {*} pos2 - the second config position (ex: bottom)
 * @param {*} position - the position that the player placed a peice 
 * @param {*} teamString - the current team's corresponding string
 * @returns - returns the boolean state of the player having won on the given configuration
 */
function isWinnerOnConfig(configMap, configInt, pos1, pos2, position, teamString) {
    let side1 = 0;
    let side2 = 0;

    if (isValidSlot(pos1, teamString)) {
        side1 = configMap.get(slotGroups[pos1][configInt]);
    }
    if (isValidSlot(pos2, teamString)){
        side2 = configMap.get(slotGroups[pos2][configInt]);
    }
    let total = side1 + side2 + 1;
    if(total >= winCondition) {
        return true;
    }
    if (side1 > 0 && side2 > 0) {
        slotGroups[position][configInt] = slotGroups[pos1][configInt];
        slotGroups[pos2][configInt] = slotGroups[pos1][configInt];
        configMap.set(slotGroups[position][configInt], total);
        configMap.set(slotGroups[pos1][configInt], total);
        configMap.set(slotGroups[pos2][configInt], total);
    }
    else if (side1 > 0) {
        slotGroups[position][configInt] = slotGroups[pos1][configInt];
        configMap.set(slotGroups[position][configInt], total);
        configMap.set(slotGroups[pos1][configInt], total);
    }
    else if (side2 > 0) {
        slotGroups[position][configInt] = slotGroups[pos2][configInt];
        configMap.set(slotGroups[position][configInt], total);
        configMap.set(slotGroups[pos2][configInt], total);
    }
    else {
        slotGroups[position][configInt] = currentGroupKey;
        configMap.set(slotGroups[position][configInt], 1)
        currentGroupKey++;
    }
    console.log(configMap)
    return false;
}


function isValidSlot(position, teamString){
    return position != null &&
    position > -1 &&
    position < (boardRows * boardCols) &&
     slotContents[position] === teamString;
}