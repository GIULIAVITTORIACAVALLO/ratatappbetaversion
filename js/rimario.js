const dizionarioRime = {
    "amore": ["cuore", "fiore", "dolore", "onore"],
    "sole": ["mole", "scuole", "viole"],
    "mare": ["fare", "care", "volare"],
    "cane": ["pane", "urbane", "arcane"],
    "vita": ["gita", "finita", "infinita"]
};

function trovaRime() {
    const parola = document.getElementById("parola").value.toLowerCase();
    const rime = dizionarioRime[parola] || ["Nessuna rima trovata"];
    document.getElementById("outputRime").innerText = "Rime trovate: " + rime.join(", ");
}
