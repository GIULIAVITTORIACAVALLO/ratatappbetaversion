document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const generaButton = document.getElementById("genera");
    const risultatoDiv = document.getElementById("risultato");

    // Definizione delle tonalità con le loro scale armoniche
    const tonalita = {
        "Do maggiore": ["C", "D", "E", "F", "G", "A", "B"],
        "La minore": ["Am", "Bdim", "C", "D", "Em", "F", "G"],
        "Sol maggiore": ["G", "A", "B", "C", "D", "E", "F#"],
        "Mi minore": ["Em", "F#dim", "G", "A", "Bm", "C", "D"],
        "Re maggiore": ["D", "E", "F#", "G", "A", "B", "C#"],
        "Si minore": ["Bm", "C#dim", "D", "E", "F#m", "G", "A"],
        "La maggiore": ["A", "B", "C#", "D", "E", "F#", "G#"],
        "Fa# minore": ["F#m", "G#dim", "A", "B", "C#m", "D", "E"],
        "Mi maggiore": ["E", "F#", "G#", "A", "B", "C#", "D#"],
        "Do# minore": ["C#m", "D#dim", "E", "F#", "G#m", "A", "B"],
        "Si maggiore": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        "Sol# minore": ["G#m", "A#dim", "B", "C#", "D#m", "E", "F#"],
        "Fa maggiore": ["F", "G", "A", "Bb", "C", "D", "E"],
        "Re minore": ["Dm", "Edim", "F", "G", "Am", "Bb", "C"],
        "Sib maggiore": ["Bb", "C", "D", "Eb", "F", "G", "A"],
        "Sol minore": ["Gm", "Adim", "Bb", "C", "Dm", "Eb", "F"],
        "Mib maggiore": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        "Do minore": ["Cm", "Ddim", "Eb", "F", "Gm", "Ab", "Bb"],
        "Lab maggiore": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        "Fa minore": ["Fm", "Gdim", "Ab", "Bb", "Cm", "Db", "Eb"],
        "Reb maggiore": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        "Sib minore": ["Bbm", "Cdim", "Db", "Eb", "Fm", "Gb", "Ab"],
        "Solb maggiore": ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
        "Mib minore": ["Ebm", "Fdim", "Gb", "Ab", "Bbm", "Cb", "Db"]
    };

    // Funzione per generare una progressione armonica casuale
    function generaProgressione() {
        const tonalitaScelta = tonalitaSelect.value;
        const genereScelto = genereSelect.value;

        if (!tonalitaScelta || !genereScelto) {
            risultatoDiv.innerHTML = "Seleziona una tonalità e un genere musicale.";
            return;
        }

        const scala = tonalita[tonalitaScelta];
        let progressione = [];

        // Algoritmo per generare progressioni armoniche diverse in base alla tonalità
        const giriComuni = [
            [1, 5, 6, 4], // I-V-vi-IV (pop)
            [2, 5, 1, 6], // ii-V-I-vi (jazz)
            [6, 4, 1, 5], // vi-IV-I-V (pop/rock)
            [1, 6, 2, 5]  // I-vi-ii-V (jazz)
        ];

        let giroScelto = giriComuni[Math.floor(Math.random() * giriComuni.length)];

        // Convertiamo i gradi nella sequenza di accordi
        progressione = giroScelto.map(grado => scala[grado - 1]);

        // Mostriamo il risultato
        risultatoDiv.innerHTML = `Genere: ${genereScelto} <br> Tonalità: ${tonalitaScelta} <br> Progressione: ${progressione.join(" - ")}`;
    }

    // Assegniamo la funzione al bottone
    generaButton.addEventListener("click", generaProgressione);
});
