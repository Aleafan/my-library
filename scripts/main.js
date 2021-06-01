let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        finished: true,
    },
    {
        title: 'The Lord of the Rings, Return of the King',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
    }
];

// Render library books on page load
renderBooks(myLibrary);

// Toggle display of form adding new book
const buttonAdd = document.getElementById('add-book');
const buttonCancel = document.getElementById('cancel-btn');
const formDiv = document.getElementById('bookFormDiv');
buttonAdd.addEventListener('click', () => formDiv.classList.remove('d-none'));
buttonCancel.addEventListener('click', () => formDiv.classList.add('d-none'));

// On form submit add new book to myLibrary and display it
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

// Show custom error message if 'pages' input is invalid
const pagesInput = document.getElementById('pages');
pagesInput.addEventListener('input', () => {
  pagesInput.setCustomValidity('');
  pagesInput.checkValidity();
});
pagesInput.addEventListener('invalid', () => {
    pagesInput.setCustomValidity('Please enter only digits!');
});

// Book constructor function
function Book(title, author, pages, finished) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.finished = finished,
    this.info = () => {
      let status = this.finished ? 'finished' : 'not read yet';
      return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`;
    }
}

// Render books from parameter array
function renderBooks(library) {
    const cardsParent = document.getElementById('cards-parent');
    const template = document.getElementById('card-template');
    library.forEach(book => {
        const card = template.content.cloneNode(true);
        card.querySelector('.card-header').textContent = book.title;
        card.querySelector('.card-title').textContent = book.author;
        card.querySelector('#pages').textContent = `Pages: ${book.pages}`;
        if (!book.finished) {
            card.querySelector('#finished').textContent = 'Not finished';
        }
        cardsParent.appendChild(card);
    });  
}