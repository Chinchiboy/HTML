const palabras = ['teclado', 'pantalla', 'programa', 'software', 'internet'];
let palabraElegida = '';
let palabraMostrada = '';
let errores = 0;
const maxErrores = 6;
let letrasIncorrectas = [];

function seleccionarPalabra() {
  palabraElegida = palabras[Math.floor(Math.random() * palabras.length)];
  palabraMostrada = '_'.repeat(palabraElegida.length);
  document.getElementById('wordDisplay').textContent = palabraMostrada.split('').join(' ');
  document.getElementById('message').textContent = '';
  document.getElementById('letterInput').value = '';
  document.getElementById('restartButton').style.display = 'none';
  document.getElementById('checkButton').disabled = false;
  errores = 0;
  letrasIncorrectas = [];
  document.getElementById('incorrectLetters').textContent = '';
  actualizarImagen();
}

function comprobarLetra() {
  const letra = document.getElementById('letterInput').value.toLowerCase();
  if (!letra || letra.length !== 1 || palabraMostrada.includes(letra) || letrasIncorrectas.includes(letra)) {
    return;
  }

  if (palabraElegida.includes(letra)) {
    let nuevaPalabraMostrada = palabraMostrada.split('');
    for (let i = 0; i < palabraElegida.length; i++) {
      if (palabraElegida[i] === letra) {
        nuevaPalabraMostrada[i] = letra;
      }
    }
    palabraMostrada = nuevaPalabraMostrada.join('');
    document.getElementById('wordDisplay').textContent = palabraMostrada.split('').join(' ');

    if (palabraMostrada === palabraElegida) {
      document.getElementById('message').textContent = '¡Ganaste! La palabra era ' + palabraElegida;
      document.getElementById('checkButton').disabled = true;
      document.getElementById('restartButton').style.display = 'block';
    }
  } else {
    letrasIncorrectas.push(letra);
    errores++;
    actualizarImagen();
    document.getElementById('incorrectLetters').textContent = 'Letras incorrectas: ' + letrasIncorrectas.join(', ');
    if (errores >= maxErrores) {
      document.getElementById('message').textContent = 'Perdiste. La palabra era ' + palabraElegida;
      document.getElementById('checkButton').disabled = true;
      document.getElementById('restartButton').style.display = 'block';
    }
  }
  document.getElementById('letterInput').value = '';
}

function actualizarImagen() {
  document.getElementById('hangmanImage').src = `img/Ahorcado${errores}.jpg`;
}

document.addEventListener('DOMContentLoaded', function () {
  const checkButton = document.getElementById('checkButton');
  const restartButton = document.getElementById('restartButton');

  if (checkButton && restartButton) {
    checkButton.addEventListener('click', comprobarLetra);
    restartButton.addEventListener('click', seleccionarPalabra);
    seleccionarPalabra();
  }
});
