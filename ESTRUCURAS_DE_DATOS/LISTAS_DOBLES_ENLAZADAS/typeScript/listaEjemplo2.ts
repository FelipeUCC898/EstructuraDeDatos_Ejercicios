/**
 * Clase que representa una tarea dentro de la lista doble circular.
 */
class Tarea {
  nombre: string;
  anterior: Tarea | null;
  siguiente: Tarea | null;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.anterior = null;
    this.siguiente = null;
  }
}

/**
 * Lista doblemente enlazada circular que almacena tareas pendientes.
 */
class ListaTareas {
  inicio: Tarea | null = null;

  /**
   * Inserta una nueva tarea al inicio de la lista.
   */
  agregarInicio(nombre: string): void {
    const nueva = new Tarea(nombre);

    if (this.inicio === null) {
      this.inicio = nueva;
      nueva.siguiente = nueva;
      nueva.anterior = nueva;
    } else {
      const ultima = this.inicio.anterior as Tarea;
      nueva.siguiente = this.inicio;
      nueva.anterior = ultima;
      ultima.siguiente = nueva;
      this.inicio.anterior = nueva;
      this.inicio = nueva;
    }
  }

  /**
   * Inserta una nueva tarea al final de la lista.
   */
  agregarFinal(nombre: string): void {
    const nueva = new Tarea(nombre);

    if (this.inicio === null) {
      this.inicio = nueva;
      nueva.siguiente = nueva;
      nueva.anterior = nueva;
    } else {
      const ultima = this.inicio.anterior as Tarea;
      ultima.siguiente = nueva;
      nueva.anterior = ultima;
      nueva.siguiente = this.inicio;
      this.inicio.anterior = nueva;
    }
  }

  /**
   * Elimina una tarea por su nombre.
   */
  eliminar(nombre: string): void {
    if (this.inicio === null) {
      console.log("⚠️ No hay tareas para eliminar.");
      return;
    }

    let actual = this.inicio;
    do {
      if (actual.nombre === nombre) {
        if (actual.siguiente === actual) {
          // Solo un elemento
          this.inicio = null;
        } else {
          (actual.anterior as Tarea).siguiente = actual.siguiente;
          (actual.siguiente as Tarea).anterior = actual.anterior;
          if (actual === this.inicio) this.inicio = actual.siguiente;
        }
        console.log(`🗑️ Tarea "${nombre}" eliminada.`);
        return;
      }
      actual = actual.siguiente as Tarea;
    } while (actual !== this.inicio);

    console.log(`❌ Tarea "${nombre}" no encontrada.`);
  }

  /**
   * Imprime todas las tareas en la lista circular.
   */
  imprimir(): void {
    if (this.inicio === null) {
      console.log("📭 No hay tareas en la lista.");
      return;
    }

    const tareas: string[] = [];
    let actual = this.inicio;
    do {
      tareas.push(actual.nombre);
      actual = actual.siguiente as Tarea;
    } while (actual !== this.inicio);

    console.log("📋 Lista de tareas:", tareas.join(" <-> "));
  }
}

// --- PRUEBA ---
const tareas = new ListaTareas();
tareas.agregarInicio("Desayunar");
tareas.agregarFinal("Ir al gimnasio");
tareas.agregarFinal("Estudiar TypeScript");
tareas.agregarInicio("Levantarse");

tareas.imprimir();
tareas.eliminar("Ir al gimnasio");
tareas.imprimir();
