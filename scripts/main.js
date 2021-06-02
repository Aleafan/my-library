const myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        finished: true,
        id: uniqueId(),
    },
    {
        title: 'The Lord of the Rings, Return of the King',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
        id: uniqueId(),
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
        id: uniqueId(),
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
        id: uniqueId(),
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
        id: uniqueId(),
    }
];

// Render library books on page load
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
    const newBook = new Book(title, author, pages, finished);
    myLibrary.push(newBook);
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

// Render books from library array
function renderBooks(library) {
    let cardsParent = document.getElementById('cards-parent');
    const template = document.getElementById('card-template');
    library.forEach(book => {
        const card = template.content.cloneNode(true);
        card.querySelector('.col').setAttribute('id', book.id);
        card.querySelector('.btn-delete').dataset.id = book.id;
        card.querySelector('.card-header').textContent = book.title;
        card.querySelector('.card-title').textContent = book.author;
        card.querySelector('#pages').textContent = `Pages: ${book.pages}`;
        if (!book.finished) {
            card.querySelector('#finished').textContent = 'Not finished';
        }
        // Add event listeners for card's remove button
        const btnDelete = card.querySelector('.btn-delete');
        btnDelete.addEventListener('click', askConfirmation);
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
        let cardsParent = document.getElementById('cards-parent');
        cardsParent.removeChild(document.getElementById(idToDelete));
    }
    deleteConfDiv.classList.add('d-none');
}

// Unique ID generator (based on https://gist.github.com/gordonbrander/2230317#file-id-js)
function uniqueId() {
    return Math.random().toString(36).substr(2, 9);
}