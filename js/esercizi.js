function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà", "Notte", "Aurora"];
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;
}

function avviaCronometro() {
    let tempo = 180;
    const timerEl = document.getElementById("timer");

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

// Funzione per play/pausa del video YouTube
function toggleMusic() {
    const player = document.getElementById("youtubePlayer");
    const src = player.src;

    if (src.includes("autoplay=1")) {
        player.src = src.replace("autoplay=1", "autoplay=0");
    } else {
        player.src = src + "&autoplay=1";
    }
}
