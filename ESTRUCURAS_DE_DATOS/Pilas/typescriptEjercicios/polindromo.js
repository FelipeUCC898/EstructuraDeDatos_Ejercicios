// Definición de la estructura Stack en TypeScript
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return undefined;
    };
    Stack.prototype.top = function () {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    };
    Stack.prototype.printStack = function () {
        console.log(this.items);
    };
    return Stack;
}());
// Función para verificar si una palabra/frase es palíndromo utilizando una pila
function esPalindromo(texto) {
    var pila = new Stack();
    // Limpiamos el texto: quitamos espacios y lo pasamos a minúsculas para facilitar la comprobación
    var limpio = texto.replace(/[\W_]/g, '').toLowerCase();
    // Apilamos cada caracter
    for (var _i = 0, limpio_1 = limpio; _i < limpio_1.length; _i++) {
        var char = limpio_1[_i];
        pila.push(char);
    }
    // Comparamos desapilando con el texto original limpio
    for (var _a = 0, limpio_2 = limpio; _a < limpio_2.length; _a++) {
        var char = limpio_2[_a];
        var letraPila = pila.pop();
        if (char !== letraPila) {
            return false;
        }
    }
    return true;
}
// Ejemplo de uso
var casos = [
    "Reconocer",
    "anita lava la tina",
    "Hola mundo",
    "A man, a plan, a canal: Panama"
];
casos.forEach(function (palabra) {
    console.log("'".concat(palabra, "' es pal\u00EDndromo?"), esPalindromo(palabra) ? "Sí" : "No");
});
