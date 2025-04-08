document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    // Mappa progressioni per generi
    const progressioniPerGenere = {
        "pop": [
            ["I", "V", "vi", "IV"],
            ["vi", "IV", "I", "V"],
            ["I", "vi", "ii", "V"]
        ],
        "rock": [
            ["I", "bVII", "IV", "I"],
            ["i", "bVI", "bIII", "bVII"],
            ["I", "IV", "V", "bVII"]
        ],
        "cantautorato": [
            ["I", "iii", "IV", "ii", "V", "I"],
            ["I", "IV", "ii", "V", "iii", "vi", "IV", "V"]
        ],
        "jazz": [
            ["ii7", "V7", "Imaj7", "vi7"],
            ["Imaj7", "vi7", "ii7", "V7"],
            ["iiø7", "V7", "i7", "bVImaj7"]
        ]
    };

    // Scale con alterazioni
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

    const enharmonics = {
        "Bb": "A#",
        "Eb": "D#",
        "Ab": "G#",
        "Db": "C#",
        "Gb": "F#",
        "Cb": "B",
        "Fb": "E",
        "B#": "C",
        "E#": "F"
    };

    function convertForPlayback(chord) {
        return chord.replace(/[A-G](#|b)?/, match => enharmonics[match] || match);
    }

    function suonaAccordo(nota) {
        const synth = new Tone.PolySynth().toDestination();
        const now = Tone.now();
        synth.triggerAttackRelease(nota + "3", "1n", now);
    }

    window.suonaAccordo = suonaAccordo;

    function riproduciProgressione(noteArray) {
        const synth = new Tone.PolySynth().toDestination();
        let now = Tone.now();
        noteArray.forEach((nota, i) => {
            synth.triggerAttackRelease(nota + "3", "1n", now + i);
        });
    }

    window.riproduciProgressione = riproduciProgressione;

    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        const isMinore = tonalita.includes("m");
        const scala = isMinore ? tonalitaMinori[tonalita] : tonalitaMaggiori[tonalita];

        if (!scala) {
            risultato.innerHTML = "Errore: tonalità non trovata.";
            return;
        }

        const progressioni = progressioniPerGenere[genere] || [["I", "IV", "V", "I"]];
        const progressione = progressioni[Math.floor(Math.random() * progressioni.length)];

        const gradi = {
            "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "vii": 6,
            "i": 0, "iv": 3, "v": 4, "VI": 5, "III": 2, "VII": 6,
            "bIII": 2, "bVI": 5, "bVII": 6, "ii7": 1, "V7": 4, "Imaj7": 0,
            "vi7": 5, "iiø7": 1, "i7": 0, "bVImaj7": 5
        };

        const accordi = progressione.map(grado => {
            let baseGrado = grado.replace(/[^A-Za-z]/g, "");
            let index = gradi[baseGrado];
            if (index === undefined) return grado;

            let nota = scala[index];
            if (!nota) return grado;

            // Mantieni suffissi come m, 7, maj7
            const suffisso = grado.replace(baseGrado, "");
            return nota + suffisso;
        });

        let visualeHTML = "";
        let playbackArray = [];

        accordi.forEach(ac => {
            const playback = convertForPlayback(ac);
            playbackArray.push(`"${playback}"`);
            visualeHTML += `<button onclick="suonaAccordo('${playback}')" class="accordo-btn">${ac}</button> `;
        });

        risultato.innerHTML = `
            <p>Progressione generata (${genere} - ${tonalita}):</p>
            <div style="margin-bottom: 0.5em;">${visualeHTML}</div>
            <p style="font-size: 1.1em; font-weight: 500; color: #444;">🎵 Clicca su ogni accordo per ascoltarlo</p>
            <button onclick='riproduciProgressione([${playbackArray.join(",")}])'>▶️ Suona la progressione</button>
        `;

        localStorage.setItem("ultimaProgressione", risultato.innerHTML);
    }

    // Caricamento progressione salvata
    const ultimaProgressione = localStorage.getItem("ultimaProgressione");
    if (ultimaProgressione) {
        risultato.innerHTML = ultimaProgressione;
    }

    generaAccordiBtn.addEventListener("click", generaAccordi);
});
