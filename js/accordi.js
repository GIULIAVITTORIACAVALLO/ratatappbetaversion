document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    const ultimaProgressione = localStorage.getItem("ultimaProgressione");
    if (ultimaProgressione) {
        risultato.innerHTML = ultimaProgressione;
    }

    const gradiMaggiore = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
    const gradiMinore = ["i", "ii°", "III", "iv", "v", "VI", "VII"];

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

    const accordiComuni = {
        "I": chord => chord,
        "ii": chord => chord + "m7",
        "iii": chord => chord + "m7",
        "IV": chord => chord + "maj7",
        "V": chord => chord + "7",
        "vi": chord => chord + "m",
        "vii°": chord => chord + "dim",
        "i": chord => chord + "m",
        "ii°": chord => chord + "dim",
        "III": chord => chord,
        "iv": chord => chord + "m7",
        "v": chord => chord + "m",
        "VI": chord => chord,
        "VII": chord => chord + "7"
    };

    const progressioniGenere = {
        cantautorato: [["I", "V", "vi", "IV", "I", "IV", "V", "I"]],
        pop: [["I", "V", "vi", "IV"], ["I", "vi", "IV", "V"], ["vi", "IV", "I", "V"]],
        rock: [["I", "IV", "V", "I"], ["I", "bVII", "IV", "I"], ["I", "IV", "vi", "V"]],
        jazz: [["ii", "V", "I", "vi", "ii", "V", "I"], ["I", "vi", "ii", "V7", "Imaj7"]]
    };

    function interscambioModale(scala, tipo) {
        if (tipo === "maggiore") {
            let scalaMinoreParallela = tonalitaMinori[scala[0] + "m"];
            return scalaMinoreParallela || scala;
        } else {
            let tonica = scala[0].replace("m", "");
            let scalaMaggioreParallela = tonalitaMaggiori[tonica];
            return scalaMaggioreParallela || scala;
        }
    }

    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        const tipo = tonalita.includes("m") ? "minore" : "maggiore";
        let scala = tipo === "maggiore" ? tonalitaMaggiori[tonalita] : tonalitaMinori[tonalita];

        if (!scala) {
            risultato.innerHTML = "Errore: tonalità non trovata.";
            return;
        }

        // Aggiunge varietà tramite interscambio modale
        const scalaSecondaria = interscambioModale(scala, tipo);
        const gradi = tipo === "maggiore" ? gradiMaggiore : gradiMinore;
        let progressioni = progressioniGenere[genere] || [["I", "IV", "V", "I"]];

        let progressione = progressioni[Math.floor(Math.random() * progressioni.length)];
        let accordi = progressione.map(grado => {
            let base;
            switch (grado) {
                case "I": base = scala[0]; break;
                case "ii": base = scala[1]; break;
                case "iii": base = scala[2]; break;
                case "IV": base = scala[3]; break;
                case "V": base = scala[4]; break;
                case "vi": base = scala[5]; break;
                case "vii°": base = scala[6]; break;
                case "i": base = scala[0]; break;
                case "ii°": base = scala[1]; break;
                case "III": base = scala[2]; break;
                case "iv": base = scala[3]; break;
                case "v": base = scala[4]; break;
                case "VI": base = scala[5]; break;
                case "VII": base = scala[6]; break;
                case "bVII": base = scalaSecondaria[6]; break;
                default: base = grado;
            }

            const modifica = accordiComuni[grado];
            return modifica ? modifica(base) : base;
        });

        let output = `<p>Progressione generata (${genere} - ${tonalita}):</p><h2>${accordi.join(" - ")}</h2>`;
        risultato.innerHTML = output;
        localStorage.setItem("ultimaProgressione", output);
    }

    generaAccordiBtn.addEventListener("click", generaAccordi);
});
