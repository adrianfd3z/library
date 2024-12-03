const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add toggleReadStatus method to the Book prototype
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayLibrary();
}

// Display all books in the library
function displayLibrary() {
    const libraryContainer = document.getElementById("library-container");
    libraryContainer.innerHTML = ""; // Clear the current display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button data-index="${index}" class="toggle-read-btn">Toggle Read</button>
            <button data-index="${index}" class="remove-btn">Remove</button>
        `;

        libraryContainer.appendChild(bookCard);
    });

    // Attach event listeners to buttons
    document.querySelectorAll(".remove-btn").forEach((button) =>
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            myLibrary.splice(index, 1); // Remove book from library
            displayLibrary(); // Refresh display
        })
    );

    document.querySelectorAll(".toggle-read-btn").forEach((button) =>
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            myLibrary[index].toggleReadStatus(); // Toggle read status
            displayLibrary(); // Refresh display
        })
    );
}

// Show form to add a new book
document.getElementById("new-book-btn").addEventListener("click", () => {
    const formContainer = document.getElementById("form-container");
    formContainer.style.display =
        formContainer.style.display === "none" ? "block" : "none";
});

// Handle form submission
document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    // Clear and hide the form
    e.target.reset();
    document.getElementById("form-container").style.display = "none";
});

// Add a few sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayLibrary();
