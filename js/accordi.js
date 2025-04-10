document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    // Suono tipo Rhodes (più caldo)
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

    // Conversione da bemolle a diesis per il playback
    const enharmonicMap = {
        "Bb": "A#",
        "Eb": "D#",
        "Ab": "G#",
        "Db": "C#",
        "Gb": "F#"
    };

    function convertiBemolle(note) {
        return note.map(nota => {
            let notaBase = nota.slice(0, -1);
            let ottava = nota.slice(-1);
            return enharmonicMap[notaBase] ? enharmonicMap[notaBase] + ottava : nota;
        });
    }

  const accordiEstesi = {
    // Naturali
    "C": ["C4", "E4", "G4"],
    "Cm": ["C4", "Eb4", "G4"],
    "C7": ["C4", "E4", "G4", "Bb4"],
    "Cmaj7": ["C4", "E4", "G4", "B4"],

    "D": ["D4", "F#4", "A4"],
    "Dm": ["D4", "F4", "A4"],
    "D7": ["D4", "F#4", "A4", "C5"],
    "Dmaj7": ["D4", "F#4", "A4", "C#5"],

    "E": ["E4", "G#4", "B4"],
    "Em": ["E4", "G4", "B4"],
    "E7": ["E4", "G#4", "B4", "D5"],
    "Emaj7": ["E4", "G#4", "B4", "D#5"],

    "F": ["F4", "A4", "C5"],
    "Fm": ["F4", "Ab4", "C5"],
    "F7": ["F4", "A4", "C5", "Eb5"],
    "Fmaj7": ["F4", "A4", "C5", "E5"],

    "G": ["G3", "B3", "D4"],
    "Gm": ["G3", "Bb3", "D4"],
    "G7": ["G3", "B3", "D4", "F4"],
    "Gmaj7": ["G3", "B3", "D4", "F#4"],

    "A": ["A3", "C#4", "E4"],
    "Am": ["A3", "C4", "E4"],
    "A7": ["A3", "C#4", "E4", "G4"],
    "Amaj7": ["A3", "C#4", "E4", "G#4"],

    "B": ["B3", "D#4", "F#4"],
    "Bm": ["B3", "D4", "F#4"],
    "B7": ["B3", "D#4", "F#4", "A4"],
    "Bmaj7": ["B3", "D#4", "F#4", "A#4"],

    // Diesis
    "C#": ["C#4", "F4", "G#4"],
    "C#m": ["C#4", "E4", "G#4"],
    "C#7": ["C#4", "F4", "G#4", "B4"],

    "D#": ["D#4", "G4", "A#4"],
    "D#m": ["D#4", "F#4", "A#4"],
    "D#7": ["D#4", "G4", "A#4", "C#5"],

    "F#": ["F#4", "A#4", "C#5"],
    "F#m": ["F#4", "A4", "C#5"],
    "F#7": ["F#4", "A#4", "C#5", "E5"],

    "G#": ["G#3", "C4", "D#4"],
    "G#m": ["G#3", "B3", "D#4"],
    "G#7": ["G#3", "C4", "D#4", "F#4"],

    "A#": ["A#3", "D4", "F4"],
    "A#m": ["A#3", "C#4", "F4"],
    "A#7": ["A#3", "D4", "F4", "G#4"],

    // Bemolle (alias dei diesis, stessi tasti)
    "Db": ["C#4", "F4", "G#4"],
    "Dbm": ["C#4", "E4", "G#4"],
    "Db7": ["C#4", "F4", "G#4", "B4"],

    "Eb": ["D#4", "G4", "A#4"],
    "Ebm": ["D#4", "F#4", "A#4"],
    "Eb7": ["D#4", "G4", "A#4", "C#5"],

    "Gb": ["F#4", "A#4", "C#5"],
    "Gbm": ["F#4", "A4", "C#5"],
    "Gb7": ["F#4", "A#4", "C#5", "E5"],

    "Ab": ["G#3", "C4", "D#4"],
    "Abm": ["G#3", "B3", "D#4"],
    "Ab7": ["G#3", "C4", "D#4", "F#4"],

    "Bb": ["A#3", "D4", "F4"],
    "Bbm": ["A#3", "C#4", "F4"],
    "Bb7": ["A#3", "D4", "F4", "G#4"]
};

    const progressioni = {
        cantautorato: [
            ["I", "IV", "V7", "I"],
            ["I", "vi", "IV", "V7"],
            ["ii", "V7", "I", "vi"],
            ["I", "iii", "vi", "IV", "V7"]
        ],
        pop: [
            ["I", "V", "vi", "IV"],
            ["vi", "IV", "I", "V"],
            ["I", "V", "vi", "iii", "IV"],
            ["I", "V", "IV", "IV"]
        ],
        rock: [
            ["I", "bVII", "IV", "I"],
            ["I", "IV", "V", "IV"],
            ["I", "V", "bVII", "IV"],
            ["I", "IV", "vi", "V"]
        ],
        jazz: [
            ["ii", "V7", "Imaj7", "vi7"],
            ["Imaj7", "vi7", "ii7", "V7"],
            ["ii7", "V7", "iii7", "vi7", "ii7", "V7", "Imaj7"],
            ["Imaj7", "IVmaj7", "iii7", "vi7", "ii7", "V7", "Imaj7"]
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

    const gradi = {
        "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "vii": 6,
        "Imaj7": 0, "ii7": 1, "iii7": 2, "IVmaj7": 3, "V7": 4, "vi7": 5, "vii7": 6,
        "bVII": 6
    };

    function playAccordo(nomeAccordo) {
        const noteOriginali = accordiEstesi[nomeAccordo];
        if (noteOriginali) {
            const noteConvertite = convertiBemolle(noteOriginali);
            synth.triggerAttackRelease(noteConvertite, "1n");
        } else {
            console.warn(`Accordo non trovato: ${nomeAccordo}`);
        }
    }

    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        const tipo = tonalita.includes("m") ? "minore" : "maggiore";
        const scala = tipo === "maggiore" ? tonalitaMaggiori[tonalita] : tonalitaMinori[tonalita];

        const progression = progressioni[genere][Math.floor(Math.random() * progressioni[genere].length)];

        const accordi = progression.map(grado => {
            const idx = gradi[grado];
            if (idx === undefined || !scala) return grado;

            let nota = scala[idx];
            let suffisso = "";

            if (grado.toLowerCase().includes("maj7")) suffisso = "maj7";
            else if (grado.includes("7")) suffisso = "7";
            else if (grado.toLowerCase().includes("m")) suffisso = "m";

            const accordo = nota + suffisso;
            return accordo in accordiEstesi ? accordo : nota;
        });

        let outputHTML = `<p>Progressione (${genere}, ${tonalita}):</p>`;
        accordi.forEach(acc => {
            outputHTML += `<button class="accordo-btn" onclick="playAccordo('${acc}')">${acc}</button> `;
        });

        risultato.innerHTML = outputHTML;
        localStorage.setItem("ultimaProgressione", outputHTML);
    }

    window.playAccordo = playAccordo;
    generaAccordiBtn.addEventListener("click", generaAccordi);

    const ultima = localStorage.getItem("ultimaProgressione");
    if (ultima) {
        risultato.innerHTML = ultima;
    }
});
