function generaParola() {
    const parole = ["Mare", "Sogno", "Vento", "Libertà", "Musica", "Viaggio", "Orizzonte"];
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

    // Avvia la musica quando il cronometro parte
    avviaMusica();
}

// Controlli per il player di YouTube
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytPlayer');
}

function avviaMusica() {
    if (player) player.playVideo();
}

function toggleMusica() {
    if (player && player.getPlayerState() === 1) { // 1 = in riproduzione
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// Carica l'API di YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
