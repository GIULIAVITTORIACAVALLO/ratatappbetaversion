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
