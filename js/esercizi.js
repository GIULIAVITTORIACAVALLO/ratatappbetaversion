function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà"];
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;

    // Salvataggio della parola nel Local Storage
    localStorage.setItem("parolaCasuale", parolaCasuale);
}

function avviaCronometro() {
    let tempo = 180;
    const timerEl = document.getElementById("timer");

    // Recupera il lettore YouTube e imposta la musica
    let player = document.getElementById("player");
    player.src = "https://www.youtube.com/embed/CfPxlb8-ZQ0?autoplay=1&loop=1";

    const countdown = setInterval(() => {
        let min = Math.floor(tempo / 60);
        let sec = tempo % 60;
        timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
        tempo--;

        if (tempo < 0) {
            clearInterval(countdown);
            timerEl.textContent = "Tempo Scaduto!";
            player.src = ""; // Ferma la musica quando il tempo scade
        }
    }, 1000);
}

// Recupera la parola salvata nel Local Storage al ricaricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    const parolaSalvata = localStorage.getItem("parolaCasuale");
    if (parolaSalvata) {
        document.getElementById("parolaCasuale").textContent = "Parola: " + parolaSalvata;
    }
});
