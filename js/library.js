const libModule = (() => {
  const books = document.querySelector('.books');
  const myLibrary = [];

  function Book(author, title, numPages, read) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
  }

  function addBookToLibrary(author, title, numPages, read) {
    const newBook = new Book(author, title, numPages, read);
    myLibrary.push(newBook);
    displayBooks();
  }

  function displayBooks() {
    // loops through array and displays books
    books.textContent = '';

    function appendEl(type, text, property, parent, i) {
      let el = document.createElement(type);
      let prop = myLibrary[i][property]
      el.textContent = `${text}: ${prop}`
      parent.appendChild(el)
    }

    for (let i = 0; i < myLibrary.length; i += 1) {

      const listItem = document.createElement('li');
      listItem.setAttribute('book-index', i);

      const div = document.createElement('div');
      appendEl('h2', 'Book Title', 'title', div, i);
      appendEl('h3', 'Book Author', 'author', div, i);
      appendEl('p', 'No. Pages: ', 'numPages', div, i);

      const read = document.createElement('button');
      read.setAttribute('class', 'status-btn');
      read.textContent = myLibrary[i].read ? 'read' : 'unread';

      read.onclick = function () {
        const index = this.parentNode.parentNode.getAttribute('book-index');

        if (read.textContent === 'unread') {
          read.textContent = 'read';
          myLibrary[index].read = true;
        }
        else {
          read.textContent = 'unread';
          myLibrary[index].read = false;
        }
      };

      div.appendChild(read);

      const deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('class', 'delete-btn');
      deleteBtn.textContent = 'Delete Book';

      deleteBtn.addEventListener('click', () => {
        const idx = deleteBtn.parentNode.parentNode.getAttribute('book-index');
        myLibrary.splice(idx, 1);
        displayBooks();
      });

      div.appendChild(deleteBtn);


      listItem.appendChild(div);
      books.appendChild(listItem);
    }
  }

  return { addBookToLibrary, displayBooks };

})();

libModule.addBookToLibrary('Tolkien', 'LOTR', 255, false);
libModule.addBookToLibrary('Hamil', 'Fast Book', 15, true);

libModule.displayBooks();

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
    libModule.addBookToLibrary(bookAuthor, bookTitle, bookPages, bookRead);
    form.reset();
  }
});
