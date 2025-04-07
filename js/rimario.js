function cercaRime() {
    const parola = document.getElementById("parola").value.toLowerCase();

    // Esempio fittizio - da sostituire con un vero dizionario di rime
    const rimePerfette = ["carro", "barro", "farro"].filter(p => p.endsWith(parola.slice(-3)));
    const rimeAssonanti = ["muro", "duro", "oscuro"].filter(p => p.includes(parola.slice(-2)));

    const listaPerfette = document.getElementById("rimePerfette");
    const listaAssonanti = document.getElementById("rimeAssonanti");

    listaPerfette.innerHTML = "";
    listaAssonanti.innerHTML = "";

    if (rimePerfette.length === 0) {
        listaPerfette.innerHTML = "<li>Nessuna rima perfetta trovata</li>";
    } else {
        rimePerfette.forEach(rima => {
            const li = document.createElement("li");
            li.innerText = rima;
            listaPerfette.appendChild(li);
        });
    }

    if (rimeAssonanti.length === 0) {
        listaAssonanti.innerHTML = "<li>Nessuna rima assonante trovata</li>";
    } else {
        rimeAssonanti.forEach(rima => {
            const li = document.createElement("li");
            li.innerText = rima;
            listaAssonanti.appendChild(li);
        });
    }
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
        document.getElementById("paro
