class Cancion {
    titulo: string;
    prev: Cancion | null;
    next: Cancion | null;

    constructor(titulo: string) {
        this.titulo = titulo;
        this.prev = null;
        this.next = null;
    }
}

class Playlist {
    actual: Cancion | null;

    constructor() {
        this.actual = null;
    }

    agregarCancion(titulo: string): void {
        const nueva = new Cancion(titulo);

        if (!this.actual) {
            this.actual = nueva;
            nueva.next = nueva;
            nueva.prev = nueva;
        } else {
            const last = this.actual.prev!;
            last.next = nueva;
            nueva.prev = last;
            nueva.next = this.actual;
            this.actual.prev = nueva;
        }
    }

    siguiente(): void {
        if (!this.actual) return;
        this.actual = this.actual.next!;
        console.log(`🎵 Reproduciendo: ${this.actual.titulo}`);
    }

    anterior(): void {
        if (!this.actual) return;
        this.actual = this.actual.prev!;
        console.log(`🎵 Reproduciendo: ${this.actual.titulo}`);
    }

    mostrarPlaylist(): void {
        if (!this.actual) {
            console.log("Playlist vacía");
            return;
        }

        let temp = this.actual;
        console.log("🎶 Lista de canciones:");
        do {
            console.log(`🎧 ${temp.titulo}`);
            temp = temp.next!;
        } while (temp !== this.actual);
    }
}

// --- Prueba ---
const playlist = new Playlist();
playlist.agregarCancion("Imagine - John Lennon");
playlist.agregarCancion("Billie Jean - Michael Jackson");
playlist.agregarCancion("Smells Like Teen Spirit - Nirvana");

playlist.mostrarPlaylist();
playlist.siguiente();
playlist.siguiente();
playlist.anterior();
