from library import Library
from book import Book, AudioBook


def add_test_data(library, book_type):
    """Adds data to Library to use for testing.
    
        :param library: Library object to add data to.
        :param book_type: Type of book to be added.
    """
    book_data = [
        book_type("To Kill a Mockingbird", "Harper Lee", "978-0-06-112008-4"),
        book_type("1984", "George Orwell", "978-0-452-28423-4"),
        book_type("The Great Gatsby", "F. Scott Fitzgerald", "978-0-7432-7356-5"),
        book_type("Pride and Prejudice", "Jane Austen", "978-0-14-143951-8"),
        book_type("To the Lighthouse", "Virginia Woolf", "978-0-15-690739-2"),
        book_type("Brave New World", "Aldous Huxley", "978-0-06-085052-4"),
        book_type("The Catcher in the Rye","J.D. Salinger", "978-0-316-76948-0"),
        book_type("Moby-Dick", "Herman Melville", "978-0-553-21235-4"),
        book_type("The Hobbit", "J.R.R. Tolkien", "978-0-261-10201-4"),
        book_type("The Alchemist", "Paulo Coelho", "978-0-06-112241-5")
    ]
    for book in book_data:
        library.add_book(book)


def create_book(book_type, **values):
    """Creates and returns a new book of the given book type.
    
        :param book_type: Type of book object to create.
        :param values: Values to use when creating book object.
        
        :returns: New book object that has been created.
    """
    new_book = ""
    if book_type == Book:
        new_book = book_type(values['title'], values['author'], values['isbn'])
    elif book_type == AudioBook:
        new_book = book_type(values['title'], values['author'], values['isbn'], values['runtime'])
    return new_book


def print_title(title):
    """Print a title to the terminal.
    
        :param title: Title to print to terminal.
    """
    print("*"*80)
    print(" "*(40-(len(title)//2)) + title)
    print("*"*80)


def main():
    """Main function of program."""

    my_library = Library()

    add_test_data(my_library, Book)

    while True:
        print_title("Library App")
        menu = """Please select and option below:\n
        1. Add new book to library
        2. Remove books from the library
        3. View a list of all available books
        0. Exit\n"""
        user_choice = input(menu)

        if user_choice == "1":
            book_type = input("Please choose a book type Book/Audio: (b/a)\n")
            title = input("Please enter the book's title:\n")
            author = input("Please enter the book's author:\n")
            isbn = input("Please enter the book's isbn:\n")
            if book_type.lower() == 'a':
                runtime = input("Please enter the book's runtime:\n") 
                if title and author and isbn and runtime:
                    book = create_book(AudioBook, title=title, author=author, isbn=isbn, runtime=runtime)
            elif book_type.lower() == 'b' and title and author and isbn and runtime:
                book = create_book(AudioBook, title=title, author=author, isbn=isbn, runtime=runtime)
            if book:
                my_library.add_book(book)
            else:
                print("Error adding book.")

        elif user_choice == "2":
            print("Please select a book to remove:")
            my_library.list_available_books()
            user_choice = input("\n")
            while True:
                if user_choice.isnumeric():
                    user_choice = int(user_choice)-1
                    break
                user_choice = input("Please enter a number corresponding to a book:\n")
            safety_check = input("Are you sure you want to delete this book? (y/n) ")
            if safety_check == "y":
                if my_library.remove_book(user_choice):
                    print("Book removed.")
                else:
                    print("Book not removed. Index selection out of range.")
            else:
                print("Book not removed.")

        elif user_choice == "3":
            my_library.list_available_books()
        elif user_choice == "0":
            break


if __name__ == '__main__':
    main()