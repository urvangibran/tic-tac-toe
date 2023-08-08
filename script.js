const X_btn = document.querySelector('.X');
const O_btn = document.querySelector('.O');
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winning-message')
const restartButton = document.getElementById('restart-button')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const X = 'x'
const O = 'o'
let oTurn
const win_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

startGame()

function removeHoverClass() {
  board.classList.remove(X)
  board.classList.remove(O)
}

function addHoverClass() {
  if (oTurn) {
    board.classList.add(O)
  } else {
    board.classList.add(X)
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function setBoardHoverClass() {
  removeHoverClass()
  addHoverClass()
}

function swapTurns() {
  oTurn = !oTurn
}

X_btn.addEventListener('click', () => {
  // console.log("x");
  oTurn = false
  startGame()
})
O_btn.addEventListener('click', () => {
  // console.log("o");
  oTurn = true
  startGame()
})
restartButton.addEventListener('click', startGame)

function startGame() {
  cellElements.forEach(cell => {
    cell.classList.remove(X)
    cell.classList.remove(O)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(event) {
  const cell = event.target
  const currentClass = oTurn ? O : X
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (checkDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function checkWin(currentClass) {
  // console.log("win");
  return win_combinations.some(combination =>
    combination.every(index => cellElements[index].classList.contains(currentClass))
  );
}

function checkDraw() {
  return [...cellElements].every(cell => cell.classList.contains(X) || cell.classList.contains(O));
}