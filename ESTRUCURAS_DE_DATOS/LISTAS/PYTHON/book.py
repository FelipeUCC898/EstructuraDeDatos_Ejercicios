class Book:
    """Representa un libro dentro de la biblioteca."""
    def __init__(self, isbn, title, author, available=True):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.available = available

    def __str__(self):
        return f"{self.title} - {self.author} ({'Disponible' if self.available else 'Prestado'})"


class Library:
    """Clase que maneja la colección de libros disponibles y prestados."""
    def __init__(self):
        self.books = []

    def add_book(self, book):
        """Agrega un nuevo libro a la biblioteca."""
        self.books.append(book)
        print(f"✅ Libro '{book.title}' agregado a la biblioteca.")

    def borrow_book(self, isbn):
        """Permite prestar un libro si está disponible."""
        for b in self.books:
            if b.isbn == isbn:
                if b.available:
                    b.available = False
                    print(f"📚 Has prestado el libro '{b.title}'.")
                else:
                    print("❌ El libro ya está prestado.")
                return
        print("❌ Libro no encontrado.")

    def return_book(self, isbn):
        """Permite devolver un libro prestado."""
        for b in self.books:
            if b.isbn == isbn:
                b.available = True
                print(f"🔁 Libro '{b.title}' devuelto correctamente.")
                return
        print("❌ Libro no encontrado.")

    def list_books(self):
        """Muestra todos los libros registrados."""
        if not self.books:
            print("Biblioteca vacía.")
        else:
            print("📚 Libros en la biblioteca:")
            for b in self.books:
                print(" -", b)


# === Simulación ===
library = Library()

book1 = Book("123", "El Principito", "Antoine de Saint-Exupéry")
book2 = Book("456", "Cien años de soledad", "Gabriel García Márquez")
book3 = Book("789", "1984", "George Orwell")

library.add_book(book1)
library.add_book(book2)
library.add_book(book3)

library.list_books()
library.borrow_book("456")
library.list_books()
library.return_book("456")
library.list_books()
