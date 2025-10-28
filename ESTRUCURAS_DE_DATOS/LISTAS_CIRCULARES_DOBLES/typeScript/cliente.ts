class Cliente {
    nombre: string;
    prev: Cliente | null;
    next: Cliente | null;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.prev = null;
        this.next = null;
    }
}

class ColaClientes {
    head: Cliente | null;

    constructor() {
        this.head = null;
    }

    agregarCliente(nombre: string): void {
        const nuevo = new Cliente(nombre);

        if (!this.head) {
            this.head = nuevo;
            nuevo.next = nuevo;
            nuevo.prev = nuevo;
        } else {
            const last = this.head.prev!;
            last.next = nuevo;
            nuevo.prev = last;
            nuevo.next = this.head;
            this.head.prev = nuevo;
        }
    }

    atenderCliente(): void {
        if (!this.head) {
            console.log("No hay clientes en espera");
            return;
        }

        console.log(`👋 Atendiendo a ${this.head.nombre}`);

        if (this.head.next === this.head) {
            this.head = null;
        } else {
            const last = this.head.prev!;
            this.head = this.head.next!;
            this.head.prev = last;
            last.next = this.head;
        }
    }

    mostrarCola(): void {
        if (!this.head) {
            console.log("Cola vacía");
            return;
        }

        let actual = this.head;
        console.log("Clientes en cola:");
        do {
            console.log(`🧍 ${actual.nombre}`);
            actual = actual.next!;
        } while (actual !== this.head);
    }
}

// --- Prueba ---
const cola = new ColaClientes();
cola.agregarCliente("Juan");
cola.agregarCliente("María");
cola.agregarCliente("Carlos");

cola.mostrarCola();
cola.atenderCliente();
cola.mostrarCola();
