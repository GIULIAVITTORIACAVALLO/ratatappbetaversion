async function trovaRime() {
    const parola = document.getElementById("parola").value.toLowerCase();
    const rimePerfette = document.getElementById("rime-perfette");
    const rimeAssonanti = document.getElementById("rime-assonanti");

    rimePerfette.innerHTML = "";
    rimeAssonanti.innerHTML = "";

    if (parola.length < 2) {
        rimePerfette.innerHTML = "<li>Inserisci una parola più lunga.</li>";
        return;
    }

    try {
        const response = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${parola}&lang=it`);
        const data = await response.json();

        if (data.length === 0) {
            rimePerfette.innerHTML = "<li>Nessuna rima trovata.</li>";
            return;
        }

        // Dividi le rime in base allo score (più è alto, più è perfetta)
        const perfette = data.filter(entry => entry.score >= 300).map(entry => entry.word);
        const assonanti = data.filter(entry => entry.score < 300).map(entry => entry.word);

        // Mostra in HTML
        perfette.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            rimePerfette.appendChild(li);
        });

        assonanti.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            rimeAssonanti.appendChild(li);
        });

        // Salva nel Local Storage
        localStorage.setItem("ultimaParola", parola);
        localStorage.setItem("rimePerfette", JSON.stringify(perfette));
        localStorage.setItem("rimeAssonanti", JSON.stringify(assonanti));

    } catch (error) {
        console.error("Errore nella richiesta API:", error);
        rimePerfette.innerHTML = "<li>Errore nel recupero delle rime.</li>";
    }
}

window.onload = function () {
    const ultimaParola = localStorage.getItem("ultimaParola");
    const perfette = JSON.parse(localStorage.getItem("rimePerfette") || "[]");
    const assonanti = JSON.parse(localStorage.getItem("rimeAssonanti") || "[]");

    if (ultimaParola) {
        document.getElementById("parola").value = ultimaParola;

        perfette.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            document.getElementById("rime-perfette").appendChild(li);
        });

        assonanti.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            document.getElementById("rime-assonanti").appendChild(li);
        });
    }
};
