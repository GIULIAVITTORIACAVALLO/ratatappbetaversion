document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    const enharmonicMap = {
        "Bb": "A#",
        "Db": "C#",
        "Eb": "D#",
        "Gb": "F#",
        "Ab": "G#"
    };

    // Scales
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

    const progressioniPerGenere = {
        "pop": [["I", "V", "vi", "IV", "I"], ["vi", "IV", "I", "V"]],
        "rock": [["i", "bVII", "bVI", "V"], ["i", "iv", "bIII", "bVI", "V"]],
        "jazz": [["ii7", "V7", "Imaj7", "vi7", "ii7", "V7", "Imaj7"]],
        "cantautorato": [["I", "vi", "IV", "V", "iii", "vi", "ii", "V"]],
        "classico": [["I", "IV", "V", "I", "vi", "ii", "V", "I"]],
        "funk": [["I7", "IV7", "V7", "I7", "ii7", "V7", "I7"]],
    };

    function gradoToAccordo(grado, scala) {
        const gradi = {
            "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "vii": 6,
            "i": 0, "iv": 3, "v": 4, "bIII": 2, "bVI": 5, "bVII": 6
        };

        let index = gradi[grado.replace(/[7majmin]+/g, "")];
        let nota = scala[index];
        if (!nota) return grado;

        let notazioneTone = enharmonicMap[nota] || nota;

        let estensione = grado.match(/7|maj7|min7|dim|aug|sus[24]?/) || "";
        let suffix = estensione[0] || "";

        return {
            visuale: nota + suffix,
            playback: notazioneTone + suffix
        };
    }

    async function riproduciAccordo(nota) {
        await Tone.start();
        const synth = new Tone.PolySynth().toDestination();
        synth.triggerAttackRelease([nota, Tone.Frequency(nota).transpose(4), Tone.Frequency(nota).transpose(7)], "1n");
    }

    async function riproduciProgressione(playbackArray) {
        await Tone.start();
        const synth = new Tone.PolySynth().toDestination();
        let delay = 0;
        for (let nota of playbackArray) {
            Tone.Transport.scheduleOnce((time) => {
                synth.triggerAttackRelease([nota, Tone.Frequency(nota).transpose(4), Tone.Frequency(nota).transpose(7)], "1n", time);
            }, delay);
            delay += 1.5;
        }
        Tone.Transport.start("+0.1");
    }

    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        let tipo = tonalita.includes("m") ? "minore" : "maggiore";
        let scala = tipo === "maggiore" ? tonalitaMaggiori[tonalita] : tonalitaMinori[tonalita];
        if (!scala) {
            risultato.innerHTML = "Errore: tonalità non trovata.";
            return;
        }

        const progressioni = progressioniPerGenere[genere] || [["I", "V", "vi", "IV"]];
        const scelta = progressioni[Math.floor(Math.random() * progressioni.length)];

        const accordi = scelta.map(grado => gradoToAccordo(grado, scala));
        let visualeHTML = accordi.map(acc =>
            `<button class="accordo-btn" onclick="riproduciAccordo('${acc.playback}')">${acc.visuale}</button>`
        ).join(" ");

        risultato.innerHTML = `
            <p>Progressione generata (${genere} - ${tonalita}):</p>
            <div style="margin-bottom: 1em;">${visualeHTML}</div>
            <button onclick='riproduciProgressione([${accordi.map(a => `"${a.playback}"`).join(",")}])'>
                ▶️ Suona la progressione
            </button>
        `;

        localStorage.setItem("ultimaProgressione", risultato.innerHTML);
    }

    generaAccordiBtn.addEventListener("click", generaAccordi);
    window.riproduciAccordo = riproduciAccordo;
    window.riproduciProgressione = riproduciProgressione;
});
