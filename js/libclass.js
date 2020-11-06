function Book(author, title, numPages, read) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.read = read;
}

class Lib {
  constructor() {
    this.library = [];
    this.books = document.querySelector('.books');
  }

  displayBooks() {
    // loops through array and displays books
    this.books.textContent = '';
    const libs = this.library;

    function appendEl(type, text, property, parent, i) {
      const el = document.createElement(type);
      const prop = libs[i][property];
      el.textContent = `${text}: ${prop}`;
      parent.appendChild(el);
    }

    for (let i = 0; i < this.library.length; i += 1) {
      const listItem = document.createElement('li');
      listItem.setAttribute('book-index', i);

      const div = document.createElement('div');
      appendEl('h2', 'Book Title', 'title', div, i);
      appendEl('h3', 'Book Author', 'author', div, i);
      appendEl('p', 'No. Pages: ', 'numPages', div, i);

      const read = document.createElement('button');
      read.setAttribute('class', 'status-btn');
      read.textContent = this.library[i].read ? 'read' : 'unread';

      read.onclick = function () {
        const index = this.parentNode.parentNode.getAttribute('book-index');

        if (read.textContent === 'unread') {
          read.textContent = 'read';
          this.library[index].read = true;
        } else {
          read.textContent = 'unread';
          this.library[index].read = false;
        }
      };

      div.appendChild(read);

      const deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('class', 'delete-btn');
      deleteBtn.textContent = 'Delete Book';

      deleteBtn.addEventListener('click', () => {
        const idx = deleteBtn.parentNode.parentNode.getAttribute('book-index');
        this.library.splice(idx, 1);
        this.displayBooks();
      });

      div.appendChild(deleteBtn);


      listItem.appendChild(div);
      this.books.appendChild(listItem);
    }
  }

  addBook(author, title, numPages, read) {
    const b = new Book(author, title, numPages, read);
    this.library.push(b);
    this.displayBooks();
  }
}

const mylib = new Lib();

const form = document.querySelector('.form');
const toggleForm = document.querySelector('.toggle-form');
const addBookBtn = document.querySelector('.add-book');

toggleForm.addEventListener('click', () => {
  form.classList.toggle('no-display');
});

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookAuthor = document.querySelector('.form-author').value;
  const bookTitle = document.querySelector('.form-title').value;
  const bookPages = document.querySelector('.form-num-pages').value;
  const bookRead = document.querySelector('.form-read').checked;

  if (bookAuthor === '' || bookTitle === '' || bookPages === '') {
    alert('Form inputs should not be empty');
  } else {
    mylib.addBook(bookAuthor, bookTitle, bookPages, bookRead);
    form.reset();
  }
});

mylib.addBook('Tolkien', 'LOTR', 255, false);
mylib.addBook('Hamil', 'Fast Book', 15, true);
