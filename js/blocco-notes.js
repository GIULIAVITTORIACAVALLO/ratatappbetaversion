document.addEventListener("DOMContentLoaded", function () {
    const noteArea = document.getElementById("note-area");
    const saveBtn = document.getElementById("save-note");
    const clearBtn = document.getElementById("clear-note");

    // Carica il contenuto salvato
    noteArea.value = localStorage.getItem("bloccoNote") || "";

    // Salva la nota nel localStorage
    saveBtn.addEventListener("click", function () {
        localStorage.setItem("bloccoNote", noteArea.value);
        alert("Nota salvata!");
    });

    // Cancella il contenuto
    clearBtn.addEventListener("click", function () {
        noteArea.value = "";
        localStorage.removeItem("bloccoNote");
    });
});
