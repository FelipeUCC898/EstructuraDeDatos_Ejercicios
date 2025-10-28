/**
 * Representa una canción dentro de la lista de reproducción circular.
 */
class Cancion {
  titulo: string;
  anterior: Cancion | null;
  siguiente: Cancion | null;

  constructor(titulo: string) {
    this.titulo = titulo;
    this.anterior = null;
    this.siguiente = null;
  }
}

/**
 * Clase que gestiona una lista circular de canciones.
 */
class ReproductorCircular {
  actual: Cancion | null = null;

  /**
   * Agrega una nueva canción al final.
   */
  agregarCancion(titulo: string): void {
    const nueva = new Cancion(titulo);

    if (this.actual === null) {
      this.actual = nueva;
      nueva.siguiente = nueva;
      nueva.anterior = nueva;
    } else {
      const ultima = this.actual.anterior as Cancion;
      ultima.siguiente = nueva;
      nueva.anterior = ultima;
      nueva.siguiente = this.actual;
      this.actual.anterior = nueva;
    }

    console.log(`🎵 Canción "${titulo}" agregada.`);
  }

  /**
   * Avanza a la siguiente canción.
   */
  siguienteCancion(): void {
    if (this.actual) {
      this.actual = this.actual.siguiente;
      console.log(`⏭️ Reproduciendo: ${this.actual?.titulo}`);
    }
  }

  /**
   * Retrocede a la canción anterior.
   */
  anteriorCancion(): void {
    if (this.actual) {
      this.actual = this.actual.anterior;
      console.log(`⏮️ Reproduciendo: ${this.actual?.titulo}`);
    }
  }

  /**
   * Muestra toda la lista de canciones.
   */
  mostrarLista(): void {
    if (this.actual === null) {
      console.log("🎧 Lista vacía.");
      return;
    }

    let temp = this.actual;
    const canciones: string[] = [];
    do {
      canciones.push(temp.titulo);
      temp = temp.siguiente as Cancion;
    } while (temp !== this.actual);

    console.log("Lista de reproducción:", canciones.join(" <-> "));
  }
}

// --- PRUEBA ---
const player = new ReproductorCircular();
player.agregarCancion("Imagine");
player.agregarCancion("Bohemian Rhapsody");
player.agregarCancion("Hotel California");

player.mostrarLista();
player.siguienteCancion();
player.siguienteCancion();
player.anteriorCancion();
