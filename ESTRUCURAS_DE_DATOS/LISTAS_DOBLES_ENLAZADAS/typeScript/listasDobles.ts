// ------------------ Nodo ------------------
class Nodo<T> {
    value: T;
    next: Nodo<T> | null;
    prev: Nodo<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// ------------------ Lista Doblemente Enlazada ------------------
class DoublyLinkedList<T> {
    head: Nodo<T> | null;
    tail: Nodo<T> | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Agregar al final
    append(value: T): void {
        const newNode = new Nodo(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            if (this.tail) this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    // Agregar al inicio
    prepend(value: T): void {
        const newNode = new Nodo(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    // Obtener nodo en una posición específica
    traverseToIndex(index: number): Nodo<T> {
        if (index < 0 || index >= this.length) {
            throw new Error("Index out of range");
        }

        let current = this.head;
        let i = 0;
        while (current && i < index) {
            current = current.next;
            i++;
        }

        if (!current) throw new Error("Index not found");
        return current;
    }

    // Insertar en una posición
    insert(index: number, value: T): void {
        if (index <= 0) {
            this.prepend(value);
            return;
        }
        if (index >= this.length) {
            this.append(value);
            return;
        }

        const newNode = new Nodo(value);
        const leader = this.traverseToIndex(index - 1);
        const follower = leader.next;

        leader.next = newNode;
        newNode.prev = leader;
        newNode.next = follower;

        if (follower) follower.prev = newNode;

        this.length++;
    }

    // Eliminar un nodo en un índice
    remove(index: number): T {
        if (this.length === 0) {
            throw new Error("Remove from empty list");
        }
        if (index < 0 || index >= this.length) {
            throw new Error("Index out of range");
        }

        let removed: Nodo<T> | null = null;

        if (index === 0) {
            removed = this.head;
            this.head = this.head ? this.head.next : null;
            if (this.head) this.head.prev = null;
            else this.tail = null;
        } else if (index === this.length - 1) {
            removed = this.tail;
            this.tail = this.tail ? this.tail.prev : null;
            if (this.tail) this.tail.next = null;
            else this.head = null;
        } else {
            const leader = this.traverseToIndex(index - 1);
            removed = leader.next;
            const follower = removed ? removed.next : null;
            leader.next = follower;
            if (follower) follower.prev = leader;
        }

        this.length--;
        return removed ? removed.value : (undefined as any);
    }

    // Convertir a array (de cabeza a cola)
    toListForward(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    // Convertir a array (de cola a cabeza)
    toListBackward(): T[] {
        const result: T[] = [];
        let current = this.tail;
        while (current) {
            result.push(current.value);
            current = current.prev;
        }
        return result;
    }

    // Imprimir la lista
    printList(): void {
        const vals = this.toListForward();
        if (vals.length === 0) console.log("(empty)");
        else console.log(vals.join(" <-> "));
    }
}

// ------------------ Código de prueba ------------------
const myList = new DoublyLinkedList<number>();
myList.append(10);
myList.append(20);
myList.append(5);
myList.append(6);

console.log("Inicial:");
myList.printList(); // 10 <-> 20 <-> 5 <-> 6

console.log("\nInsertar 15 en pos 2:");
myList.insert(2, 15);
myList.printList(); // 10 <-> 20 <-> 15 <-> 5 <-> 6

console.log("\nPrepend 3:");
myList.prepend(3);
myList.printList(); // 3 <-> 10 <-> 20 <-> 15 <-> 5 <-> 6

console.log("\nInsertar 25 en pos 3:");
myList.insert(3, 25);
myList.printList(); // 3 <-> 10 <-> 20 <-> 25 <-> 15 <-> 5 <-> 6

console.log("\nEliminar último elemento:");
const removed = myList.remove(myList.length - 1);
console.log("Eliminado:", removed);
myList.printList();
