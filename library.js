class Book {
    constructor(isbn, title, author, publicationYear) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.isAvailable = true;
    }

    borrow() {
        if (!this.isAvailable) {
            throw new Error('Book is currently unavailable');
        }
        this.isAvailable = false;
    }

    return() {
        this.isAvailable = true;
    }
}

class Library {
    constructor() {
        this.books = {};
    }

    addBook(isbn, title, author, publicationYear) {
        if (this.books[isbn]) {
            throw new Error('Book with this ISBN already exists');
        }
        const book = new Book(isbn, title, author, publicationYear);
        this.books[isbn] = book;
        console.log(`Book "${title}" added successfully.`);
    }

    removeBook(isbn) {
        const book = this.books[isbn];
        if (!book) {
            throw new Error('Book not found');
        }
        if (!book.isAvailable) {
            throw new Error('Cannot remove a borrowed book');
        }
        delete this.books[isbn];
        console.log(`Book with ISBN ${isbn} removed successfully.`);
    }
    
    borrowBook(isbn) {
        const book = this.books[isbn];
        if (!book) {
            throw new Error('Book not found');
        }
        book.borrow();
        console.log(`Book "${book.title}" borrowed successfully.`);
    }

    returnBook(isbn) {
        const book = this.books[isbn];
        if (!book) {
            throw new Error('Book not found');
        }
        book.return();
        console.log(`Book "${book.title}" returned successfully.`);
    }

    viewAvailableBooks() {
        const availableBooks = Object.values(this.books).filter(book => book.isAvailable);
        if (availableBooks.length === 0) {
            console.log('No books are currently available.');
        } else {
            console.log('Available Books:');
            availableBooks.forEach(book => {
                console.log(`- ${book.title} by ${book.author} (ISBN: ${book.isbn})`);
            });
        }
    }
}

module.exports = Library;
