// esercizi.js

function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà", "Notte", "Stella", "Passione", "Silenzio"];
    const parolaCasuale = parole[Math.floor(Math.random() * parole.length)];
    document.getElementById("parolaCasuale").textContent = "Parola: " + parolaCasuale;
}

let timer;
let tempo = 180;
let inEsecuzione = false;

function avviaCronometro() {
    if (!inEsecuzione) {
        inEsecuzione = true;
        timer = setInterval(() => {
            let min = Math.floor(tempo / 60);
            let sec = tempo % 60;
            document.getElementById("timer").textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
            tempo--;
            if (tempo < 0) {
                clearInterval(timer);
                document.getElementById("timer").textContent = "Tempo Scaduto!";
                inEsecuzione = false;
            }
        }, 1000);
    }
}

function pausaCronometro() {
    clearInterval(timer);
    inEsecuzione = false;
}

function toggleMusica() {
    let audio = document.getElementById("musica");

    if (!audio) {
        console.error("Elemento audio non trovato!");
        return;
    }

    // Se l'audio non è ancora caricato, forziamo il caricamento
    if (audio.readyState < 2) { 
        audio.load(); // Forza il caricamento
        console.log("Caricamento audio in corso...");
    }

    // Dopo il caricamento, riproduci o metti in pausa
    audio.oncanplaythrough = () => {
        if (audio.paused) {
            audio.play()
                .then(() => console.log("Audio in riproduzione"))
                .catch(error => console.error("Errore nella riproduzione:", error));
        } else {
            audio.pause();
            console.log("Audio in pausa");
        }
    };
}
