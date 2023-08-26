class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.displayBooks();
    }

    toggleReadStatus(index) {
        this.books[index].read = !this.books[index].read;
        this.displayBooks();
    }

    displayBooks() {
        const bookList = document.getElementById("book-list");
        bookList.innerHTML = ""; // Clear

        this.books.forEach((book, index) => {
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
            removeButton.addEventListener("click", () => this.removeBook(index));

            const toggleReadButton = document.createElement("button");
            toggleReadButton.textContent = "Toggle Read";
            toggleReadButton.addEventListener("click", () => this.toggleReadStatus(index));

            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(pages);
            card.appendChild(readStatus);
            card.appendChild(removeButton);
            card.appendChild(toggleReadButton);

            bookList.appendChild(card);
        });
    }
}

const myLibrary = new Library();

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

    myLibrary.addBook(title, author, pages, read);
    myLibrary.displayBooks();

    // Reset form
    document.getElementById("add-book-form").reset();
    document.getElementById("book-form").style.display = "none";
});

document.getElementById("book-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
        const index = target.getAttribute("data-index");
        if (target.classList.contains("remove-button")) {
            myLibrary.removeBook(index);
        } else if (target.classList.contains("toggle-read-button")) {
            myLibrary.toggleReadStatus(index);
        }
    }
});

myLibrary.displayBooks();
