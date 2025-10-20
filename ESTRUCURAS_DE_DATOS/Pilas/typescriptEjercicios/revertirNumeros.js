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
// Función para invertir los dígitos de un número usando una pila
function revertirNumero(numero) {
    var stack = new Stack();
    var n = Math.abs(numero);
    // Apilamos cada dígito
    while (n > 0) {
        stack.push(n % 10);
        n = Math.floor(n / 10);
    }
    // Desapilamos y reconstruimos el número revertido
    var invertido = 0;
    var factor = 1;
    while (!stack.isEmpty()) {
        invertido += stack.pop() * factor;
        factor *= 10;
    }
    // Si el número era negativo, devolvemos el negativo
    return numero < 0 ? -invertido : invertido;
}
// Ejemplo de uso
var numero = 12345;
console.log("N\u00FAmero original: ".concat(numero));
console.log("N\u00FAmero revertido: ".concat(revertirNumero(numero)));
