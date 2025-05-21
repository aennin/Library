const myLibrary = [];

function Book (title, author, pages, hasRead) {
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
}


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
        <p><strong>Status: </strong>${book.hasRead? "already read" : "not read yet"}</p>`;

        container.appendChild(card);
    })
}

const newBookBtn = document.querySelector(".new-book")
const form = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
    // Toggle form visibility
    form.style.display = form.style.display === "none" ? "block" : "none";
});

//Sample books
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, true);
addBookToLibrary("Aki-Ola Core Mathematics SHS", "Peter Asiedu", 500, true);

document.addEventListener("DOMContentLoaded", displayBooks);