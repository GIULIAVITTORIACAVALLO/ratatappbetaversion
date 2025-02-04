document.addEventListener("DOMContentLoaded", function () {
    const inputParola = document.getElementById("parola");
    const cercaButton = document.getElementById("cercaRime");
    const outputRime = document.getElementById("outputRime");

    async function trovaRime(parola) {
        outputRime.textContent = "Sto cercando rime...";

        try {
            let response = await fetch(`https://rime-cercatore-api.com/rime?parola=${parola}`);
            let dati = await response.json();

            if (dati.rime.length > 0) {
                outputRime.innerHTML = `<strong>Rime trovate:</strong> ${dati.rime.join(", ")}`;
            } else {
                outputRime.textContent = "Nessuna rima trovata.";
            }
        } catch (error) {
            outputRime.textContent = "Errore nel recupero delle rime.";
        }
    }

    cercaButton.addEventListener("click", function () {
        let parola = inputParola.value.trim().toLowerCase();
        if (parola) {
            trovaRime(parola);
        } else {
            outputRime.textContent = "Inserisci una parola per cercare rime.";
        }
    });
});
