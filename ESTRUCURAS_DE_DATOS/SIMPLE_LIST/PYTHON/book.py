# Class representing a single book node in the linked list
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year
        self.next = None  # Pointer to the next book


# Class representing the linked list of books
class BookList:
    def __init__(self):
        self.first_node = None
        self.last_node = None

    # Method to add a new book to the list
    def add_book(self, book):
        if self.first_node is None:
            self.first_node = book
            self.last_node = book
        else:
            self.last_node.next = book
            self.last_node = book

    # Method to print all the books in the list
    def print_books(self):
        if self.first_node is None:
            print("The book list is empty")
        else:
            current_node = self.first_node
            while current_node is not None:
                print("Title: ", current_node.title)
                print("Author:", current_node.author)
                print("Year:", current_node.year)
                print("Next:", current_node.next)
                print("---------------------------")
                current_node = current_node.next


# ---------- TEST CASE ----------

book_list = BookList()

book1 = Book("1984", "George Orwell", 1949)
book2 = Book("To Kill a Mockingbird", "Harper Lee", 1960)
book3 = Book("The Catcher in the Rye", "J.D. Salinger", 1951)

book_list.add_book(book1)
book_list.add_book(book2)
book_list.add_book(book3)

book_list.print_books()
