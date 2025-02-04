function generaProgressione() {
    const tonalita = document.getElementById("tonalita").value;
    const progressioni = {
        "C": ["C", "Am", "F", "G"],
        "G": ["G", "Em", "C", "D"],
        "D": ["D", "Bm", "G", "A"],
        "A": ["A", "F#m", "D", "E"],
        "E": ["E", "C#m", "A", "B"],
        "B": ["B", "G#m", "E", "F#"],
        "F#": ["F#", "D#m", "B", "C#"],
        "Db": ["Db", "Bbm", "Gb", "Ab"]
    };
    document.getElementById("output").textContent = "Progressione: " + progressioni[tonalita].join(" - ");
}
