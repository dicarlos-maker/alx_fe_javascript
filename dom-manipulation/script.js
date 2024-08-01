let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Don't cry because it's over, smile because it happened.", category: "Happiness" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
  sessionStorage.setItem('lastQuote', `"${quote.text}" - ${quote.category}`);
}

function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  
  const newQuoteText = document.createElement('input');
  newQuoteText.id = 'newQuoteText';
  newQuoteText.type = 'text';
  newQuoteText.placeholder = 'Enter a new quote';

  const newQuoteCategory = document.createElement('input');
  newQuoteCategory.id = 'newQuoteCategory';
  newQuoteCategory.type = 'text';
  newQuoteCategory.placeholder = 'Enter quote category';

  const addQuoteButton = document.createElement('button');
  addQuoteButton.id = 'addQuoteButton';
  addQuoteButton.textContent = 'Add Quote';
  addQuoteButton.onclick = addQuote;

  formContainer.appendChild(newQuoteText);
  formContainer.appendChild(newQuoteCategory);
  formContainer.appendChild(addQuoteButton);

  document.body.appendChild(formContainer);
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
      alert("Please enter both a quote and a category.");
      return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes();

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
      document.getElementById('quoteDisplay').innerHTML = lastQuote;
  }
});
