// ✅ Clase que representa una URL en la lista
class Url {
  url: string;
  next: Url | null;

  constructor(url: string) {
    this.url = url;
    this.next = null;
  }
}

// ✅ Clase que maneja la lista enlazada (historial)
class HistoryNavigation {
  head: Url | null;
  current: Url | null;

  constructor() {
    this.head = null;
    this.current = null;
  }

  addUrl(url: string): void {
    const newNode = new Url(url);

    if (this.head === null) {
      // Primer elemento
      this.head = newNode;
      this.current = newNode;
    } else if (this.current !== null) {
      // Enlaza al siguiente nodo
      this.current.next = newNode;
      this.current = newNode;
    }
  }

  showHistory(): void {
    let currentNode: Url | null = this.head;

    if (currentNode === null) {
      console.log("📭 El historial está vacío.");
      return;
    }

    console.log("📜 Historial de navegación:");
    console.log("=============================");

    while (currentNode !== null) {
      console.log("🌐 URL:", currentNode.url);
      console.log("➡️  Siguiente:", currentNode.next ? currentNode.next.url : "Ninguno");
      console.log("-----------------------------");
      currentNode = currentNode.next;
    }
  }
}

// ✅ Crea una instancia (usa un nombre único)
const navHistory = new HistoryNavigation();

navHistory.addUrl("https://www.google.com");
navHistory.addUrl("https://www.github.com");
navHistory.addUrl("https://www.openai.com");

navHistory.showHistory();
