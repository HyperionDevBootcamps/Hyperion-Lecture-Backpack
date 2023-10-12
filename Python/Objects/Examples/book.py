class Book:
    """This is a class that represents a real-world book object.
    
        :param title: Title of book.,
        :param author: Author of book.,
        :param isbn: isbn of book.
    """
    def __init__(self, title, author, isbn):
        """Constrcutor method for Book class."""
        self.title = title
        self.author = author
        self.isbn = isbn
        self.available = True
        
    def __str__(self):
        return f"Title: {self.title}\nAuthor: {self.author}\nisbn: {self.isbn}"
    

class AudioBook(Book):
    """This is a class that represents a real-world book object.
    
        :param title: Title of book.
        :param author: Author of book.
        :param isbn: isbn of book.
        :param runtime: Runtime of book.
    """

    def __init__(self, title, author, isbn, runtime):
        """Constrcutor method for AudioBook class."""
        super().__init__(title, author, isbn)
        self.runtime = runtime
        
    def __str__(self):
        """Returns string representation of object"""
        return f"Title: {self.title}\nAuthor: {self.author}\nisbn: {self.isbn}\nRuntime: {self.runtime}"