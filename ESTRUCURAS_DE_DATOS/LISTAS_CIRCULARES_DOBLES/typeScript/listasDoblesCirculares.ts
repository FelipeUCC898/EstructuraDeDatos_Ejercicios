// Clase que representa un elemento (nodo) de la lista
class Elemento {
  valor: number;
  anterior: Elemento | null;
  siguiente: Elemento | null;

  constructor(valor: number) {
    this.valor = valor;
    this.anterior = null;
    this.siguiente = null;
  }
}

// Clase principal que maneja la lista doble enlazada circular
class ListaCircularDoble {
  inicio: Elemento | null;

  constructor() {
    this.inicio = null;
  }

  // Insertar un nodo al inicio de la lista
  insertarAlInicio(valor: number): void {
    const nuevo = new Elemento(valor);

    if (this.inicio === null) {
      // Si la lista está vacía, el nodo se apunta a sí mismo
      this.inicio = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      const ultimo = this.inicio.anterior as Elemento;

      // Conectar el nuevo nodo
      nuevo.siguiente = this.inicio;
      nuevo.anterior = ultimo;

      // Actualizar enlaces del primero y del último
      this.inicio.anterior = nuevo;
      ultimo.siguiente = nuevo;

      // Actualizar la referencia de inicio
      this.inicio = nuevo;
    }
  }

  // Insertar un nodo al final de la lista
  insertarAlFinal(valor: number): void {
    const nuevo = new Elemento(valor);

    if (this.inicio === null) {
      this.inicio = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      const ultimo = this.inicio.anterior as Elemento;

      // Enlazar el nuevo nodo con el último y el primero
      ultimo.siguiente = nuevo;
      nuevo.anterior = ultimo;
      nuevo.siguiente = this.inicio;
      this.inicio.anterior = nuevo;
    }
  }

  // Eliminar un nodo por valor
  eliminar(valor: number): void {
    if (this.inicio === null) {
      console.log("⚠️ La lista está vacía");
      return;
    }

    let actual = this.inicio;

    // Si el nodo a eliminar es el primero
    if (actual.valor === valor) {
      if (actual.siguiente === this.inicio) {
        this.inicio = null; // Solo había un elemento
      } else {
        const ultimo = this.inicio.anterior as Elemento;
        this.inicio = actual.siguiente;
        (this.inicio as Elemento).anterior = ultimo;
        ultimo.siguiente = this.inicio;
      }
      return;
    }

    // Buscar el nodo a eliminar recorriendo la lista
    do {
      if (actual.valor === valor) {
        (actual.anterior as Elemento).siguiente = actual.siguiente;
        (actual.siguiente as Elemento).anterior = actual.anterior;
        return;
      }
      actual = actual.siguiente as Elemento;
    } while (actual !== this.inicio);

    console.log(`⚠️ No se encontró el valor ${valor} en la lista`);
  }

  // Imprimir los valores de la lista
  imprimir(): void {
    if (this.inicio === null) {
      console.log("La lista está vacía");
      return;
    }

    let actual = this.inicio;
    const elementos: number[] = [];

    do {
      elementos.push(actual.valor);
      actual = actual.siguiente as Elemento;
    } while (actual !== this.inicio);

    console.log("Lista doble enlazada circular:", elementos.join(" <-> "));
  }
}

// --- PRUEBA DEL CÓDIGO ---
const lista = new ListaCircularDoble();

lista.insertarAlInicio(10);
lista.insertarAlFinal(20);
lista.insertarAlInicio(5);
lista.insertarAlFinal(25);

lista.imprimir();

lista.eliminar(5);
lista.eliminar(25);

lista.imprimir();
