document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const tipoSelect = document.getElementById("tipo");
    const generaBtn = document.getElementById("genera");
    const output = document.getElementById("output");

    const scale = {
        maggiori: {
            "Do": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
            "Re": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
            "Mi": ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
            "Fa": ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
            "Sol": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
            "La": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
            "Si": ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"]
        },
        minori: {
            "Lam": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
            "Sim": ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
            "Dom": ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
            "Rem": ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"],
            "Mim": ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
            "Fam": ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"],
            "Solm": ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"]
        }
    };

    function generaProgressione() {
        const tonalita = tonalitaSelect.value;
        const tipo = tipoSelect.value;
        const scala = scale[tipo][tonalita];

        if (!scala) {
            output.textContent = "Seleziona una tonalità valida.";
            return;
        }

        let progressione = [];
        let usedIndexes = new Set();

        while (progressione.length < 4) {
            let index = Math.floor(Math.random() * scala.length);
            if (!usedIndexes.has(index)) {
                usedIndexes.add(index);
                progressione.push(scala[index]);
            }
        }

        output.textContent = "Progressione generata: " + progressione.join(" - ");
    }

    generaBtn.addEventListener("click", generaProgressione);
});
