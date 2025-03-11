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
async function trovaRime() {
    const parola = document.getElementById("parola").value.toLowerCase();
    const output = document.getElementById("outputRime");

    if (parola.length < 2) {
        output.innerText = "Inserisci una parola più lunga.";
        return;
    }

    try {
        // Chiamata API per ottenere rime in italiano
        const response = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${parola}&lang=it`);
        const data = await response.json();

        if (data.length === 0) {
            output.innerText = "Nessuna rima trovata.";
            return;
        }

        // Estrai solo le parole dalle rime trovate
        const rimeTrovate = data.map(entry => entry.word);

        output.innerText = "Rime trovate: " + rimeTrovate.join(", ");
    } catch (error) {
        console.error("Errore nella richiesta API:", error);
        output.innerText = "Errore nel recupero delle rime.";
    }
}

// Assegna la funzione al pulsante
document.getElementById("trovaRime").addEventListener("click", trovaRime);
