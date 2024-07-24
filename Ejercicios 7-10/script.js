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



//Ejercicio 9.5
const limite = 1000;
const numero = 23;

let suma = 0;
let resultado = `<div class="columns">`;

for (let i = numero; i < limite; i += numero) {
    resultado += `<div class="column-item">${i}</div>`;
    suma += i;
}

resultado += `<div class="column-item">Suma de los múltiplos: ${suma}</div>`;
resultado += `</div>`;

document.getElementById('output').innerHTML = resultado;


// Ejercicio 10
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
      document.getElementById('restartButton').style.display = 'block'
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
  document.getElementById('checkButton').addEventListener('click', comprobarLetra);
  document.getElementById('restartButton').addEventListener('click', seleccionarPalabra);
  seleccionarPalabra();
});

//Ejercicio 9.4

function cambiarImagen() {
  const select = document.getElementById('imagenSelect');
  const imagen = document.getElementById('imagen');
  imagen.src = select.value;
}