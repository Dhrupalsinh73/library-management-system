const readline = require('readline');
const Library = require('./library');

const library = new Library();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mainMenu = () => {
    console.log('\nLibrary Management System');
    console.log('1. Add Book');
    console.log('2. Remove Book');
    console.log('3. Borrow Book');
    console.log('4. Return Book');
    console.log('5. View Available Books');
    console.log('6. Exit');

    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                addBook();
                break;
            case '2':
                removeBook();
                break;
            case '3':
                borrowBook();
                break;
            case '4':
                returnBook();
                break;
            case '5':
                viewAvailableBooks();
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
        }
    });
};

const addBook = () => {
    rl.question('Enter ISBN: ', (isbn) => {
        rl.question('Enter Title: ', (title) => {
            rl.question('Enter Author: ', (author) => {
                rl.question('Enter Publication Year: ', (year) => {
                    try {
                        library.addBook(isbn, title, author, year);
                    } catch (error) {
                        console.log(error.message);
                    }
                    mainMenu();
                });
            });
        });
    });
};

const removeBook = () => {
    rl.question('Enter ISBN of the book to remove: ', (isbn) => {
        try {
            library.removeBook(isbn);
        } catch (error) {
            console.log(error.message);
        }
        mainMenu();
    });
};

const borrowBook = () => {
    rl.question('Enter ISBN of the book to borrow: ', (isbn) => {
        try {
            library.borrowBook(isbn);
        } catch (error) {
            console.log(error.message);
        }
        mainMenu();
    });
};

const returnBook = () => {
    rl.question('Enter ISBN of the book to return: ', (isbn) => {
        try {
            library.returnBook(isbn);
        } catch (error) {
            console.log(error.message);
        }
        mainMenu();
    });
};

const viewAvailableBooks = () => {
    library.viewAvailableBooks();
    mainMenu();
};

mainMenu();
