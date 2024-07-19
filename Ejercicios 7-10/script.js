//Ejercicio 7

document.addEventListener('DOMContentLoaded', (event) => {
  if (document.getElementById('potenciaForm')) {
    document.getElementById('potenciaForm').addEventListener('submit', function(event) {
      event.preventDefault();
      calcularPotencia();
    });
  }
  if (document.getElementById('dniForm')) {
    document.getElementById('dniForm').addEventListener('submit', function(event) {
      event.preventDefault();
      validarDNI();
    });
  }
});

function calcularPotencia() {
  const base = parseFloat(document.getElementById('base').value);
  const exponente = parseFloat(document.getElementById('exponente').value);

  if (isNaN(base) || isNaN(exponente)) {
    alert('Por favor, introduce números válidos.');
    return;
  }

  let resultado = 1;
  for (let i = 0; i < exponente; i++) {
    resultado *= base;
  }

  if (exponente < 0) {
    resultado = 1 / resultado;
  }

  document.getElementById('resultado').textContent = resultado;
}


//Ejericico 8

document.addEventListener('DOMContentLoaded', () => {
  const dniForm = document.getElementById('dniForm');
  if (dniForm) {
    dniForm.addEventListener('submit', function(event) {
      event.preventDefault();
      validarDNI();
    });
  }
});

function validarDNI() {
  const dni = document.getElementById('dni').value;
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

  if (!/^\d{8}[A-Z]$/.test(dni)) {
    alert('Formato de DNI no válido. Debe tener 8 números y una letra al final.');
    return;
  }

  const numero = parseInt(dni.slice(0, 8));
  const letra = dni.charAt(8);
  const resto = numero % 23;
  const letraCorrecta = letras.charAt(resto);

  if (letra === letraCorrecta) {
    document.getElementById('resultado').textContent = 'El DNI es válido.';
  } else {
    document.getElementById('resultado').textContent = 'El DNI no es válido.';
  }
}

//Ejercicio 9.1

function cambiarColor(color) {
  document.body.style.backgroundColor = color;
}

//Ejercicio 9.2

function cambiarColor(color) {
  const target = document.querySelector('input[name="colorTarget"]:checked').value;
  
  if (target === 'document') {
    document.body.style.backgroundColor = color;
  } else {
    document.getElementById('colorLayer').style.backgroundColor = color;
  }
}


//Ejercicio 9.3 - Versión con campos de texto y write

document.addEventListener('DOMContentLoaded', () => {
  const diasForm = document.getElementById('diasForm');
  if (diasForm) {
    diasForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const edad = document.getElementById('edad').value;
      const diasVividos = edad * 365;
      document.getElementById('resultado').textContent = `${nombre}, has vivido aproximadamente ${diasVividos} días.`;
    });
  }
});

//Ejercicio 9.4

function cambiarImagen() {
  const select = document.getElementById('imagenSelect');
  const imagen = document.getElementById('imagen');
  imagen.src = select.value;
}

//Ejercicio 9.5
const limite = 1000;
const numero = 23;

let suma = 0;
let resultado = `<div class="columns">`;

for (let i = numero; i < limite; i += numero) {
    resultado += `<div class="column-item">${i}</div>`;
    suma += i; // Acumular la suma correctamente
}

resultado += `<div class="column-item">Suma de los múltiplos: ${suma}</div>`;
resultado += `</div>`;

document.getElementById('output').innerHTML = resultado;


//Ejercicio 10
const words = ['ejemplo', 'computadora', 'programacion', 'javascript', 'desarrollador'];
let word = '';
let displayWord = '';
let wrongGuesses = 0;
const maxWrongGuesses = 7;
let guessedLetters = [];

document.addEventListener('DOMContentLoaded', () => {
  const wordDisplay = document.getElementById('word-display');
  const message = document.getElementById('message');
  const guessInput = document.getElementById('guess-input');
  const guessButton = document.getElementById('guess-button');
  const resetButton = document.getElementById('reset-button');
  const hangmanImage = document.getElementById('hangman-image');

  function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    displayWord = '_'.repeat(word.length);
    wrongGuesses = 0;
    guessedLetters = [];
    updateDisplay();
    message.textContent = '';
    guessInput.value = '';
    guessInput.focus();
    hangmanImage.innerHTML = `<img src="images/hangman0.png" alt="Hangman">`;
    guessButton.disabled = false;
    resetButton.style.display = 'none';
  }

  function updateDisplay() {
    wordDisplay.textContent = displayWord.split('').join(' ');
    hangmanImage.innerHTML = `<img src="images/hangman${wrongGuesses}.png" alt="Hangman">`;
  }

  function handleGuess() {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 1 || guessedLetters.includes(guess)) {
      return;
    }
    guessedLetters.push(guess);
    if (word.includes(guess)) {
      let newDisplayWord = '';
      for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
          newDisplayWord += word[i];
        } else {
          newDisplayWord += '_';
        }
      }
      displayWord = newDisplayWord;
      if (!displayWord.includes('_')) {
        message.textContent = '¡Ganaste!';
        guessButton.disabled = true;
        resetButton.style.display = 'block';
      }
    } else {
      wrongGuesses++;
      if (wrongGuesses >= maxWrongGuesses) {
        message.textContent = '¡Perdiste! La palabra era: ' + word;
        guessButton.disabled = true;
        resetButton.style.display = 'block';
      }
    }
    updateDisplay();
    guessInput.value = '';
    guessInput.focus();
  }

  guessButton.addEventListener('click', handleGuess);
  resetButton.addEventListener('click', startGame);

  startGame();
});
