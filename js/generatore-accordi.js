document.getElementById("generaAccordi").addEventListener("click", function () {
    const tonalita = document.getElementById("tonalita").value;
    const tipoScala = document.getElementById("tipoScala").value;

    const scale = {
        maggiore: {
            C: ["C", "D", "E", "F", "G", "A", "B"],
            D: ["D", "E", "F#", "G", "A", "B", "C#"],
            E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
            F: ["F", "G", "A", "A#", "C", "D", "E"],
            G: ["G", "A", "B", "C", "D", "E", "F#"],
            A: ["A", "B", "C#", "D", "E", "F#", "G#"],
            B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        },
        minore: {
            C: ["Cm", "Ddim", "D#", "Fm", "Gm", "G#", "A#"],
            D: ["Dm", "Edim", "F", "Gm", "Am", "A#", "C"],
            E: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
            F: ["Fm", "Gdim", "G#", "A#m", "Cm", "C#", "D#"],
            G: ["Gm", "Adim", "A#", "Cm", "Dm", "D#", "F"],
            A: ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
            B: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
        },
    };

    const progressione = [];
    const scalaSelezionata = scale[tipoScala][tonalita];
    
    for (let i = 0; i < 4; i++) {
        let accordoCasuale = scalaSelezionata[Math.floor(Math.random() * scalaSelezionata.length)];
        progressione.push(accordoCasuale);
    }

    document.getElementById("risultatoAccordi").innerText = progressione.join(" - ");
});
