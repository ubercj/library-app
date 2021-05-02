
// Seed values
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let fahrenheit451 = new Book("Fahrenheit 451", "Ray Bradbury", 303, true);

// Declare variables
let myLibrary = [];
let newBook;
let deleteButtons;
let readButtons;

// Check if there is myLibrary data in local storage
if(!localStorage.getItem('title0')) {
  myLibrary = [
    theHobbit,
    fahrenheit451
  ];
} else {
  fillLibrary();
}

// If there is data in local storage, populate the library with those objects
function fillLibrary() {
  let i = 0;
  while(localStorage.getItem(`title${i}`)) {
    bookToAdd = new Book(localStorage.getItem(`title${i}`),
                        localStorage.getItem(`author${i}`),
                        localStorage.getItem(`pages${i}`),
                        localStorage.getItem(`read${i}`));
    myLibrary.push(bookToAdd);
    i++;
  };
}

// Selecting DOM elements
const currentLib = document.querySelector(".current");
const modalForm = document.querySelector(".modal");
const createButton = document.querySelector(".create");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("#form");

// Show books already in the library
showBooks();

// Book constructor
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return this.title + " written by " + this.author + ". It is " + this.pages + " pages long. It is " + this.read + " that I have read this book.";
  },
  this.toggleRead = function() {
    this.read ? this.read = false : this.read = true;
  }
}

// Library functions
function showBooks() {
  clearLibrary();

  // Adds an index data attribute to associate DOM objects with Books
  let i = 0;
  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("div");
    const bookReadDisplay = document.createElement("div");

    const buttonContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    const readButton = document.createElement("button");

    bookCard.classList.add("card");
    currentLib.appendChild(bookCard);

    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    bookAuthor.textContent = `by ${book.author}`;
    bookCard.appendChild(bookAuthor);
    bookPages.textContent = `${book.pages} pages`
    bookCard.appendChild(bookPages);

    bookRead.classList.add("book-read");
    bookRead.textContent = "Read?";
    bookCard.appendChild(bookRead);

    bookReadDisplay.classList.add("read-display");
    bookReadDisplay.setAttribute("index", i);
    if (book.read) {
      bookReadDisplay.classList.add("is-read");
    } else {
      bookReadDisplay.classList.add("not-read");
    }
    bookRead.appendChild(bookReadDisplay);

    buttonContainer.classList.add("button-container");
    bookCard.appendChild(buttonContainer);

    deleteButton.classList.add("delete");
    deleteButton.setAttribute("index", i);
    deleteButton.textContent = "Delete";
    buttonContainer.appendChild(deleteButton);

    i++;
  });

  // Add event listeners to buttons
  deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(node => {
    node.addEventListener("click", function() { deleteBook(node.getAttribute("index")) });
  })

  readButtons = document.querySelectorAll(".read-display");
  readButtons.forEach(node => {
    node.addEventListener("click", function() { changeReadStatus(node.getAttribute("index")) });
  })

  storeBooks(myLibrary);
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  localStorage.clear();
  showBooks();
}

function changeReadStatus(index) {
  myLibrary[index].toggleRead();
  showBooks();
}

function storeBooks(lib) {
  let i = 0;
  lib.forEach(book => {
    localStorage.setItem(`title${i}`, book.title);
    localStorage.setItem(`author${i}`, book.author);
    localStorage.setItem(`pages${i}`, book.pages);
    localStorage.setItem(`read${i}`, book.read);
    i++;
  });
}

function clearLibrary() {
  while (currentLib.firstChild) {
    currentLib.firstChild.remove();
  };
}

// Form functions
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = e.target.elements;
  addBookToLibrary(formData.title.value, formData.author.value, formData.pages.value, formData.read.checked);
  modalForm.classList.add("hidden");
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  modalForm.classList.add("hidden");
})

function addBookToLibrary(title, author, pages, read) {
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  showBooks();
}

// Modal functions
createButton.addEventListener("click", showForm);
function showForm() {
  modalForm.classList.remove("hidden");
}

