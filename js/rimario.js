function trovaRime() {
    const parolaInput = document.getElementById("parolaInput").value.trim().toLowerCase();
    if (!parolaInput) return;

    fetch(`https://rime.retrica.dev/api/rime/${parolaInput}`)
        .then(response => response.json())
        .then(data => {
            const perfette = data.rime || [];
            const assonanti = data.assonanze || [];

            mostraRime(perfette, "rimePerfette", "Rime Perfette");
            mostraRime(assonanti, "rimeAssonanti", "Rime Assonanti/Consonanti");
        })
        .catch(error => console.error("Errore nella richiesta delle rime:", error));
}

function mostraRime(lista, elementoId, titolo) {
    const contenitore = document.getElementById(elementoId);
    contenitore.innerHTML = `<h3>${titolo}</h3>`;

    if (lista.length === 0) {
        contenitore.innerHTML += "<p>Nessuna rima trovata.</p>";
        return;
    }

    const ul = document.createElement("ul");
    lista.forEach(rima => {
        const li = document.createElement("li");
        li.textContent = rima;
        ul.appendChild(li);
    });

    contenitore.appendChild(ul);
}
