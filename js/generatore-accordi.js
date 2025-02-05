function generaAccordi() {
    const tonalita = document.getElementById("tonalita").value;
    const progressioni = {
        "C": [["C", "G", "Am", "F"], ["C", "Em", "F", "G"], ["C", "Am", "Dm", "G"]],
        "Cm": [["Cm", "Ab", "Bb", "Eb"], ["Cm", "Gm", "Ab", "Bb"], ["Cm", "Fm", "G", "Cm"]],
        "D": [["D", "A", "Bm", "G"], ["D", "F#m", "G", "A"], ["D", "Bm", "Em", "A"]],
        "Dm": [["Dm", "Bb", "C", "F"], ["Dm", "Am", "Bb", "C"], ["Dm", "Gm", "A", "Dm"]],
        "E": [["E", "B", "C#m", "A"], ["E", "G#m", "A", "B"], ["E", "C#m", "F#m", "B"]],
        "Em": [["Em", "C", "D", "G"], ["Em", "Bm", "C", "D"], ["Em", "Am", "B", "Em"]],
        "F": [["F", "C", "Dm", "Bb"], ["F", "Am", "Bb", "C"], ["F", "Dm", "Gm", "C"]],
        "Fm": [["Fm", "Db", "Eb", "Ab"], ["Fm", "Cm", "Db", "Eb"], ["Fm", "Bbm", "C", "Fm"]],
        "G": [["G", "D", "Em", "C"], ["G", "Bm", "C", "D"], ["G", "Em", "Am", "D"]],
        "Gm": [["Gm", "Eb", "F", "Bb"], ["Gm", "Dm", "Eb", "F"], ["Gm", "Cm", "D", "Gm"]],
        "A": [["A", "E", "F#m", "D"], ["A", "C#m", "D", "E"], ["A", "F#m", "Bm", "E"]],
        "Am": [["Am", "F", "G", "C"], ["Am", "Em", "F", "G"], ["Am", "Dm", "E", "Am"]],
        "B": [["B", "F#", "G#m", "E"], ["B", "D#m", "E", "F#"], ["B", "G#m", "C#m", "F#"]],
        "Bm": [["Bm", "G", "A", "D"], ["Bm", "F#m", "G", "A"], ["Bm", "Em", "F#", "Bm"]]
    };

    const progressioneCasuale = progressioni[tonalita][Math.floor(Math.random() * progressioni[tonalita].length)];
    document.getElementById("outputAccordi").innerText = "Progressione: " + progressioneCasuale.join(" - ");
}
