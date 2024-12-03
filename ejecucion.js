// Seleccionar los elementos de la página
const editor = document.getElementById('editor');
const runButton = document.getElementById('runButton');
const consoleDiv = document.getElementById('console');

// Función para limpiar la consola
function clearConsole() {
  consoleDiv.innerHTML = '';
}

// Función para escribir en la consola
function writeToConsole(output) {
  const outputDiv = document.createElement('div');
  outputDiv.textContent = output;
  consoleDiv.appendChild(outputDiv);
}

// Interceptar console.log para que también escriba en la consola personalizada
(function() {
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    const msg = args.join(' ');
    writeToConsole(msg);
    originalConsoleLog.apply(console, args); // También mantener la funcionalidad original
  };
})();

// Función para ejecutar el código escrito en el editor
runButton.addEventListener('click', () => {
  clearConsole();
  const code = editor.value;

  try {
    // Crear una nueva función para capturar el código y retornarlo
    const fn = new Function(code);

    // Ejecutar la función
    const result = fn();
    
    // Si hay un resultado que no sea undefined, mostrarlo
    if (result !== undefined) {
      writeToConsole('Resultado: ' + result);
    }
  } catch (error) {
    // Mostrar error si hay un problema en el código
    writeToConsole('Error: ' + error.message);
  }
});
