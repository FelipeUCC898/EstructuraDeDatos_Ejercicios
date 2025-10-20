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

// Función para invertir los dígitos de un número usando una pila
function revertirNumero(numero: number): number {
    const stack = new Stack<number>();
    let n = Math.abs(numero);

    // Apilamos cada dígito
    while (n > 0) {
        stack.push(n % 10);
        n = Math.floor(n / 10);
    }

    // Desapilamos y reconstruimos el número revertido
    let invertido = 0;
    let factor = 1;
    while (!stack.isEmpty()) {
        invertido += stack.pop()! * factor;
        factor *= 10;
    }

    // Si el número era negativo, devolvemos el negativo
    return numero < 0 ? -invertido : invertido;
}

// Ejemplo de uso
const numero = 12345;
console.log(`Número original: ${numero}`);
console.log(`Número revertido: ${revertirNumero(numero)}`);

