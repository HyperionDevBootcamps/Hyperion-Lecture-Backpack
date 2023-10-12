class Library:
    def __init__(self):
        """Constrcutor method for Library class."""
        self.books = []

    def add_book(self, book):
        """Add a book to the Library."""
        self.books.append(book)

    def remove_book(self, index):
        """Remove a book at a given index from the Library.
        
            :param index: Index of book to be removed."""
        if 0 <= index < len(self):
            self.books.pop(index)
            return True
        else:
            return False

    def list_available_books(self):
        """Print all available books in Library to terminal."""
        available_books = [book for book in self.books if book.available]
        if available_books:
            print("-"*80)
            for i, book in enumerate(available_books):
                print(i+1, f"{book.title[:25]} by {book.author[:15]} (ISBN: {book.isbn})")
            print("-"*80)
        else:
            print("No available books in the library.")

    def __len__(self):
        """Returns length of books list when len() funstion is called on object"""
        return len(self.books)
    
    def __iter__(self):
        """Returns iterable representation of object"""
        return self.books