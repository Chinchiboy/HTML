const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `¡${currentPlayer} gana!`;
    gameActive = false;
    restartButton.style.display = 'block';
  } else if (boardState.every(cell => cell)) {
    message.textContent = '¡Empate!';
    gameActive = false;
    restartButton.style.display = 'block';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Turno de ${currentPlayer}`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function restartGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `Turno de ${currentPlayer}`;
  restartButton.style.display = 'none';
}

board.addEventListener('click', handleClick);
restartButton.addEventListener('click', restartGame);

message.textContent = `Turno de ${currentPlayer}`;
