const Library = require('../library');

describe('Library Management System', () => {
    let library;

    beforeEach(() => {
        library = new Library();
    });

    test('should add a new book to the library', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        expect(library.books['271103']).toBeDefined();
        expect(library.books['271103'].title).toBe('Geeta Rahasya,The Artic Home of the vyas');
    });

    test('should not add a book with duplicate ISBN', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        expect(() => {
            library.addBook('271103', 'Another Book', 'Another Author', 2023);
        }).toThrow('Book with this ISBN already exists');
    });

    test('should borrow a book if it is available', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        library.borrowBook('271103');
        expect(library.books['271103'].isAvailable).toBe(false);
    });

    test('should not borrow a book if it is already borrowed', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        library.borrowBook('271103');
        expect(() => {
            library.borrowBook('271103');
        }).toThrow('Book is currently unavailable');
    });

    test('should return a borrowed book', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        library.borrowBook('271103');
        library.returnBook('271103');
        expect(library.books['271103'].isAvailable).toBe(true);
    });

    test('should remove a book from the library', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        library.removeBook('271103');
        expect(library.books['271103']).toBeUndefined();
    });

    test('should view all available books', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        library.addBook('999999', 'pride of india', 'Dhrupal Dodiya', 2024);
        library.borrowBook('271103');
        const availableBooks = Object.values(library.books).filter(book => book.isAvailable);
        expect(availableBooks.length).toBe(1);
        expect(availableBooks[0].title).toBe('pride of india');
    });

    test('should not remove a book if it is currently borrowed', () => {
        library.addBook('271103', 'Geeta Rahasya,The Artic Home of the vyas', 'Bal Gangadhar Tilak', 1903);
        library.borrowBook('271103');
        expect(() => {
            library.removeBook('271103');
        }).toThrow('Cannot remove a borrowed book');
    });
    
});
