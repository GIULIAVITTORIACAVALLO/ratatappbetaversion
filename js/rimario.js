function trovaRime() {
    const parola = document.getElementById("parola").value.toLowerCase();
    const rime = {
        "cane": ["pane", "mare", "fame"],
        "sole": ["mole", "scuole", "amore"],
        "amore": ["fiore", "cuore", "errore"]
    };
    document.getElementById("risultati").textContent = rime[parola] ? "Rime: " + rime[parola].join(", ") : "Nessuna rima trovata.";
}
