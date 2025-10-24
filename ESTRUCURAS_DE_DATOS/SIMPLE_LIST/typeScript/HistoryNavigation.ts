class Url {
  url: string;
  next: Url | null;

  constructor(url: string) {
    this.url = url;
    this.next = null;
  }
}

class HistoryNavigation {
  head: Url | null;
  current: Url | null;

  constructor() {
    this.head = null;
    this.current = null;
  }

  add_url(url: string): void {
    const newNode = new Url(url);

    if (this.head === null) {
      this.head = newNode;
      this.current = newNode;
    } else {
      if (this.current !== null) {
        this.current.next = newNode;
        this.current = newNode;
      }
    }
  }

  show_history(): void {
    let currentNode = this.head;

    if (currentNode === null) {
      console.log("The history list is empty.");
      return;
    }

    while (currentNode !== null) {
      console.log("URL:", currentNode.url);
      console.log("NEXT:", currentNode.next);
      console.log("-----------------------------");
      currentNode = currentNode.next;
    }
  }
}

// 🧠 Testing
const history = new HistoryNavigation();

history.add_url("https://www.google.com");
history.add_url("https://www.github.com");
history.add_url("https://www.openai.com");

history.show_history();
