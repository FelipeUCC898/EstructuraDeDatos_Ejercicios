// Definición de la estructura Stack en TypeScript
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return undefined;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    peek(): T | undefined {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    }
}

// Mini editor de texto usando pilas
class MiniEditor {
    private text: string = "";
    private undoStack: Stack<string> = new Stack<string>();
    private redoStack: Stack<string> = new Stack<string>();

    save(newText: string): void {
        this.undoStack.push(this.text);
        this.text = newText;
        this.redoStack = new Stack<string>(); // Limpiar pila de rehacer
    }

    undo(): void {
        if (!this.undoStack.isEmpty()) {
            this.redoStack.push(this.text);
            const prevText = this.undoStack.pop();
            this.text = prevText !== undefined ? prevText : "";
        } else {
            console.log("Nada para deshacer.");
        }
    }

    redo(): void {
        if (!this.redoStack.isEmpty()) {
            this.undoStack.push(this.text);
            const nextText = this.redoStack.pop();
            this.text = nextText !== undefined ? nextText : "";
        } else {
            console.log("Nada para rehacer.");
        }
    }

    show(): void {
        console.log(`Texto actual: '${this.text}'`);
    }

    setText(newText: string): void {
        this.text = newText;
    }

    getText(): string {
        return this.text;
    }
}

// Simulación sencilla tipo menú para entorno Node.js/demo (no interactivo visual, solo ejemplo de uso)
function demoMenu() {
    const editor = new MiniEditor();

    // Simulación de entrada de texto y operaciones
    editor.setText("Hola mundo");
    editor.save(editor.getText());
    editor.show();

    editor.setText("Hola mundo!!!");
    editor.save(editor.getText());
    editor.show();

    editor.undo();
    editor.show();

    editor.redo();
    editor.show();

    editor.setText("Nueva edición");
    editor.save(editor.getText());
    editor.show();

    editor.undo();
    editor.show();

    editor.undo();
    editor.show();

    editor.redo();
    editor.show();
}

demoMenu();

