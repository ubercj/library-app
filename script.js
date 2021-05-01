
// Seed values
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let fahrenheit451 = new Book("Fahrenheit 451", "Ray Bradbury", 303, true);

// Declare variables
let myLibrary = [
  theHobbit,
  fahrenheit451
];
let newBook;
let deleteButtons;

// Selecting DOM elements
const currentLib = document.querySelector(".current");
const modalForm = document.querySelector(".modal");
const createButton = document.querySelector(".create");
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
  }
}

// Library functions
function showBooks() {
  clearLibrary();
  // Adds an index data attribute to associate DOM objects with Books
  let i = 0;
  myLibrary.forEach(book => {
    const libItem = document.createElement("p");
    const deleteButton = document.createElement("button");

    libItem.classList.add("libItem");
    libItem.setAttribute("index", i);
    libItem.textContent = book.info();
    currentLib.appendChild(libItem);

    libItem.appendChild(deleteButton);
    deleteButton.setAttribute("index", i);
    deleteButton.textContent = "Delete";

    i++;
  });
  deleteButtons = document.querySelectorAll(".libItem button");
  deleteButtons.forEach(node => {
    node.addEventListener("click", function() { deleteBook(node.getAttribute("index")) });
  })
}


// let libItems = document.querySelectorAll(".libItem");
// deleteButtons.forEach(node => {
//   node.addEventListener("click", function() {deleteBook(node.getAttribute("index"))});
// })

function deleteBook(index) {
  console.log(myLibrary[index].title);
  console.log(index);
  console.log(myLibrary);
  myLibrary.splice(index, 1);
  showBooks();
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
  addBookToLibrary(formData.title.value, formData.author.value, formData.pages.value);
  modalForm.classList.add("hidden");
});

function addBookToLibrary(title, author, pages) {
  newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  showBooks();
}

// Modal functions
createButton.addEventListener("click", showForm);
function showForm() {
  modalForm.classList.remove("hidden");
}

