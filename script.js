class Book {
    constructor(title, author, pages, hasRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    info() {
        const readStatus = this.hasRead? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages ${readStatus}`;
    }
}

class LibraryUI {
    constructor() {
        this.myLibrary = [];

        this.newBookBtn = document.querySelector(".new-book");
        this.form = document.getElementById("book-form");
        this.container = document.getElementById("book-container");

        this.initializeEvents();
        this.intializeSampleBooks();
    }

    initializeEvents() {
        this.newBookBtn.addEventListener("click", () => {
            this.form.style.display = this.form.style.display === "none" ? "block" : "none";
        })

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    intializeSampleBooks() {
        this.addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
        this.addBookToLibrary("1984", "George Orwell", 328, false);
        this.addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
        this.addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
        this.addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
        this.addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, true);
        this.addBookToLibrary("Aki-Ola Core Mathematics SHS", "Peter Asiedu", 500, true);

        this.displayBooks(); // Display the sample books
    }

    handleFormSubmit() {
        const titleInput = document.getElementById("title");
        const authorInput = document.getElementById("author");
        const pagesInput = document.getElementById("pages");
        const hasRead = document.getElementById("hasRead").checked;

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const pages = parseInt(pagesInput.value);

        let isValid = true

        // Clear previous errors
        document.querySelectorAll(".error").forEach(e => e.remove());
        
        // Validation
        if (!title) {
            this.showError(titleInput, "Title is required.");
            isValid = false;
        }

        if (!author) {
            this.showError(authorInput, "Author is required");
            isValid = false;
        }

        if (!pagesInput.value || isNaN(pages) || pages <= 0) {
            this.showError(pagesInput, "Enter a valid number of pages.");
            isValid = false;
        }

        if (!isValid) return;

        // Add book and reset
            this.addBookToLibrary(title, author, pages, hasRead);
            this.displayBooks();
            this.form.reset();
            this.form.style.display = "none";
    }

    showError (inputElement, message) {
        const error = document.createElement("div")
        error.classList.add("error");
        error.textContent = message;
        inputElement.parentNode.insertBefore(error, inputElement.nextSibling);
    }

    addBookToLibrary(title, author, pages, hasRead) {
        const book  = new Book(title, author, pages, hasRead);
        this.myLibrary.push(book);
        return book;
    }

    displayBooks() {
        this.container.innerHTML = "";

        this.myLibrary.forEach(book => {
            const card = document.createElement("div");
            card.classList.add("book-card");

            card.innerHTML = `<h3>${book.title}</h3>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <p class = "status"><strong>Status: </strong>${book.hasRead? "already read" : "not read yet"}</p>`;

            const delBtn  = document.createElement("button");
            delBtn.classList.add("delete-book");
            delBtn.textContent = "X";

            delBtn.addEventListener("click", () => {
                const index = this.myLibrary.findIndex(b => b.id === book.id);
                if(index !== -1) {
                    this.myLibrary.splice(index, 1);
                    this.displayBooks()
                }
            });

            const togglebtn = document.createElement("button");
            togglebtn.textContent = "Change Status";
            togglebtn.addEventListener("click", () =>{
                book.hasRead = !book.hasRead;
                this.displayBooks();
            });

            const statusPara = card.querySelector(".status");
            statusPara.classList.add("read-status");

            if(book.hasRead) {
                statusPara.classList.add("read");
            } else {
                statusPara.classList.add("not-read");
            }

            card.appendChild(delBtn);
            card.appendChild(statusPara);
            card.appendChild(togglebtn);
            this.container.appendChild(card);

        });
    }
}

//Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const libraryApp = new LibraryUI();
});
