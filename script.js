// const myLibrary = [];

/* function Book (title, author, pages, hasRead) {
    if(!new.target) {
        throw Error ("You must use the 'new' opertor to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function (){
        const readStatus = this.hasRead? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages ${readStatus}`;
    }
} */

/* 
function addBookToLibrary(title, author, pages,hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    return book;
}

function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = ""; // Clear previous entries

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `<h3>${book.title}</h3>
        <p><strong>Author: </strong>${book.author}</p>
        <p><strong>Pages: </strong>${book.pages}</p>
        <p class="status"><strong>Status: </strong>${book.hasRead? "already read" : "not read yet"}</p>`;

        const delBtn = document.createElement("button");
        delBtn.classList.add("delete-book");
        delBtn.textContent = "X";

        //Delete logic
        delBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id)
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }

        })
        // Toggle button
        const togglebtn = document.createElement("button");
        togglebtn.textContent = "Change Status";
        togglebtn.addEventListener("click", () => {
            book.hasRead = !book.hasRead;
            displayBooks()
        })
        // Status paragraph for dynamic styling
        const statusPara = card.querySelector(".status")
        statusPara.classList.add("read-status");

        if(book.hasRead) {
            statusPara.classList.add("read");
        } else {
            statusPara.classList.add("not-read");
        }



        card.appendChild(delBtn);
        card.appendChild(statusPara);
        card.appendChild(togglebtn);
        container.appendChild(card);
        
    })
}

const newBookBtn = document.querySelector(".new-book")
const form = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
    // Toggle form visibility
    form.style.display = form.style.display === "none" ? "block" : "none";
});

// Handle form submission
form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value);
    const hasRead = document.getElementById("hasRead").checked;

    if (title && author && !isNaN(pages)) {
        addBookToLibrary(title, author, pages, hasRead);
        displayBooks();
        form.reset();
        form.style.display = "none"; // Hide form again
    } else {
        alert("Please fill in all fields correctly.");
    }
});



//Sample books
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, true);
addBookToLibrary("Aki-Ola Core Mathematics SHS", "Peter Asiedu", 500, true);

document.addEventListener("DOMContentLoaded", displayBooks); */

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
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const pages = parseInt(document.getElementById("pages").value);
        const hasRead = document.getElementById("hasRead").checked;

        if(title && author && !isNaN(pages)) {
            this.addBookToLibrary(title, author, pages, hasRead);
            this.displayBooks();
            this.form.reset();
            this.form.style.display = "none"
        } else {
            alert("Please fill in all fields correctly.");
        }
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
