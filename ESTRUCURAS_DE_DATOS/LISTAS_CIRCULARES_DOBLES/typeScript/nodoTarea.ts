/**
 * Clase que representa un nodo dentro de la lista circular doblemente enlazada.
 */
class NodoTarea {
    data: string;
    prev: NodoTarea | null;
    next: NodoTarea | null;

    constructor(data: string) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Lista circular doblemente enlazada que maneja tareas pendientes.
 */
class ListaCircularTareas {
    head: NodoTarea | null;

    constructor() {
        this.head = null;
    }

    /**
     * Inserta una nueva tarea al final de la lista.
     */
    agregarTarea(tarea: string): void {
        const nuevo = new NodoTarea(tarea);

        if (this.head === null) {
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

    /**
     * Elimina una tarea específica de la lista.
     */
    eliminarTarea(tarea: string): void {
        if (this.head === null) return;

        let actual = this.head;

        do {
            if (actual.data === tarea) {
                actual.prev!.next = actual.next;
                actual.next!.prev = actual.prev;

                if (actual === this.head) this.head = actual.next;
                return;
            }
            actual = actual.next!;
        } while (actual !== this.head);
    }

    /**
     * Imprime todas las tareas en la lista.
     */
    mostrarTareas(): void {
        if (this.head === null) {
            console.log("No hay tareas pendientes");
            return;
        }

        let actual = this.head;
        console.log("Tareas en lista:");
        do {
            console.log("➡️ " + actual.data);
            actual = actual.next!;
