let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        finished: true,
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: 595,
        finished: false,
    }
];

renderBooks(myLibrary);

// Functions
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

function addBookToLibrary() {
    const newBook = new Book(title, author, pages, finished);
    myLibrary.push(newBook);
}

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