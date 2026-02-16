
function FlashCard (subject,question,answer) {
    this.subject = subject;
    this.question = question;
    this.answer = answer;
}



FlashCard.prototype.display = function(container) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("flashcard");
    
    cardDiv.innerHTML = `<h4>${this.subject} </h4>
    <p class="question">${this.question}</p>
    <p class="answer" style="display:none;">${this.answer}</p>
    <button class="toggleBtn">Show Answer</button>
    <button class="deleteBtn">Delete</button>
    `;

    const c = document.getElementById("flashcardContainer");
c.appendChild(cardDiv);

    const btn = cardDiv.querySelector(".toggleBtn");
   

    btn.addEventListener("click", function(){
        const answerText = cardDiv.querySelector(".answer");
        if (answerText.style.display ==="none") {
            answerText.style.display = "block";
            btn.textContent = "Hide Answer";
        } else {
            answerText.style.display = "none";
            btn.textContent = "Show Answer";
        }

    });

const deleteBtn = cardDiv.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", () => {
    deleteFromStorage(this);
    cardDiv.remove();
})

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

function deleteFromStorage(cardToDelete) {
    let cards = JSON.parse(localStorage.getItem("flashcards")) || [];

    cards = cards.filter(card =>
        !(card.subject === cardToDelete.subject &&
          card.question === cardToDelete.question && 
        card.answer === cardToDelete.answer)
    );

    localStorage.setItem("flashcards", JSON.stringify(cards));
}



const container = document.getElementById("flashcardContainer");
const form = document.getElementById("flashcardForm");
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    const newcard = new FlashCard(subject, question, answer);

    newcard.display(container);

    saveToStorage(newcard);

    form.reset();
})






window.addEventListener("DOMContentLoaded", function() {
  loadFlashCards(container);
});