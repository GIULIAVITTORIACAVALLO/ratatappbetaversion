function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà", "Amore", "Notte", "Viaggio", "Silenzio"];
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];

    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;
    localStorage.setItem("parolaCasuale", parolaCasuale);
}

function avviaCronometro() {
    let tempo = 180; // 3 minuti in secondi
    const timerEl = document.getElementById("timer");

    if (localStorage.getItem("tempoRimanente")) {
        tempo = parseInt(localStorage.getItem("tempoRimanente"));
    }

    // Mostra l'iframe YouTube e fa partire il video
    const videoFrame = document.getElementById("youtubeFrame");
    videoFrame.src = "https://www.youtube.com/embed/CfPxlb8-ZQ0?autoplay=1&loop=1&playlist=CfPxlb8-ZQ0";
    videoFrame.style.display = "block";

    const countdown = setInterval(() => {
        let min = Math.floor(tempo / 60);
        let sec = tempo % 60;
        timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
        tempo--;

        localStorage.setItem("tempoRimanente", tempo);

        if (tempo < 0) {
            clearInterval(countdown);
            timerEl.textContent = "Tempo Scaduto!";
            localStorage.removeItem("tempoRimanente");

            // Nasconde l'iframe e interrompe il video
            videoFrame.src = "";
            videoFrame.style.display = "none";
        }
    }, 1000);
}

// Recupera i dati salvati
document.addEventListener("DOMContentLoaded", function () {
    const parolaSalvata = localStorage.getItem("parolaCasuale");
    if (parolaSalvata) {
        document.getElementById("parolaCasuale").textContent = "Parola: " + parolaSalvata;
    }

    const tempoSalvato = localStorage.getItem("tempoRimanente");
    if (tempoSalvato && tempoSalvato > 0) {
        avviaCronometro();
    }
});
