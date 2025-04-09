document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const strumentoSelect = document.getElementById("strumento");
    const ottavaSelect = document.getElementById("ottava");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    const enharmonics = {
        "Bb": "A#",
        "Eb": "D#",
        "Ab": "G#",
        "Db": "C#",
        "Gb": "F#"
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

    const progressioniPerGenere = {
        pop: [["I", "V", "vi", "IV"], ["I", "vi", "IV", "V"], ["I", "iii", "vi", "IV"]],
        rock: [["i", "bVII", "bVI", "V"], ["i", "iv", "V", "i"], ["i", "VI", "III", "VII"]],
        jazz: [["ii7", "V7", "Imaj7", "vi7"], ["Imaj7", "vi7", "ii7", "V7"], ["iii7", "VI7", "ii7", "V7"]],
        cantautorato: [["I", "IV", "I", "V"], ["I", "V", "vi", "iii"], ["ii", "V", "I", "IV"]]
    };

    generaAccordiBtn.addEventListener("click", function () {
        const tonalita = tonalitaSelect.value;
        const tipo = tonalita.includes("m") ? "minore" : "maggiore";
        const scala = tipo === "maggiore" ? tonalitaMaggiori[tonalita] : tonalitaMinori[tonalita];
        const genere = genereSelect.value;
        const strumento = strumentoSelect.value;
        const ottava = ottavaSelect.value;

        if (!scala || !progressioniPerGenere[genere]) {
            risultato.innerHTML = "Errore nella selezione.";
            return;
        }

        const progressione = progressioniPerGenere[genere][Math.floor(Math.random() * progressioniPerGenere[genere].length)];
        let accordi = [];

        progressione.forEach(grado => {
            let index;
            let suffix = "";

            switch (grado.replace(/[^\w]/g, "")) {
                case "I": index = 0; break;
                case "ii": case "ii7": index = 1; suffix = grado.includes("7") ? "m7" : "m"; break;
                case "iii": case "iii7": index = 2; suffix = grado.includes("7") ? "m7" : "m"; break;
                case "IV": index = 3; break;
                case "V": case "V7": index = 4; suffix = grado.includes("7") ? "7" : ""; break;
                case "vi": case "vi7": index = 5; suffix = grado.includes("7") ? "m7" : "m"; break;
                case "VII": index = 6; break;
                case "i": case "i7": index = 0; suffix = grado.includes("7") ? "m7" : "m"; break;
                case "bVII": index = 6; break;
                case "bVI": index = 5; break;
                case "III": index = 2; break;
            }

            let nota = scala?.[index];
            accordi.push({
                visuale: nota + suffix,
                suono: (enharmonics[nota] || nota) + ottava,
                tipo: suffix
            });
        });

        risultato.innerHTML = `<p>Progressione generata (${genere} - ${tonalita}):</p>` +
            accordi.map(acc => `<button class="accordo" data-nota="${acc.suono}" data-tipo="${acc.tipo}">${acc.visuale}</button>`).join(" ");

        document.querySelectorAll(".accordo").forEach(btn => {
            btn.addEventListener("click", () => {
                const nota = btn.dataset.nota;
                const tipo = btn.dataset.tipo;

                let synth = new Tone[strumento]().toDestination();
                let accordo = generaAccordo(nota, tipo);
                Tone.start();
                synth.triggerAttackRelease(accordo, "2n");
            });
        });
    });

    function generaAccordo(notaBase, tipo) {
        const semi = {
            "C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4,
            "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9,
            "A#": 10, "B": 11
        };
        const reverse = Object.keys(semi);
        const nota = notaBase.slice(0, -1);
        const ottava = parseInt(notaBase.slice(-1));
        const root = semi[nota];
        const octave = ottava;

        let intervalli = tipo === "m" ? [0, 3, 7] :
                         tipo === "m7" ? [0, 3, 7, 10] :
                         tipo === "7" ? [0, 4, 7, 10] :
                         tipo === "maj7" || tipo === "Imaj7" ? [0, 4, 7, 11] :
                         tipo === "m9" ? [0, 3, 7, 10, 14] :
                         [0, 4, 7]; // default maggiore

        return intervalli.map(semiTono => {
            const notaMidi = root + semiTono;
            const notaIndex = notaMidi % 12;
            const ottavaFinale = octave + Math.floor(notaMidi / 12);
            return reverse[notaIndex] + ottavaFinale;
        });
    }
});
