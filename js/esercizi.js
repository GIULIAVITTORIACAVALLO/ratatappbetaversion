// Lista di parole casuali per l'esercizio creativo
const parole = ["Mare", "Sogno", "Vento", "Libertà", "Orizzonte", "Emozione", "Silenzio", "Viaggio", "Aurora", "Passione"];

// Selezione degli elementi HTML
const parolaCasualeEl = document.getElementById("parolaCasuale");
const timerEl = document.getElementById("timer");
const audio = new Audio("audio/LOFI.mp3");

let countdown;
let tempo = 180; // 3 minuti
let timerAttivo = false;
let musicaAttiva = false;

// 🎲 Genera una parola casuale
function generaParola() {
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
    parolaCasualeEl.textContent = "Parola: " + parolaCasuale;
}

// ⏳ Avvia o pausa il cronometro
function toggleCronometro() {
    if (timerAttivo) {
        clearInterval(countdown);
        timerAttivo = false;
    } else {
        countdown = setInterval(() => {
            let min = Math.floor(tempo / 60);
            let sec = tempo % 60;
            timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
            tempo--;

            if (tempo < 0) {
                clearInterval(countdown);
                timerEl.textContent = "Tempo Scaduto!";
            }
        }, 1000);
        timerAttivo = true;
    }
}

// 🔄 Reset cronometro
function resetCronometro() {
    clearInterval(countdown);
    tempo = 180;
    timerEl.textContent = "3:00";
    timerAttivo = false;
}

// 🎵 Play/Pausa Musica LO-FI
function toggleMusica() {
    if (musicaAttiva) {
        audio.pause();
        musicaAttiva = false;
    } else {
        audio.play();
        musicaAttiva = true;
    }
}
