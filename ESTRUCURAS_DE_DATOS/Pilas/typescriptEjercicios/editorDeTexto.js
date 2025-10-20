// Definición de la estructura Stack en TypeScript
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return undefined;
    };
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Stack.prototype.peek = function () {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    };
    return Stack;
}());
// Mini editor de texto usando pilas
var MiniEditor = /** @class */ (function () {
    function MiniEditor() {
        this.text = "";
        this.undoStack = new Stack();
        this.redoStack = new Stack();
    }
    MiniEditor.prototype.save = function (newText) {
        this.undoStack.push(this.text);
        this.text = newText;
        this.redoStack = new Stack(); // Limpiar pila de rehacer
    };
    MiniEditor.prototype.undo = function () {
        if (!this.undoStack.isEmpty()) {
            this.redoStack.push(this.text);
            var prevText = this.undoStack.pop();
            this.text = prevText !== undefined ? prevText : "";
        }
        else {
            console.log("Nada para deshacer.");
        }
    };
    MiniEditor.prototype.redo = function () {
        if (!this.redoStack.isEmpty()) {
            this.undoStack.push(this.text);
            var nextText = this.redoStack.pop();
            this.text = nextText !== undefined ? nextText : "";
        }
        else {
            console.log("Nada para rehacer.");
        }
    };
    MiniEditor.prototype.show = function () {
        console.log("Texto actual: '".concat(this.text, "'"));
    };
    MiniEditor.prototype.setText = function (newText) {
        this.text = newText;
    };
    MiniEditor.prototype.getText = function () {
        return this.text;
    };
    return MiniEditor;
}());
// Simulación sencilla tipo menú para entorno Node.js/demo (no interactivo visual, solo ejemplo de uso)
function demoMenu() {
    var editor = new MiniEditor();
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
