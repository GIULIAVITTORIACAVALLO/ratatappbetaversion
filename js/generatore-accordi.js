// Mappa degli accordi per ogni tonalità con progressioni armoniche
const progressioni = {
    "C": [["C", "Am", "F", "G"], ["C", "Em", "Am", "F"], ["C", "G", "Am", "F"]],
    "A": [["Am", "F", "C", "G"], ["Am", "D", "G", "C"], ["Am", "Em", "F", "C"]],
    "G": [["G", "Em", "C", "D"], ["G", "Bm", "C", "D"], ["G", "D", "Em", "C"]],
    "E": [["Em", "C", "G", "D"], ["Em", "Am", "D", "G"], ["Em", "B7", "C", "G"]],
    "D": [["D", "Bm", "G", "A"], ["D", "F#m", "G", "A"], ["D", "A", "Bm", "G"]],
    "B": [["Bm", "G", "D", "A"], ["Bm", "E", "A", "D"], ["Bm", "F#m", "G", "D"]],
    "F": [["F", "Dm", "Bb", "C"], ["F", "Am", "Bb", "C"], ["F", "C", "Dm", "Bb"]],
    "D#": [["D#m", "B", "F#", "C#"], ["D#m", "A#", "B", "F#"], ["D#m", "G#m", "C#", "F#"]]
};

// Funzione per generare una progressione casuale
function generaProgressione() {
    const tonalita = document.getElementById("tonalita").value;
    const genere = document.getElementById("genere").value;
    
    if (!progressioni[tonalita]) {
        document.getElementById("accordi").innerText = "Nessuna progressione disponibile per questa tonalità.";
        return;
    }

    // Seleziona casualmente una progressione dalla tonalità scelta
    const progressioneCasuale = progressioni[tonalita][Math.floor(Math.random() * progressioni[tonalita].length)];

    // Aggiungi variazioni in base al genere musicale
    let progressioneModificata = [...progressioneCasuale];
    if (genere === "jazz") {
        progressioneModificata = progressioneCasuale.map(acc => acc + "7"); // Accordi con settime
    } else if (genere === "rock") {
        progressioneModificata = progressioneCasuale.map(acc => acc.replace("m", "5")); // Power chords
    }

    // Mostra la progressione generata
    document.getElementById("accordi").innerText = progressioneModificata.join(" - ");
}
