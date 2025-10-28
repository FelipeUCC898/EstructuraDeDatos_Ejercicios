class Book {
  title: string;
  author: string;
  year: number;
  next: Book | null;

  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.next = null;
  }
}

class BookList {
  first_node: Book | null;
  last_node: Book | null;

  constructor() {
    this.first_node = null;
    this.last_node = null;
  }

  add_book(book: Book): void {
    if (this.first_node === null) {
      // La lista está vacía
      this.first_node = book;
      this.last_node = book;
    } else {
      // La lista ya tiene elementos
      if (this.last_node !== null) {
        this.last_node.next = book; // enlaza el último con el nuevo
        this.last_node = book;      // actualiza el último nodo
      }
    }
  }

  show_books(): void {
    if (this.first_node === null) {
      console.log("The book list is empty");
      return;
    }

    let currentNode: Book | null = this.first_node;
    while (currentNode !== null) {
      console.log("Title:", currentNode.title);
      console.log("Author:", currentNode.author);
      console.log("Year:", currentNode.year);
      console.log("---------------------------------");
      currentNode = currentNode.next;
    }
  }
}

// 🧪 Prueba
const library = new BookList();
library.add_book(new Book("El Principito", "Antoine de Saint-Exupéry", 1943));
library.add_book(new Book("Cien Años de Soledad", "Gabriel García Márquez", 1967));
library.add_book(new Book("1984", "George Orwell", 1949));

library.show_books();
