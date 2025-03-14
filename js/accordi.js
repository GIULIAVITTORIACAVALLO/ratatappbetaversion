document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const risultato = document.getElementById("risultatoAccordi");
    const generaAccordiBtn = document.getElementById("generaAccordi");

    // Recupera l'ultima progressione salvata
    const ultimaProgressione = localStorage.getItem("ultimaProgressione");
    if (ultimaProgressione) {
        risultato.innerHTML = ultimaProgressione;
    }

    // Mappa delle progressioni armoniche
    const progressioni = {
        "maggiore": [
            ["I", "IV", "V", "I"],
            ["I", "V", "vi", "IV"],
            ["ii", "V", "I", "vi"],
            ["I", "vi", "IV", "V"]
        ],
        "minore": [
            ["i", "iv", "V", "i"],
            ["i", "VI", "III", "VII"],
            ["i", "V", "VII", "IV"],
            ["i", "iv", "VII", "III"]
        ]
    };

    // Definizione delle scale maggiori e minori con alterazioni corrette
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
        "Cm": ["Cm", "D", "Eb", "F", "G", "Ab", "Bb"],
        "Dm": ["Dm", "E", "F", "G", "A", "Bb", "C"],
        "Em": ["Em", "F#", "G", "A", "B", "C", "D"],
        "Fm": ["Fm", "G", "Ab", "Bb", "C", "Db", "Eb"],
        "Gm": ["Gm", "A", "Bb", "C", "D", "Eb", "F"],
        "Am": ["Am", "B", "C", "D", "E", "F", "G"],
        "Bm": ["Bm", "C#", "D", "E", "F#", "G", "A"]
    };

    // Funzione per generare accordi
    function generaAccordi() {
        const tonalita = tonalitaSelect.value;
        const genere = genereSelect.value;
        let tipo = tonalita.includes("m") ? "minore" : "maggiore";
        let scala = tipo === "maggiore" ? tonalitaMaggiori[tonalita] : tonalitaMinori[tonalita];

        if (!scala) {
            risultato.innerHTML = "Errore: tonalità non trovata.";
            return;
        }

        let progressione = progressioni[tipo][Math.floor(Math.random() * progressioni[tipo].length)];
        let accordi = progressione.map(grado => {
            switch (grado) {
                case "I": return scala[0];
                case "ii": return scala[1] + "m";
                case "iii": return scala[2] + "m";
                case "IV": return scala[3];
                case "V": return scala[4];
                case "vi": return scala[5] + "m";
                case "VII": return scala[6];
                case "i": return scala[0] + "m";
                case "iv": return scala[3] + "m";
                case "VI": return scala[5];
                case "III": return scala[2];
                default: return grado;
            }
        });

        let output = `<p>Progressione generata (${genere} - ${tonalita}):</p><h2>${accordi.join(" - ")}</h2>`;

        // Mostra il risultato
        risultato.innerHTML = output;

        // Salva la progressione nel Local Storage
        localStorage.setItem("ultimaProgressione", output);
    }

    // Assegna l'evento al pulsante
    generaAccordiBtn.addEventListener("click", generaAccordi);
});
