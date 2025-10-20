// Definición de la estructura Stack en TypeScript
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

    top(): T | undefined {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    }

    printStack(): void {
        console.log(this.items);
    }
}

// Función para verificar si una palabra/frase es palíndromo utilizando una pila
function esPalindromo(texto: string): boolean {
    const pila = new Stack<string>();
    // Limpiamos el texto: quitamos espacios y lo pasamos a minúsculas para facilitar la comprobación
    const limpio = texto.replace(/[\W_]/g, '').toLowerCase();

    // Apilamos cada caracter
    for (let char of limpio) {
        pila.push(char);
    }

    // Comparamos desapilando con el texto original limpio
    for (let char of limpio) {
        const letraPila = pila.pop();
        if (char !== letraPila) {
            return false;
        }
    }
    return true;
}

// Ejemplo de uso
const casos = [
    "Reconocer",
    "anita lava la tina",
    "Hola mundo",
    "A man, a plan, a canal: Panama"
];

casos.forEach((palabra) => {
    console.log(`'${palabra}' es palíndromo?`, esPalindromo(palabra) ? "Sí" : "No");
});
