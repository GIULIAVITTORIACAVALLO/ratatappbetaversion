function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà", "Silenzio", "Melodia", "Tempo"];
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;
}

let tempo = 180;
let countdown;

function avviaCronometro() {
    const timerEl = document.getElementById("timer");

    clearInterval(countdown); // Reset del timer precedente, se attivo
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
}

function pausaCronometro() {
    clearInterval(countdown);
}

function toggleMusica() {
    const audio = document.getElementById("audioLofi");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
