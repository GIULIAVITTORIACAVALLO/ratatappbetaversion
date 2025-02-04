document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const generaButton = document.getElementById("generaAccordi");
    const output = document.getElementById("accordiOutput");

    // Definizione degli accordi per ogni tonalità maggiore e minore
    const scale = {
        maggiore: {
            C: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
            G: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
            D: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
            A: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
            E: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
            B: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
            F: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
            Bb: ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"],
            Eb: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
            Ab: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
            Db: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim"],
            Gb: ["Gb", "Abm", "Bbm", "B", "Db", "Ebm", "Fdim"]
        },
        minore: {
            Am: ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
            Em: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
            Bm: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
            F#m: ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
            C#m: ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"],
            G#m: ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"],
            D#m: ["D#m", "E#dim", "F#", "G#m", "A#m", "B", "C#"],
            Bbm: ["Bbm", "Cdim", "Db", "Ebm", "Fm", "Gb", "Ab"],
            Fm: ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"],
            Cm: ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
            Gm: ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
            Dm: ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"]
        }
    };

    function generaProgressione() {
        const tonalita = tonalitaSelect.value;
        const tipo = tonalita.endsWith("m") ? "minore" : "maggiore";

        if (!scale[tipo][tonalita]) return;

        let accordi = scale[tipo][tonalita];
        let progressione = [];

        for (let i = 0; i < 4; i++) {
            let accordoCasuale = accordi[Math.floor(Math.random() * accordi.length)];
            progressione.push(accordoCasuale);
        }

        output.textContent = "Progressione generata: " + progressione.join(" - ");
    }

    generaButton.addEventListener("click", generaProgressione);
});
