const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; 

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement("p");
        pages.textContent = "Pages: " + book.pages;

        const readStatus = document.createElement("p");
        readStatus.textContent = "Read: " + (book.read ? "Yes" : "No");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeBook(index));

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read";
        toggleReadButton.addEventListener("click", () => toggleReadStatus(index));

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
        card.appendChild(removeButton);
        card.appendChild(toggleReadButton);

        bookList.appendChild(card);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// Event listeners
document.getElementById("new-book-button").addEventListener("click", () => {
    const bookForm = document.getElementById("book-form");
    bookForm.style.display = "block";
});

document.getElementById("add-book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    document.getElementById("add-book-form").reset();
    document.getElementById("book-form").style.display = "none";
});

displayBooks();
