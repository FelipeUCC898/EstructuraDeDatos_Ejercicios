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

// Función para invertir un nombre usando la estructura de Stack
function nombreAlReves(nombre: string): string {
    const stack = new Stack<string>();
    // Apilamos cada caracter del nombre
    for (let char of nombre) {
        stack.push(char);
    }
    // Desapilamos para formar el nombre al revés
    let invertido = '';
    while (!stack.isEmpty()) {
        invertido += stack.pop();
    }
    return invertido;
}

// Ejemplo de uso:
const miNombre = "Andres";
console.log(`Nombre original: ${miNombre}`);
console.log(`Nombre al revés: ${nombreAlReves(miNombre)}`);
