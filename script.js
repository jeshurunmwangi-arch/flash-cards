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
    })
}




function flashCard (subject,question,answer) {
    this.subject = subject;
    this.question = question;
    this.answer = answer;
}

