document.addEventListener("DOMContentLoaded", function () {
    const parolaInput = document.getElementById("parola");
    const trovaBtn = document.getElementById("trova");
    const risultato = document.getElementById("risultato");

    // Dizionario di rime base (da espandere con un database API in futuro)
    const dizionarioRime = {
        "amore": ["fiore", "cuore", "errore", "rumore", "calore", "favore"],
        "sole": ["cuole", "mole", "viole", "scuole"],
        "mare": ["amare", "sognare", "cantare", "volare", "parlare"],
        "notte": ["rotte", "botte", "lotte", "sotto"],
        "cielo": ["velo", "anello", "bello", "castello"]
    };

    function trovaRime() {
        let parola = parolaInput.value.toLowerCase();
        let rimePerfette = dizionarioRime[parola] || [];
        let rimeAssonanti = [];
        let rimeConsonanti = [];

        if (rimePerfette.length === 0) {
            for (let chiave in dizionarioRime) {
                if (chiave.endsWith(parola.slice(-2))) {
                    rimeAssonanti.push(...dizionarioRime[chiave]);
                }
                if (chiave.includes(parola.slice(0, 2))) {
                    rimeConsonanti.push(...dizionarioRime[chiave]);
                }
            }
        }

        if (rimePerfette.length > 0 || rimeAssonanti.length > 0 || rimeConsonanti.length > 0) {
            risultato.innerHTML = `
                <strong>Rime Perfette:</strong> ${rimePerfette.join(", ")}<br>
                <strong>Rime Assonanti:</strong> ${rimeAssonanti.join(", ")}<br>
                <strong>Rime Consonanti:</strong> ${rimeConsonanti.join(", ")}
            `;
        } else {
            risultato.innerText = "Nessuna rima trovata!";
        }
    }

    trovaBtn.addEventListener("click", trovaRime);
});
