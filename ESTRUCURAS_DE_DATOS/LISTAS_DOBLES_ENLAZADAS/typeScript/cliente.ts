/**
 * Nodo que representa un cliente en la cola circular.
 */
class Cliente {
  nombre: string;
  anterior: Cliente | null;
  siguiente: Cliente | null;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.anterior = null;
    this.siguiente = null;
  }
}

/**
 * Lista circular doble que maneja turnos de clientes.
 */
class ColaCircular {
  inicio: Cliente | null = null;

  /**
   * Agrega un cliente al final de la cola.
   */
  agregarCliente(nombre: string): void {
    const nuevo = new Cliente(nombre);

    if (this.inicio === null) {
      this.inicio = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      const ultimo = this.inicio.anterior as Cliente;
      ultimo.siguiente = nuevo;
      nuevo.anterior = ultimo;
      nuevo.siguiente = this.inicio;
      this.inicio.anterior = nuevo;
    }

    console.log(`✅ Cliente "${nombre}" agregado a la cola.`);
  }

  /**
   * Atiende al siguiente cliente (mueve al final de la cola).
   */
  atenderCliente(): void {
    if (this.inicio === null) {
      console.log("⚠️ No hay clientes en la cola.");
      return;
    }

    console.log(`👩‍💼 Atendiendo a: ${this.inicio.nombre}`);
    this.inicio = this.inicio.siguiente;
  }

  /**
   * Muestra todos los clientes en espera.
   */
  mostrarCola(): void {
    if (this.inicio === null) {
      console.log("La cola está vacía.");
      return;
    }

    let actual = this.inicio;
    const lista: string[] = [];
    do {
      lista.push(actual.nombre);
      actual = actual.siguiente as Cliente;
    } while (actual !== this.inicio);

    console.log("🧾 Cola de clientes:", lista.join(" -> "));
  }
}

// --- PRUEBA ---
const cola = new ColaCircular();
cola.agregarCliente("Carlos");
cola.agregarCliente("Ana");
cola.agregarCliente("Luis");

cola.mostrarCola();
cola.atenderCliente();
cola.mostrarCola();
