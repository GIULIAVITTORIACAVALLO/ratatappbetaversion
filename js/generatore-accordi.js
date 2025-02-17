document.addEventListener("DOMContentLoaded", function () {
    const tonalitaSelect = document.getElementById("tonalita");
    const genereSelect = document.getElementById("genere");
    const generaButton = document.getElementById("genera");
    const risultatoDiv = document.getElementById("risultato");

    // Tonalità con relativi accordi
    const tonalita = {
        "Do maggiore": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        "La minore": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
        "Sol maggiore": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        "Mi minore": ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
        "Re maggiore": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        "Si minore": ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
        "La maggiore": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
        "Fa# minore": ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
        "Mi maggiore": ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
        "Do# minore": ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"],
        "Si maggiore": ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
        "Sol# minore": ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"],
        "Fa maggiore": ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
        "Re minore": ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"],
        "Sib maggiore": ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"],
        "Sol minore": ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
        "Mib maggiore": ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Dd"],
        "Do minore": ["Cm", "Dd", "Eb", "Fm", "Gm", "Ab", "Bb"],
        "Lab maggiore": ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
        "Fa minore": ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"]
    };

    // Progressioni comuni
    const progressioni = [
        [1, 5, 6, 4], // I - V - vi - IV (pop)
        [2, 5, 1, 6], // ii - V - I - vi (jazz)
        [6, 4, 1, 5], // vi - IV - I - V (rock)
        [1, 6, 2, 5]  // I - vi - ii - V (classico)
    ];

    function generaProgressione() {
        const tonalitaScelta = tonalitaSelect.value;
        const genereScelto = genereSelect.value;

        if (!tonalitaScelta || !genereScelto) {
            risultatoDiv.innerHTML = "⚠️ Seleziona una tonalità e un genere!";
            return;
        }

        const scala = tonalita[tonalitaScelta];
        const giro = progressioni[Math.floor(Math.random() * progressioni.length)];
        const progressione = giro.map(grado => scala[grado - 1]);

        risultatoDiv.innerHTML = `<strong>Genere:</strong> ${genereScelto} <br> 
                                  <strong>Tonalità:</strong> ${tonalitaScelta} <br> 
                                  <strong>Progressione:</strong> ${progressione.join(" - ")}`;
    }

    generaButton.addEventListener("click", generaProgressione);
});
