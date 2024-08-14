// Definir el mapeo de vocales para encriptar
const vocalEncodeMap = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

// Definir el mapeo de códigos para desencriptar
const codeDecodeMap = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
};

// Función para encriptar texto
function procesarTexto() {
    const inputText = document.getElementById('inputText').value;
     
        // No hay texto ingresado o esta en blanco
        if (inputText === "" || inputText == "Ingrese el texto aquí" ) {

        // Habilito las advertencias o requisitos por campo de texto inputText vacio       
        inputTextEmpty(inputText);
        document.getElementById('textCopy').style.display = "none"; //No Visualizar mensaje de texto copiado al portapapeles
        return;
        } 

     document.getElementById("requisitosTexto").innerHTML = "<b><font color=#000000>Solo letras minúsculas y sin acentos</font></b>";
        
     // Normalizar texto para eliminar acentos
     var textoSinAcentos = inputText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Verificar si el texto original coincide con el texto sin acentos en minúsculas
    if (inputText === textoSinAcentos.toLowerCase() ) {
    
        /*alert("El texto ingresado es válido: " + textoSinAcentos); */
        let encryptedText = '';

         for (const char of inputText) {
        encryptedText += vocalEncodeMap[char] || char;
         }
        /*document.getElementById('outputText').value = encryptedText;*/
    
         // Selecciona el textarea por su Id
         const textarea = document.querySelector('#outputText');
         textarea.value = encryptedText;
         /*const containerSalida = document.querySelector('.principal__salidaTexto');*/

       
        // Llama a la función para ajustar el tamaño del textarea según su contenido
        autoResizeTextarea(textarea);

        // Ajusta el tamaño automáticamente cuando el contenido cambia
        textarea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
        
        //Deshabilito las advertencias por campo de texto inputText digitado
        disableWarnings();

        document.getElementById('textCopy').style.display = "none"; //No Visualizar mensaje de texto copiado al portapapeles

       
                
    return;
    
    } else {
         //Advertencia por no cumplir el texto con los requisitos establecidos, se cancela la encriptación
         document.getElementById("requisitosTexto").innerHTML = "<b><font color=#FF0000>Solo letras minúsculas y sin acentos: </font><font color=#FF0000>Texto Invalido</font></b>";
         return;
      }
    
}

// Función para desencriptar texto
function desencriptarTexto() {
     const inputText = document.getElementById('inputText').value;

     // No hay texto ingresado o esta en blanco
     if (inputText === ""  || inputText == "Ingrese el texto aquí") {

        // Habilito las advertencias o requisitos por campo de texto inputText vacio    
        inputTextEmpty(inputText);
        document.getElementById('textCopy').style.display = "none"; //No Visualizar mensaje de texto copiado al portapapeles
        return;
     } 
     else {

        // Normalizar texto para eliminar acentos
        var textoSinAcentos = inputText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Verificar si el texto original coincide con el texto sin acentos en minúsculas
        if (inputText === textoSinAcentos.toLowerCase() ) {
    
            //Deshabilito  las advertencias por texto digitado 
            disableWarnings();
            document.getElementById('outputText').style.height = '460px';
              
            let decryptedText = inputText;

            for (const [code, vowel] of Object.entries(codeDecodeMap)) {
            decryptedText = decryptedText.split(code).join(vowel);
            }

            document.getElementById('outputText').value = decryptedText;
            document.getElementById("requisitosTexto").innerHTML = "<b><font color=#000000>Solo letras minúsculas y sin acentos</font></b>"; //Requisitos del texto resaltados 
            document.getElementById('textCopy').style.display = "none"; //No Visualizar mensaje de texto copiado al portapapeles

        } else {
          //Advertencia por no cumplir el texto con los requisitos establecidos, se cancela la desencriptación
          document.getElementById("requisitosTexto").innerHTML = "<b><font color=#FF0000>Solo letras minúsculas y sin acentos: </font><font color=#FF0000>Texto Invalido</font></b>";
          return;
        }

     }
}

// Función para copiar el texto al portapapeles utilizando la API del portapapeles
function copiarAlPortapapeles() {
    const outputText = document.getElementById('outputText').value;
    
    navigator.clipboard.writeText(outputText).then(() => {
        document.getElementById('textCopy').style.display = "block"; //Visualizar mensaje de texto copiado al portapapeles
    }).catch(err => {
        alert('No se pudo copiar el texto al portapapeles: ', err);
    });
}


// Ajusta la altura del textarea outputText según su contenido 
function autoResizeTextarea (textarea) {
    textarea.style.height = 'auto'; // Resetea la altura para recalculate el tamaño.
    textarea.style.height = '460px'; // Ajusta la altura según el contenido.
}

function inputTextEmpty (inputText) {

    document.getElementById('imagenAdvertencia').style.display = "block"; // Visualizar la imagen de advertencia
    document.getElementById('parrafoAdvertencia').style.display = "block"; // Visualizar el párrafo de advertencia
    document.getElementById('outputText').value = "Ingresa el texto que deseas encriptar o desencriptar";
    document.getElementById('outputText').style.height = '70px';
    document.getElementById('outputText').style.textAlign="center" ;
    document.getElementById("requisitosTexto").innerHTML = "<b><font color=#FF0000>Solo letras minúsculas y sin acentos: </font><font color=#FF0000>Texto no digitado</font></b>";
    document.getElementById('buttonCopy').style.display = "none"; // No visualizar boton de copiar
    return inputText;
    
}

function disableWarnings () {
    document.getElementById('imagenAdvertencia').style.display = "none"; // No visualizar la imagen de advertencia
    document.getElementById('parrafoAdvertencia').style.display = "none"; //No visualizar el párrafo de advertencia
    document.getElementById('buttonCopy').style.display = "block"; // visualizar boton de copiar
    document.getElementById("requisitosTexto").innerHTML = "<b><font color=#000000>Solo letras minúsculas y sin acentos</font></b>"; //Requisitos del texto resaltados 
    document.getElementById('outputText').style.textAlign="start" ;
    return;
}