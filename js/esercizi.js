document.addEventListener("DOMContentLoaded", function () {
    const generaParolaBtn = document.getElementById("generaParolaBtn");
    const avviaCronometroBtn = document.getElementById("avviaCronometroBtn");
    const youtubeFrame = document.getElementById("youtubeFrame");
    const timerEl = document.getElementById("timer");

    generaParolaBtn.addEventListener("click", function () {
        const parole = ["Mare", "Sogno", "Vento", "Libertà", "Amore", "Notte", "Viaggio", "Silenzio"];
        const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
        document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;
        localStorage.setItem("parolaCasuale", parolaCasuale);
    });

    avviaCronometroBtn.addEventListener("click", function () {
        let tempo = 180; // 3 minuti in secondi

        if (localStorage.getItem("tempoRimanente")) {
            tempo = parseInt(localStorage.getItem("tempoRimanente"));
        }

        // Assicurati che l'elemento iframe esista prima di impostare src
        if (youtubeFrame) {
            youtubeFrame.src = "https://www.youtube.com/embed/CfPxlb8-ZQ0?autoplay=1&loop=1&playlist=CfPxlb8-ZQ0";
            youtubeFrame.style.display = "block";
        } else {
            console.error("Elemento YouTube non trovato!");
        }

        const countdown = setInterval(() => {
            if (tempo < 0) {
                clearInterval(countdown);
                timerEl.textContent = "Tempo Scaduto!";
                localStorage.removeItem("tempoRimanente");

                if (youtubeFrame) {
                    youtubeFrame.src = "";
                    youtubeFrame.style.display = "none";
                }
                return;
            }

            let min = Math.floor(tempo / 60);
            let sec = tempo % 60;
            timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
            localStorage.setItem("tempoRimanente", tempo);
            tempo--;

        }, 1000);
    });

    // Recupera i dati salvati all'avvio della pagina
    const parolaSalvata = localStorage.getItem("parolaCasuale");
    if (parolaSalvata) {
        document.getElementById("parolaCasuale").textContent = "Parola: " + parolaSalvata;
    }

    const tempoSalvato = localStorage.getItem("tempoRimanente");
    if (tempoSalvato && tempoSalvato > 0) {
        avviaCronometroBtn.click(); // Se c'è un timer attivo, lo riprende
    }
});
