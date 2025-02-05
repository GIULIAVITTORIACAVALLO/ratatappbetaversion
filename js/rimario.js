document.addEventListener("DOMContentLoaded", function () {
    const trovaRimeButton = document.getElementById("trovaRime");
    const parolaInput = document.getElementById("parolaInput");
    const risultatiDiv = document.getElementById("risultatiRime");

    // Funzione per trovare rime
    trovaRimeButton.addEventListener("click", function () {
        const parola = parolaInput.value.trim().toLowerCase();
        if (parola === "") {
            risultatiDiv.innerHTML = "<p>Inserisci una parola per trovare le rime.</p>";
            return;
        }

        fetch(`https://rimar.io/api/${parola}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let html = "<h3>Rime trovate:</h3><ul>";
                    data.forEach(rima => {
                        html += `<li>${rima}</li>`;
                    });
                    html += "</ul>";
                    risultatiDiv.innerHTML = html;
                } else {
                    risultatiDiv.innerHTML = "<p>Nessuna rima trovata.</p>";
                }
            })
            .catch(error => {
                console.error("Errore nella ricerca delle rime:", error);
                risultatiDiv.innerHTML = "<p>Errore nella ricerca delle rime.</p>";
            });
    });
});
