let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Don't cry because it's over, smile because it happened.", category: "Happiness" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
      document.getElementById('quoteDisplay').innerHTML = 'No quotes available for the selected category.';
      return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
  sessionStorage.setItem('lastQuote', `"${quote.text}" - ${quote.category}`);
}

function getFilteredQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === 'all') {
      return quotes;
  }
  return quotes.filter(quote => quote.category === selectedCategory);
}

function filterQuotes() {
  showRandomQuote();
  localStorage.setItem('selectedCategory', document.getElementById('categoryFilter').value);
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

function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
      categoryFilter.value = savedCategory;
  }
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
  populateCategories();

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
      populateCategories();
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  populateCategories();
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
      document.getElementById('quoteDisplay').innerHTML = lastQuote;
  }
  filterQuotes();
});
