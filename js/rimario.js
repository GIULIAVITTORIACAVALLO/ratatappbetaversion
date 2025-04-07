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

        // Salva nel Local Storage
        localStorage.setItem("ultimaParola", parola);
        localStorage.setItem("ultimeRime", JSON.stringify(rimeTrovate));

        output.innerText = "Rime trovate: " + rimeTrovate.join(", ");
    } catch (error) {
        console.error("Errore nella richiesta API:", error);
        output.innerText = "Errore nel recupero delle rime.";
    }
}

// Recupera i dati salvati nel Local Storage all'apertura della pagina
window.onload = function () {
    const ultimaParola = localStorage.getItem("ultimaParola");
    const ultimeRime = localStorage.getItem("ultimeRime");

    if (ultimaParola && ultimeRime) {
        document.getElementById("parola").value = ultimaParola;
        document.getElementById("outputRime").innerText = "Rime trovate: " + JSON.parse(ultimeRime).join(", ");
    }
};
