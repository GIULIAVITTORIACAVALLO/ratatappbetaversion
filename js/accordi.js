document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const noteMap = {
        "Bb": "A#",
        "Db": "C#",
        "Eb": "D#",
        "Gb": "F#",
        "Ab": "G#"
    };

    function normalizzaAccordo(acc) {
        return acc in noteMap ? noteMap[acc] : acc;
    }

    const accordiBase = {
        "C": ["C4", "E4", "G4"],
        "Cm": ["C4", "Eb4", "G4"],
        "C#": ["C#4", "F4", "G#4"],
        "C#m": ["C#4", "E4", "G#4"],
        "D": ["D4", "F#4", "A4"],
        "Dm": ["D4", "F4", "A4"],
        "D#": ["D#4", "G4", "A#4"],
        "D#m": ["D#4", "F#4", "A#4"],
        "E": ["E4", "G#4", "B4"],
        "Em": ["E4", "G4", "B4"],
        "F": ["F4", "A4", "C5"],
        "Fm": ["F4", "Ab4", "C5"],
        "F#": ["F#4", "A#4", "C#5"],
        "F#m": ["F#4", "A4", "C#5"],
        "G": ["G4", "B4", "D5"],
        "Gm": ["G4", "Bb4", "D5"],
        "G#": ["G#4", "C5", "D#5"],
        "G#m": ["G#4", "B4", "D#5"],
        "A": ["A3", "C#4", "E4"],
        "Am": ["A3", "C4", "E4"],
        "A#": ["A#3", "D4", "F4"],
        "A#m": ["A#3", "C#4", "F4"],
        "B": ["B3", "D#4", "F#4"],
        "Bm": ["B3", "D4", "F#4"]
    };

    const progressioni = {
        cantautorato: [
            ["I", "vi", "IV", "V"],
            ["I", "iii", "vi", "IV", "V"],
            ["ii", "V", "I", "vi"],
            ["I", "IV", "V", "IV", "I"],
            ["vi", "ii", "V", "I"]
        ],
        pop: [
            ["I", "V", "vi", "IV"],
            ["vi", "IV", "I", "V"],
            ["I", "V", "vi", "iii", "IV"],
            ["I", "V", "IV", "IV"],
            ["IV", "I", "V", "vi"]
        ],
        rock: [
            ["I", "bVII", "IV", "I"],
            ["I", "IV", "V", "IV"],
            ["I", "V", "bVII", "IV"],
            ["I", "IV", "vi", "V"],
            ["bVII", "IV", "I", "V"]
        ],
        jazz: [
            ["ii", "V", "I", "vi"],
            ["I", "vi", "ii", "V"],
            ["ii", "V", "iii", "vi", "ii", "V", "I"],
            ["I", "IV", "iii", "vi", "ii", "V", "I"],
            ["I", "bIII", "IV", "bVI", "ii", "V", "I"]
        ]
    };

    const tonalitaMaggiori = {
        "C": ["C", "D", "E", "F", "G", "A", "B"],
        "D": ["D", "E", "F#", "G", "A", "B", "C#"],
        "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
        "F": ["F", "G", "A", "Bb", "C", "D", "E"],
        "G": ["G", "A", "B", "C", "D", "E", "F#"],
        "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
        "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"]
    };

    const tonalitaMinori = {
        "Cm": ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
        "Dm": ["D", "E", "F", "G", "A", "Bb", "C"],
        "Em": ["E", "F#", "G", "A", "B", "C", "D"],
        "Fm": ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
        "Gm": ["G", "A", "Bb", "C", "D", "Eb", "F"],
        "Am": ["A", "B", "C", "D", "E", "F", "G"],
        "Bm": ["B", "C#", "D", "E", "F#", "G", "A"]
    };

    function playAccordo(nomeAccordo) {
        const acc = normalizzaAccordo(nomeAccordo);
        const note = accordiBase[acc];
        if (note) synth.triggerAttackRelease(note, "1n");
    }

    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        const tipo = tonalita.includes("m") ? "minore" : "maggiore";
        const scala = tipo === "maggiore" ? tonalitaMaggiori[tonalita] : tonalitaMinori[tonalita];

        const progressioniGenere = progressioni[genere];
        const progression = progressioniGenere[Math.floor(Math.random() * progressioniGenere.length)];

        const gradi = {
            "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "vii": 6,
            "i": 0, "iv": 3, "v": 4, "bVII": 6, "bIII": 2, "bVI": 5
        };

        const accordi = progression.map(grado => {
            const idx = gradi[grado];
            if (idx === undefined) return grado;
            let acc = scala[idx];
            if (grado === grado.toLowerCase() || grado.includes("m")) acc += "m";
            return acc;
        });

        let outputHTML = `<p>Progressione (${genere}, ${tonalita}):</p>`;
        accordi.forEach(acc => {
            outputHTML += `<button class="accordo-btn" onclick="playAccordo('${acc}')">${acc}</button> `;
        });

        risultato.innerHTML = outputHTML;
    }

    window.playAccordo = playAccordo;
    generaAccordiBtn.addEventListener("click", generaAccordi);
});
