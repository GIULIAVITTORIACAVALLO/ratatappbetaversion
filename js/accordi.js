document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const tipoSelect = document.getElementById("tipo");
    const generaBtn = document.getElementById("genera");
    const risultato = document.getElementById("risultato");

    // Tonalità con alterazioni in chiave
    const tonalitaMaggiori = {
        "Do": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        "Sol": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        "Re": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        "La": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
        "Mi": ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
        "Si": ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
        "Fa#": ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#dim"],
        "Db": ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim"],
        "Ab": ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
        "Eb": ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
        "Bb": ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"],
        "F": ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"]
    };

    const tonalitaMinori = {
        "La minore": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
        "Mi minore": ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
        "Si minore": ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
        "Fa# minore": ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
        "Do# minore": ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"],
        "Sol# minore": ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"],
        "Re# minore": ["D#m", "E#dim", "F#", "G#m", "A#m", "B", "C#"],
        "La# minore": ["A#m", "Cdim", "C#", "D#m", "E#m", "F#", "G#"],
        "Fa minore": ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"],
        "Do minore": ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
        "Sol minore": ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
        "Re minore": ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"]
    };

    // Funzione per generare una progressione armonica
    function generaProgressione() {
        let tonalitaScelta = tonalitaSelect.value;
        let tipoScelto = tipoSelect.value;
        let progressione = [];

        let scala = tipoScelto === "maggiore" ? tonalitaMaggiori[tonalitaScelta] : tonalitaMinori[tonalitaScelta];

        if (scala) {
            for (let i = 0; i < 4; i++) {
                let accordo = scala[Math.floor(Math.random() * scala.length)];
                progressione.push(accordo);
            }
            risultato.innerText = `Progressione: ${progressione.join(" - ")}`;
        } else {
            risultato.innerText = "Seleziona una tonalità valida!";
        }
    }

    // Evento click sul pulsante
    generaBtn.addEventListener("click", generaProgressione);
});
