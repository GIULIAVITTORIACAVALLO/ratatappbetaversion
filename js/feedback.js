document.addEventListener("DOMContentLoaded", function () {
    mostraFeedback(); // Mostra i feedback salvati all'avvio

    document.getElementById("feedbackForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value;
        let commento = document.getElementById("commento").value;

        if (nome && commento) {
            let feedback = { nome: nome, commento: commento };
            salvaFeedback(feedback);
            mostraFeedback();
            document.getElementById("feedbackForm").reset();
        }
    });
});

function salvaFeedback(feedback) {
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    feedbackList.push(feedback);
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
}

function mostraFeedback() {
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    let listaFeedback = document.getElementById("listaFeedback");
    listaFeedback.innerHTML = "";

    feedbackList.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("feedback-item");
        div.innerHTML = `<strong>${item.nome}:</strong> ${item.commento} <button onclick="eliminaFeedback(${index})">❌</button>`;
        listaFeedback.appendChild(div);
    });
}

function eliminaFeedback(index) {
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    feedbackList.splice(index, 1);
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
    mostraFeedback();
}
