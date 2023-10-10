class Book {
    constructor(
        title = 'Unkown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = [
            new Book('Lord of the Rings', 'J.R. Tolkien', 546, false),
            new Book('10 Thousand Leagues Under the Sea', 'Jules Verne', 212, true),
            new Book('Sherlock Holmes', 'Author Conan Doyle', 1796, true),
            new Book('Way of Kings', 'Brandon Sanderson', 1104, true),
            new Book('Oathbringer', 'Brandon Sanderson', 1231, true),
            new Book('The Blade Itself', 'Joe Abercrombie', 432, true),
            new Book("The Assassin's Apprentice", 'Robin Hobb', 349, true)
        ];
    }
}

const librarian =(function() {

    const submitNewBook = () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pageCount = document.getElementById('pageCount').value;
        const hasRead = document.getElementById('hasRead').value;
        const newBook = new Book(title, author, pageCount, hasRead);
        console.log(newBook);
        library.books.push(newBook);
        displayController.displayBooks();
        // event.preventDefault()
    }

    const createBookCard = (book) => {
        const booksGrid = document.getElementById("booksGrid")
        const bookCard = document.createElement('div')
        const title = document.createElement('p')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const buttonGroup = document.createElement('div')
        const readBtn = document.createElement('button')
        const removeBtn = document.createElement('button')

        title.textContent = book.title
        author.textContent = book.author
        author.style.fontStyle = "italic"
        pages.textContent = `${book.pages} pages`
        removeBtn.textContent = 'Remove'
        
        if (book.isRead) {
            readBtn.textContent = 'Read'
            readBtn.classList.add('btn-light-green')
        } else {
            readBtn.textContent = 'Unread'
            readBtn.classList.add('btn-light-red')
        }

        bookCard.appendChild(title)
        bookCard.appendChild(author)
        bookCard.appendChild(pages)
        buttonGroup.appendChild(readBtn)
        buttonGroup.appendChild(removeBtn)
        bookCard.appendChild(buttonGroup)
        booksGrid.appendChild(bookCard) 
        bookCard.classList.add("card")
        removeBtn.onclick = function() {
            librarian.removeBook(book);
            displayController.displayBooks();
        }
        readBtn.onclick = function() {
            if(readBtn.textContent == "Read") {
                readBtn.textContent = "Unread"
                readBtn.classList.replace('btn-light-green', 'btn-light-red')
            } else {
                readBtn.textContent = "Read"
                readBtn.classList.replace('btn-light-red', 'btn-light-green')
            }
        }
    }

    const removeBook = (book) => {
        let removeBookTitle = book.title;
        library.books = library.books.filter(function(obj) {
            return obj.title !== removeBookTitle;
        });
    }
    return {
        submitNewBook,
        removeBook,
        createBookCard
    };
})();



const displayController = (function() {
    const displayBooks = () => {
        document.querySelectorAll('.card').forEach(e => e.remove());
        for (let i = 0; i < library.books.length; i++)
        librarian.createBookCard(library.books[i])
    };
    const openNewBookForm = () => {
        document.getElementById("newBookForm").style.display = "block";
        console.log(library.books);
    };

    const closeNewBookForm = () => {
        document.getElementById("newBookForm").style.display = "none";
    };
    return {
        displayBooks,
        openNewBookForm,
        closeNewBookForm
    };
})();

const library = new Library()

displayController.displayBooks();

///////////////////////////// end test