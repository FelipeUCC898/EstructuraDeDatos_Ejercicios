// Estructura Stack genérica en TypeScript
class Stack<T> {
    private items: T[] = [];

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return undefined;
    }

    peek(): T | undefined {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    }

    printStack(): void {
        console.log(this.items);
    }
}

// Mini simulador de navegación con Links Web usando pilas
class LinksWeb {
    private current: string;
    private backStack: Stack<string>;
    private forwardStack: Stack<string>;

    constructor(homepage: string) {
        this.current = homepage;
        this.backStack = new Stack<string>();
        this.forwardStack = new Stack<string>();
    }

    visit(newUrl: string): void {
        this.backStack.push(this.current);
        this.current = newUrl;
        // Limpiamos la pila de adelante porque ya no podemos ir hacia adelante después de una nueva visita
        this.forwardStack = new Stack<string>();
        console.log(`Visitando: ${this.current}`);
    }

    back(): void {
        if (!this.backStack.isEmpty()) {
            this.forwardStack.push(this.current);
            const backUrl = this.backStack.pop();
            if (backUrl !== undefined) {
                this.current = backUrl;
                console.log(`Retrocediendo a: ${this.current}`);
            }
        } else {
            console.log("No hay páginas anteriores.");
        }
    }

    forward(): void {
        if (!this.forwardStack.isEmpty()) {
            this.backStack.push(this.current);
            const forwardUrl = this.forwardStack.pop();
            if (forwardUrl !== undefined) {
                this.current = forwardUrl;
                console.log(`Avanzando a: ${this.current}`);
            }
        } else {
            console.log("No hay páginas siguientes.");
        }
    }

    currentPage(): void {
        console.log(`Página actual: ${this.current}`);
    }
}

// Ejemplo de uso
const navegador = new LinksWeb("google.com");
navegador.currentPage();
navegador.visit("typescriptlang.org");
navegador.visit("github.com");
navegador.visit("stackoverflow.com");
navegador.back();
navegador.currentPage();
navegador.back();
navegador.currentPage();
navegador.forward();
navegador.currentPage();
navegador.visit("openai.com");
navegador.currentPage();
navegador.forward(); // No debe hacer nada ya que el stack forward fue limpiado
