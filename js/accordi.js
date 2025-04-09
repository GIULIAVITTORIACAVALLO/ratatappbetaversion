document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    const enharmonicMap = {
        "Bb": "A#",
        "Eb": "D#",
        "Ab": "G#",
        "Db": "C#",
        "Gb": "F#"
    };

    const tonalitaScale = {
        "C": ["C", "D", "E", "F", "G", "A", "B"],
        "G": ["G", "A", "B", "C", "D", "E", "F#"],
        "D": ["D", "E", "F#", "G", "A", "B", "C#"],
        "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
        "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
        "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
        "F": ["F", "G", "A", "Bb", "C", "D", "E"],
        "Bb": ["Bb", "C", "D", "Eb", "F", "G", "A"],
        "Eb": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        "Ab": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        "Db": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        "Gb": ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"]
    };

    const generi = {
        "pop": [
            ["I", "V", "vi", "IV", "I"],
            ["I", "iii", "vi", "IV", "V"],
            ["vi", "IV", "I", "V", "vi"]
        ],
        "rock": [
            ["I", "IV", "V", "bVII", "IV"],
            ["i", "bVI", "III", "bVII", "i"],
            ["i", "bIII", "bVI", "bVII", "i"]
        ],
        "jazz": [
            ["ii7", "V7", "IMaj7", "vi7", "ii7", "V7", "IMaj7"],
            ["IMaj7", "IVMaj7", "ii7", "V7", "ii7", "V7", "IMaj7"],
            ["IMaj7", "vi7", "ii7", "V7", "iiø7", "V7", "IMaj7"]
        ],
        "cantautorato": [
            ["I", "vi", "IV", "V", "I", "iii", "IV"],
            ["vi", "IV", "I", "V", "vi", "ii", "V"],
            ["I", "V", "vi", "iii", "IV", "V", "I"]
        ]
    };

    function gradoToAccordo(grado, scala) {
        const gradi = {
            "I": scala[0], "ii": scala[1] + "m", "iii": scala[2] + "m",
            "IV": scala[3], "V": scala[4], "vi": scala[5] + "m", "VII": scala[6],
            "i": scala[0] + "m", "iv": scala[3] + "m", "III": scala[2], "VI": scala[5],
            "bIII": scala[2] + "m", "bVI": scala[5], "bVII": scala[6],
            "ii7": scala[1] + "m7", "V7": scala[4] + "7", "vi7": scala[5] + "m7",
            "IMaj7": scala[0] + "maj7", "IVMaj7": scala[3] + "maj7", "iiø7": scala[1] + "m7b5"
        };
        return gradi[grado] || grado;
    }

    function accordoToMidi(accordo) {
        const note = accordo.replace(/[^A-G#b]/g, "");
        const enharmonic = enharmonicMap[note] || note;
        return enharmonic + "4";
    }

    function suonaAccordo(note) {
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synth.triggerAttackRelease(note, "2n");
    }

    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;

        let scala = tonalitaScale[tonalita];
        if (!scala) {
            risultato.innerHTML = "Errore: tonalità non trovata.";
            return;
        }

        const struttura = generi[genere][Math.floor(Math.random() * generi[genere].length)];
        const accordi = struttura.map(grado => gradoToAccordo(grado, scala));

        const accordiHtml = accordi.map(acc => {
            const midi = accordoToMidi(acc);
            return `<button class="accordo" onclick="Tone.start(); suonaAccordo(['${midi}'])">${acc}</button>`;
        }).join(" ");

        const output = `
            <p>Progressione generata (${genere} - ${tonalita}):</p>
            <div class="accordi">${accordiHtml}</div>
            <p style="font-size: 1.1em; margin-top: 10px;">Clicca su ogni accordo per ascoltarlo</p>
        `;

        risultato.innerHTML = output;
        localStorage.setItem("ultimaProgressione", output);
    }

    generaAccordiBtn.addEventListener("click", generaAccordi);
    window.suonaAccordo = suonaAccordo;
});
