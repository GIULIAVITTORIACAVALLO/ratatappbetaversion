function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà", "Amore", "Notte", "Viaggio", "Silenzio"];
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];

    // Mostra la parola e salvala nel Local Storage
    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;
    localStorage.setItem("parolaCasuale", parolaCasuale);
}

function avviaCronometro() {
    let tempo = 180; // 3 minuti in secondi
    const timerEl = document.getElementById("timer");

    // Controlla se c'è un tempo salvato nel Local Storage
    if (localStorage.getItem("tempoRimanente")) {
        tempo = parseInt(localStorage.getItem("tempoRimanente"));
    }

    const countdown = setInterval(() => {
        let min = Math.floor(tempo / 60);
        let sec = tempo % 60;
        timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
        tempo--;

        // Salva il tempo rimanente nel Local Storage
        localStorage.setItem("tempoRimanente", tempo);

        if (tempo < 0) {
            clearInterval(countdown);
            timerEl.textContent = "Tempo Scaduto!";
            localStorage.removeItem("tempoRimanente"); // Rimuove il tempo salvato
        }
    }, 1000);
}

// Recupera la parola casuale salvata dopo un refresh
document.addEventListener("DOMContentLoaded", function () {
    const parolaSalvata = localStorage.getItem("parolaCasuale");
    if (parolaSalvata) {
        document.getElementById("parolaCasuale").textContent = "Parola: " + parolaSalvata;
    }

    const tempoSalvato = localStorage.getItem("tempoRimanente");
    if (tempoSalvato && tempoSalvato > 0) {
        avviaCronometro(); // Riprende il cronometro se non è scaduto
    }
});
