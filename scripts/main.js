let myLibrary = [];

// Check local storage and render library books on page load
const storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
if (storedLibrary) {
    myLibrary = storedLibrary;
}
renderBooks(myLibrary);

// Toggle display of form for adding new book
const buttonAdd = document.getElementById('add-book');
const buttonCancel = document.getElementById('cancel-btn');
const formDiv = document.getElementById('bookFormDiv');
buttonAdd.addEventListener('click', () => formDiv.classList.remove('d-none'));
buttonCancel.addEventListener('click', () => formDiv.classList.add('d-none'));

// Show custom error message if 'pages' input is invalid
const pagesInput = document.getElementById('pages');
pagesInput.addEventListener('input', () => {
  pagesInput.setCustomValidity('');
  pagesInput.checkValidity();
});
pagesInput.addEventListener('invalid', () => {
    pagesInput.setCustomValidity('Please enter only digits!');
});

// On form submit add new book to myLibrary and DOM
const form = document.getElementById('newBookForm');
form.addEventListener('submit', addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault();
    const title = form.querySelector('#title').value;
    const author = form.querySelector('#author').value;
    const pages = form.querySelector('#pages').value;
    const finished = form.querySelector('#finished').checked;
    form.reset();
    const newBook = new Book(title, author, pages, finished);
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    renderBooks([newBook]);
    formDiv.classList.add('d-none');
}

// Book constructor function
function Book(title, author, pages, finished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    this.id = uniqueId();
}
Book.prototype.toggleStatus = function() {
    this.finished = !this.finished;
}

// Render books from library array
function renderBooks(library) {
    let cardsParent = document.getElementById('cards-parent');
    const template = document.getElementById('card-template');
    library.forEach(book => {
        const card = template.content.cloneNode(true);
        card.querySelector('.col').setAttribute('id', book.id);
        card.querySelector('.btn-delete').dataset.id = book.id;
        card.querySelector('.btn-status').dataset.id = book.id;
        card.querySelector('.card-header').textContent = book.title;
        card.querySelector('.card-title').textContent = book.author;
        card.querySelector('.pages').textContent = `Pages: ${book.pages}`;
        if (!book.finished) {
            card.querySelector('.finished').textContent = 'Not finished';
        }
        // Add event listeners for card's remove button
        const btnDelete = card.querySelector('.btn-delete');
        btnDelete.addEventListener('click', askConfirmation);
        // Add event listeners for change status button
        const btnStatus = card.querySelector('.btn-status');
        btnStatus.addEventListener('click', changeStatus);
        // Render card
        cardsParent.appendChild(card);
    });  
}

// Remove book from library and DOM after confirmation
const deleteConfDiv = document.querySelector('#deleteConfDiv');
let idToDelete = null;
const btnsConfirm = document.querySelectorAll('.btn-confirm');
btnsConfirm.forEach(button => button.addEventListener('click', removeBook));

function askConfirmation() {
    idToDelete = this.dataset.id;
    deleteConfDiv.classList.remove('d-none');
}
function removeBook() {
    if (this.id === 'yes') {
        const index = myLibrary.findIndex(book => book.id === idToDelete);
        myLibrary.splice(index, 1);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        let cardsParent = document.getElementById('cards-parent');
        cardsParent.removeChild(document.getElementById(idToDelete));
    }
    deleteConfDiv.classList.add('d-none');
}

// Change book's read status
function changeStatus() {
    const idToChange = this.dataset.id;
    const indexToChange = myLibrary.findIndex(book => book.id === idToChange);
    const bookCard = document.querySelector(`#${idToChange}`);
    const finished = bookCard.querySelector('.finished');
    myLibrary[indexToChange].toggleStatus();
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    finished.textContent = myLibrary[indexToChange].finished ?  'Finished' : 'Not finished';
}

// Unique ID generator (based on https://gist.github.com/gordonbrander/2230317#file-id-js)
function uniqueId() {
    return 'a' + Math.random().toString(36).substr(2, 9);
}