// Lista di parole casuali
const parole = ["Mare", "Sogno", "Vento", "Libertà", "Notte", "Musica", "Viaggio", "Universo"];

function generaParola() {
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;

    // Salva la parola nel LocalStorage
    localStorage.setItem("parolaCreativa", parolaCasuale);
}

function avviaCronometro() {
    let tempo = 180; // 3 minuti
    const timerEl = document.getElementById("timer");

    // Controlla se il player YouTube esiste e riproduce la musica
    let ytPlayer = document.getElementById("ytPlayer");
    if (ytPlayer) {
        ytPlayer.src += "&autoplay=1"; // Aggiunge autoplay alla URL
    }

    const countdown = setInterval(() => {
        let min = Math.floor(tempo / 60);
        let sec = tempo % 60;
        timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
        tempo--;

        if (tempo < 0) {
            clearInterval(countdown);
            timerEl.textContent = "Tempo Scaduto!";
        }
    }, 1000);
}

// Recupera la parola salvata al caricamento della pagina
window.onload = function () {
    const parolaSalvata = localStorage.getItem("parolaCreativa");
    if (parolaSalvata) {
        document.getElementById("parolaCasuale").textContent = "Parola: " + parolaSalvata;
    }
};
