document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");
    const ascoltaProgressioneBtn = document.getElementById("ascoltaProgressione");

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const enharmonicMap = {
        "Bb": "A#",
        "Eb": "D#",
        "Ab": "G#",
        "Db": "C#",
        "Gb": "F#"
    };

    const accordiSalvati = [];

    function convertiNotaPerTone(nota) {
        const base = nota.replace(/7|m7|maj7|dim|m|sus2|sus4|add9/g, "");
        const estensione = nota.replace(base, "");
        const notaTone = enharmonicMap[base] || base;
        return notaTone + "4"; // Ottava fissa
    }

    function generaAccordo(nota) {
        const base = nota.replace(/[^A-G#b]/g, "");
        const tipo = nota.replace(base, "");

        switch (tipo) {
            case "m": return [base, Tone.Frequency(base).transpose(3).toNote(), Tone.Frequency(base).transpose(7).toNote()];
            case "7": return [base, Tone.Frequency(base).transpose(4).toNote(), Tone.Frequency(base).transpose(10).toNote()];
            case "maj7": return [base, Tone.Frequency(base).transpose(4).toNote(), Tone.Frequency(base).transpose(11).toNote()];
            default: return [base, Tone.Frequency(base).transpose(4).toNote(), Tone.Frequency(base).transpose(7).toNote()];
        }
    }

    function suonaAccordo(ac) {
        const note = generaAccordo(convertiNotaPerTone(ac));
        synth.triggerAttackRelease(note, "1n");
    }

    ascoltaProgressioneBtn.addEventListener("click", async () => {
        await Tone.start();
        let i = 0;
        function suonaSuccessivo() {
            if (i < accordiSalvati.length) {
                suonaAccordo(accordiSalvati[i]);
                i++;
                setTimeout(suonaSuccessivo, 1500);
            }
        }
        suonaSuccessivo();
    });

    generaAccordiBtn.addEventListener("click", () => {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        let tipo = tonalita.includes("m") ? "minore" : "maggiore";

        // Progressioni complesse e coerenti con il genere
        const progressioni = {
            pop: [["I", "V", "vi", "IV"], ["vi", "IV", "I", "V"], ["I", "vi", "ii", "V"]],
            rock: [["I", "bVII", "IV", "I"], ["i", "bVI", "bIII", "bVII"], ["I", "IV", "bVII", "I"]],
            cantautorato: [["I", "IV", "V7", "I"], ["ii", "V7", "I", "vi"], ["I", "vi", "IVmaj7", "V7"]],
            jazz: [["ii7", "V7", "Imaj7", "vi7"], ["Imaj7", "IVmaj7", "ii7", "V7"], ["iii7", "vi7", "ii7", "V7", "Imaj7"]]
        };

        const gradi = {
            "I": 0, "ii": 1, "iii": 2, "IV": 3, "V": 4, "vi": 5, "vii": 6,
            "i": 0, "iv": 3, "v": 4, "bIII": 2, "bVI": 5, "bVII": 6,
            "V7": 4, "IVmaj7": 3, "Imaj7": 0, "ii7": 1, "vi7": 5, "iii7": 2
        };

        const scale = {
            "C": ["C", "D", "E", "F", "G", "A", "B"],
            "G": ["G", "A", "B", "C", "D", "E", "F#"],
            "D": ["D", "E", "F#", "G", "A", "B", "C#"],
            "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
            "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
            "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
            "F": ["F", "G", "A", "Bb", "C", "D", "E"],
            "Cm": ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
            "Dm": ["D", "E", "F", "G", "A", "Bb", "C"],
            "Em": ["E", "F#", "G", "A", "B", "C", "D"],
            "Fm": ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
            "Gm": ["G", "A", "Bb", "C", "D", "Eb", "F"],
            "Am": ["A", "B", "C", "D", "E", "F", "G"],
            "Bm": ["B", "C#", "D", "E", "F#", "G", "A"]
        };

        const progression = progressioni[genere][Math.floor(Math.random() * progressioni[genere].length)];
        const scaleCorrente = scale[tonalita];

        if (!scaleCorrente) {
            risultato.innerHTML = "Tonalità non valida.";
            return;
        }

        const accordi = progression.map(grado => {
            const gradoPulito = grado.replace(/[^A-Za-z0-9]/g, "");
            const idx = gradi[gradoPulito];
            let nota = scaleCorrente[idx];
            if (!nota) return grado;

            // Ricostruzione con estensione
            if (grado.includes("7")) return nota + "7";
            if (grado.includes("maj7")) return nota + "maj7";
            if (grado.includes("m") && !grado.includes("maj7")) return nota + "m";

            return nota;
        });

        accordiSalvati.length = 0;
        accordi.forEach(a => accordiSalvati.push(a));

        risultato.innerHTML = `<p>Progressione generata (${genere} - ${tonalita}):</p>
        <div class="accordi">
            ${accordi.map(ac => `<button class="accordo-btn" onclick="suonaAccordo('${ac}')">${ac}</button>`).join(" ")}
        </div>`;
    });

    window.suonaAccordo = suonaAccordo;
});
