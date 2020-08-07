// MODEL
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.store = [];
  }
}

// VIEW
class UI {
  addBookToList({ title, author, isbn }) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert
    row.innerHTML = `
     <td>${title}</td>
     <td>${author}</td>
     <td>${isbn}</td>
     <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  clearField(dom) {
    console.log(dom);
    for (let item of dom) item.value = '';
  }

  showAlert(message, className, delay) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), delay);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }
}

// local Storage Class
class Store {
  static getBooks() {
    if (localStorage.getItem('books') === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('books'));
    }
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(target) {
    let books = Store.getBooks();

    /* My solution 1 */
    // books = books.filter(({ isbn }) => isbn !== target.textContent);

    /* My solution 2 */
    // books.forEach((item, index) => {
    //  if (item.isbn === target.textContent) {
    //   books.splice(index, 1);
    //  }
    // })

    /* My solution 3 */
    for (let book of books) {
      if (book.isbn === target.textContent) {
        books.splice(books.indexOf(book), 1);
      }
    }

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// CONTROLLER
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (!title || !author || !isbn) {
    ui.showAlert('양식을 다 입력하세요.', 'error');
  } else {
    // Add book List
    ui.addBookToList(book);

    Store.addBooks(book);

    ui.showAlert('Book Added!', 'success', 1000);

    ui.clearField([
      document.getElementById('title'),
      document.getElementById('author'),
      document.getElementById('isbn'),
    ]);
  }
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
  const ui = new UI();

  if (e.target.closest('.delete')) {
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed!', 'success', 1000);
    Store.removeBook(e.target.parentElement.previousElementSibling);
  }
});

// load
document.addEventListener('DOMContentLoaded', Store.displayBooks);
