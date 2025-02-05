document.addEventListener("DOMContentLoaded", function () {
    const parolaInput = document.getElementById("parola");
    const trovaBtn = document.getElementById("trova");
    const output = document.getElementById("output");

    async function trovaRime() {
        const parola = parolaInput.value.trim().toLowerCase();
        if (!parola) {
            output.textContent = "Inserisci una parola!";
            return;
        }

        try {
            const response = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${parola}`);
            const data = await response.json();

            if (data.length === 0) {
                output.textContent = "Nessuna rima trovata.";
            } else {
                const rime = data.map(entry => entry.word);
                output.innerHTML = "<strong>Rime trovate:</strong> " + rime.join(", ");
            }
        } catch (error) {
            output.textContent = "Errore nel recupero delle rime.";
        }
    }

    trovaBtn.addEventListener("click", trovaRime);
});
