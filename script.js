// Flash Cards – script.js
// Handles saving, rendering, revealing, and deleting flash cards via localStorage

(function () {
  const STORAGE_KEY = 'flashcards_data';

  // Only run card logic on the quiz page
  const saveBtn   = document.getElementById('saveBtn');
  const cardsList = document.getElementById('cardsList');
  const cardCount = document.getElementById('cardCount');

  if (!saveBtn || !cardsList) return;

  // Load cards from localStorage
  function getCards() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  // Save cards to localStorage
  function saveCards(cards) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }

  // Render all cards
  function renderCards() {
    const cards = getCards();

    // Update count badge
    if (cardCount) cardCount.textContent = cards.length;

    if (cards.length === 0) {
      cardsList.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🃏</span>
          <p>No cards yet. Create your first one!</p>
        </div>`;
      return;
    }

    cardsList.innerHTML = cards.map((card, index) => `
      <div class="flash-card-item" data-index="${index}">
        <div class="flash-card-subject">${escapeHTML(card.subject || 'General')}</div>
        <div class="flash-card-question">${escapeHTML(card.question)}</div>
        <div class="flash-card-answer" id="answer-${index}">${escapeHTML(card.answer)}</div>
        <div class="card-actions">
          <button class="btn-reveal" data-index="${index}">Show Answer</button>
          <button class="btn-delete" data-index="${index}">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // Escape HTML to prevent XSS
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Save a new card
  saveBtn.addEventListener('click', function () {
    const subject  = document.getElementById('subject')?.value.trim();
    const question = document.getElementById('question')?.value.trim();
    const answer   = document.getElementById('answer')?.value.trim();

    if (!question || !answer) {
      alert('Please fill in at least the Question and Answer fields.');
      return;
    }

    const cards = getCards();
    cards.unshift({ subject: subject || 'General', question, answer });
    saveCards(cards);
    renderCards();

    // Clear fields
    if (document.getElementById('subject'))  document.getElementById('subject').value  = '';
    if (document.getElementById('question')) document.getElementById('question').value = '';
    if (document.getElementById('answer'))   document.getElementById('answer').value   = '';
  });

  // Delegate reveal & delete clicks
  cardsList.addEventListener('click', function (e) {
    const index = e.target.dataset.index;
    if (index === undefined) return;

    if (e.target.classList.contains('btn-reveal')) {
      const answerEl = document.getElementById(`answer-${index}`);
      if (!answerEl) return;
      const isVisible = answerEl.classList.toggle('visible');
      e.target.textContent = isVisible ? 'Hide Answer' : 'Show Answer';
    }

    if (e.target.classList.contains('btn-delete')) {
      const cards = getCards();
      cards.splice(index, 1);
      saveCards(cards);
      renderCards();
    }
  });

  // Initial render
  renderCards();
})();
