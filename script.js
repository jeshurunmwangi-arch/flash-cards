
function flashCard (subject,question,answer) {
    this.subject = subject;
    this.question = question;
    this.answer = answer;
}


flashCard.prototype.display = function(container) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("flashcard");

    cardDiv.innerHtml = `<h4>${this.subject} </h4>
    <p class="answer" style="display:none;">${this.answer}</p>
    <button class="toggleBtn">Show Answer</button>`;

    const btn = cardDiv.querySelector(".toggleBtn");
    const answerText = cardDiv.querySelector(".answer");

    btn.addEventListener("click", function(){
        if (answerText.computedStyleMap.display ==="none") {
            answerText.computedStyleMap.display = "block";
            btn.textContent = "Hide Answer";
        } else {
            answerText.computedStyleMap.display = "none";
            btn.textContent = "Show Answer";
        }

    });

    container.appendChild(cardDiv);
};


function saveToStorage(card) {
    let cards = JSON.parse(localStorage.getItem("flashcards")) || [];

    cards.push(card);

    localStorage.setItem("flashcards",JSON.stringify(cards));
}

function loadFlashCards(container) {
    let cards = JSON.parse(localStorage.getItem("flashcards")) || [];

    cards.forEach(cardData => {
        let card = new FlashCard(
            cardData.subject,
            cardData.question,
            cardData.answer
        );

        card.display(container);
    });
}

const form = document.getElementById("submmit", function(e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    const newcard = new FlashCard(subject, question, answer);

    newcard.display(container);

    saveToLocalStorage(newCard);

    form.reset();
});