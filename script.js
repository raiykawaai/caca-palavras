const matriz = [];
var alfabeto = [];
const rows = 10;
const columns = 10;
const main = document.querySelector('main');
let htmlString = "" ;

for (let i = 97; i <= 122; i++) {
    alfabeto.push(String.fromCharCode(i));
}

const coordenadas = {
    "[0, 0]": "c", "[1, 0]": "h", "[1, 1]": "o", "[1, 3]": "a", 
    "[1, 4]": "r", "[1, 5]": "a", "[1, 6]": "b", "[1, 7]": "e",
    "[2, 0]": "i", "[2, 2]": "r", "[2, 3]": "l", "[2, 5]": "r",
    "[2, 6]": "t", "[3, 0]": "n", "[3, 3]": "e", "[3, 6]": "u",
    "[4, 0]": "e", "[4, 3]": "m", "[4, 4]": "a", "[4, 6]": "r",
    "[4, 7]": "s", "[5, 0]": "s", "[5, 3]": "a", "[5, 5]": "n",
    "[5, 6]": "c", "[5, 8]": "s", "[6, 3]": "o", "[6, 9]": "o",
    "[6, 6]": "o", "[9, 0]": "p", "[9, 1]": "o", "[9, 2]": "r",
    "[9, 3]": "t", "[9, 4]": "u", "[9, 5]": "g", "[9, 6]": "u",
    "[9, 7]": "e", "[9, 8]": "s"
};

const palavras = {
    chines: ["c", "h", "i", "n", "e", "s"],
    alemao: ["a", "l", "e", "m", "a", "o"],
    turco: ["t", "u", "r", "c", "o"],
    portugues: ["p", "o", "r", "t", "u", "g", "u", "e", "s"],
    arabe: ["a", "r", "a", "b", "e"],
    coreano: ["c", "o", "r", "e", "a", "n", "o"],
    russo: ["r", "u", "s", "s", "o"]
};

const coordenadasPalavras = {
    chines: { "[0, 0]": "c", "[1, 0]": "h", "[2, 0]": "i", "[3, 0]": "n", "[4, 0]": "e", "[5, 0]": "s" },
    alemao: { "[1, 3]": "a", "[2, 3]": "l", "[3, 3]": "e", "[4, 3]": "m", "[5, 3]": "a", "[6, 3]": "o" },
    turco: { "[2, 6]": "t", "[3, 6]": "u", "[4, 6]": "r", "[5, 6]": "c", "[6, 6]": "o" },
    portugues: { "[9, 0]": "p", "[9, 1]": "o", "[9, 2]": "r", "[9, 3]": "t", "[9, 4]": "u", "[9, 5]": "g", "[9, 6]": "u", "[9, 7]": "e", "[9, 8]": "s" },
    arabe: { "[1, 3]": "a", "[1, 4]": "r", "[1, 5]": "a", "[1, 6]": "b", "[1, 7]": "e" },
    coreano: { "[0, 0]": "c", "[1, 1]": "o", "[2, 2]": "r", "[3, 3]": "e", "[4, 4]": "a", "[5, 5]": "n", "[6, 6]": "o" },
    russo: { "[2, 5]": "r", "[3, 6]": "u", "[4, 7]": "s", "[5, 8]": "s", "[6, 9]": "o" }
};

const palavrasElementos = {
    chines: ["[0, 0]", "[1, 0]", "[2, 0]", "[3, 0]", "[4, 0]", "[5, 0]"],
    alemao: ["[1, 3]", "[2, 3]", "[3, 3]", "[4, 3]", "[5, 3]", "[6, 3]"],
    turco: ["[2, 6]", "[3, 6]", "[4, 6]", "[5, 6]", "[6, 6]"],
    portugues: ["[9, 0]", "[9, 1]", "[9, 2]", "[9, 3]", "[9, 4]", "[9, 5]", "[9, 6]", "[9, 7]", "[9, 8]"],
    arabe: ["[1, 3]", "[1, 4]", "[1, 5]", "[1, 6]", "[1, 7]"],
    coreano: ["[0, 0]", "[1, 1]", "[2, 2]", "[3, 3]", "[4, 4]", "[5, 5]", "[6, 6]"],
    russo: ["[2, 5]", "[3, 6]", "[4, 7]", "[5, 8]", "[6, 9]"]
};


for (let i = 0; i < rows; i++) {
    matriz[i] = [];
    for (let j = 0; j < columns; j++) {
        matriz[i][j] = " ";
    }
}


for (const key in coordenadas) {
    const [row, col] = key.slice(1, -1).split(', ').map(Number);
    matriz[row][col] = coordenadas[key];
}


function gerarLetraAleatoria() {
    const indice = Math.floor(Math.random() * alfabeto.length); 
    return alfabeto[indice]; 
}


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        if (matriz[i][j] === " ") { 
            matriz[i][j] = gerarLetraAleatoria(); 
        }
    }
}


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        htmlString += `<button>${matriz[i][j].toUpperCase()}</button>`;
    }
}

main.innerHTML = htmlString;


let letrasClicadas = [];
let palavrasFormadas = [];  
let timerInterval;
let tempoRestante = 5 * 60; 


const getClickedLetter = (event) => {
    const clickedLetter = event.target.innerText;
    return clickedLetter;
};


function atualizarCronometro() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    document.querySelector('#cronometro').innerText = `${minutos}:${segundos.toString().padStart(2, '0')}`;
    tempoRestante--;


    if (tempoRestante < 0) {
        clearInterval(timerInterval);
        alert("O tempo esgotou!");
    }
}


function verificarPalavrasFormadas() {
    const todasPalavrasFormadas = Object.keys(palavras).every(palavra => palavrasFormadas.includes(palavra));
    if (todasPalavrasFormadas) {
        clearInterval(timerInterval); 
        alert("Parabéns! Você formou todas as palavras antes do tempo!");
    }
}


let timeout;
document.addEventListener('click', (event) => {
    const clickedLetter = getClickedLetter(event);

  
    if (clickedLetter) {
        letrasClicadas.push(clickedLetter); 
        console.log("Letras clicadas: ", letrasClicadas);
        
        
        clearTimeout(timeout);

        
        timeout = setTimeout(() => {
            letrasClicadas.forEach((element, index) => {
                if (element === '') {
                    letrasClicadas[index] = ' ';
                }
            });

            const result = letrasClicadas.join('');
            console.log(result);

          
            for (let chave in palavras) {
                if (palavras[chave].join('') === result.toLowerCase()) {
                   
                    if (!palavrasFormadas.includes(chave)) {
                        palavrasFormadas.push(chave); 
                        console.log(`Palavra formada válida: ${result}`);

                       
                        if (coordenadasPalavras[chave]) {
                            palavrasElementos[chave].forEach(celula => {
                                const button = main.querySelector(`button:nth-child(${parseInt(celula.split(',')[0].slice(1)) * columns + parseInt(celula.split(',')[1].slice(0, -1)) + 1})`);
                                button.style.backgroundColor = "rgb(55 215 108)";
                            });
                        }

                        
                        verificarPalavrasFormadas();
                    } else {
                        console.log(`Palavra já formada: ${result}`);
                    }
                    break;
                }
            }

            console.log("Palavras formadas: ", palavrasFormadas);  

            
            letrasClicadas = [];
            console.log("Lista de letras clicadas foi resetada.");
        }, 1000); 
    }
});


timerInterval = setInterval(atualizarCronometro, 1000);
