const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const restartBtn = document.getElementById('resetBtn')
const gameHistory = document.getElementById('gameHistory')
const previous = document.getElementById('previous')
const next = document.getElementById('next')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const turnIndicator = document.querySelector('#turnIndicator');
let circleTurn
let newGame = true
let boardArray = [];
let previousMoveArray = []
const turnX = document.getElementById('X');
const turnO = document.getElementById('O');
const turnContainer = document.getElementById('turnContainer');
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


//Run startGame Function
startGame()


//Restart Button while playing
restartBtn.addEventListener('click', function(){ 
  turnIndicator.style.visibility="visible";
  if (previous.style.visibility== "visible")
{
  window.location.reload()
}
else{
  startGame()
}
    if(turnIndicator.textContent=="X's Turn")
       {
           circleTurn = false
       }
     else{
          circleTurn = true
         } 

})

//History Button
gameHistory.addEventListener('click', function(){
 previous.style.visibility= "visible";
 next.style.visibility= "visible";
 winningMessageElement.style.display="none"
 board.style.visibility = "visible";
 turnIndicator.style.visibility="visible";
 restartBtn.style.visibility="visible";
})


//Restart Button after game
restartButton.addEventListener('click', function(){
  window.location.reload()
})
if (startGame) {
  turnIndicator.style.visibility="hidden";
  turnContainer.style.display = "flex";
  board.style.visibility = "hidden";
  restartBtn.style.visibility="hidden"
} else {
  turnContainer.style.display = "none";
  board.style.visibility = "visible";
}

//X turn first
turnX.addEventListener('click', function() {
  newGame = false;
  turnIndicator.style.visibility="visible";
  turnIndicator.textContent = `X's Turn`;
  turnContainer.style.display = "none";
  board.style.visibility = "visible";
  restartBtn.style.visibility="visible"

})

//O turn first
turnO.addEventListener('click', function() {
  newGame = false;
  turnIndicator.style.visibility="visible";
  turnIndicator.textContent = `O's Turn`;
  swapTurns()
  setBoardHoverClass()
  turnContainer.style.display = "none";
  board.style.visibility = "visible";
  restartBtn.style.visibility="visible"
})


//Start Game Function
function startGame() {
  if(turnIndicator.textContent=="X's Turn")
  {
    circleTurn = false
  }
  else{
    circleTurn = true
  }
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
 
}

//Clicking a Target in Board
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  if(currentClass == CIRCLE_CLASS){
    turnIndicator.textContent = `X's Turn`;
}
else{
  turnIndicator.textContent = `O's Turn`;
  
}
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

//Modal for endGame 
function endGame(draw) {
  restartBtn.style.visibility="hidden";
  turnIndicator.style.visibility="hidden";
  board.style.visibility = "hidden";
  if (draw) {
    winningMessageTextElement.innerText = "It's a Tie!"
    turnIndicator.textContent = `It's a Tie!`
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
    turnIndicator.innerText = `${circleTurn ? "O" : "X"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

//Function if Draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}


//function for placing marks and saving in array
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
   let saveMove = {}
    saveMove.cell = cell;
    saveMove.cellClass = currentClass;
    boardArray.push(saveMove)
    console.log(boardArray)
    console.log('boardArray',saveMove)
}

//Swaping of Turns
function swapTurns() {
  circleTurn = !circleTurn
}

//Hover for target
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

//Check Win 
function checkWin(currentClass) {
  const isWin =  WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
  if (isWin) {
    cellElements.forEach((element) =>
      element.removeEventListener("click", handleClick)
    );
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    return true;
  } else {
    return false;
  }
}
// Previous Button
previous.addEventListener('click', function() {
  next.style.visibility = "visible";
  if (boardArray.length != 0) {
      let lastMove = boardArray[boardArray.length - 1]; 
      console.log('back-boardArray', boardArray)
      previousMoveArray.push(lastMove);
      boardArray.pop();
      lastMove.cell.classList.remove(lastMove.cellClass)
  } else {
      previous.style.visibility = 'hidden';
  }
})

// Next Button
next.addEventListener('click', function() {
  if (previousMoveArray.length != 0) {
      let lastMove = previousMoveArray[previousMoveArray.length - 1];
      boardArray.push(lastMove);        
      previousMoveArray.pop();        
      lastMove.cell.classList.add(lastMove.cellClass)
  } else {
      next.style.visibility = 'hidden';
      previous.style.visibility = 'visible';
  }
})