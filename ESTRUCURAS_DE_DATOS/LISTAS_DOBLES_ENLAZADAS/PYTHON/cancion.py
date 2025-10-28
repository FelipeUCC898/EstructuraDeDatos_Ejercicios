# ==============================================================
# 🎶 LISTA DOBLE CIRCULAR - REPRODUCTOR DE CANCIONES
# ==============================================================

class Cancion:
    """Representa una canción dentro de la lista de reproducción."""
    def __init__(self, titulo):
        self.titulo = titulo
        self.anterior = None
        self.siguiente = None


class ReproductorCircular:
    """Gestiona la lista circular de canciones."""
    def __init__(self):
        self.actual = None

    def agregar_cancion(self, titulo):
        """Agrega una nueva canción al final de la lista."""
        nueva = Cancion(titulo)
        if self.actual is None:
            self.actual = nueva
            nueva.siguiente = nueva
            nueva.anterior = nueva
        else:
            ultima = self.actual.anterior
            ultima.siguiente = nueva
            nueva.anterior = ultima
            nueva.siguiente = self.actual
            self.actual.anterior = nueva
        print(f"🎵 Canción '{titulo}' agregada.")

    def siguiente_cancion(self):
        """Avanza a la siguiente canción."""
        if self.actual:
            self.actual = self.actual.siguiente
            print(f"⏭️ Reproduciendo: {self.actual.titulo}")

    def anterior_cancion(self):
        """Retrocede a la canción anterior."""
        if self.actual:
            self.actual = self.actual.anterior
            print(f"⏮️ Reproduciendo: {self.actual.titulo}")

    def mostrar_lista(self):
        """Muestra todas las canciones en la lista."""
        if self.actual is None:
            print("🎧 Lista vacía.")
            return

        canciones = []
        temp = self.actual
        while True:
            canciones.append(temp.titulo)
            temp = temp.siguiente
            if temp == self.actual:
                break
        print("🎶 Lista de reproducción:", " <-> ".join(canciones))


# ---------- CÓDIGO DE PRUEBA ----------
if __name__ == "__main__":
    player = ReproductorCircular()
    player.agregar_cancion("Imagine")
    player.agregar_cancion("Bohemian Rhapsody")
    player.agregar_cancion("Hotel California")

    player.mostrar_lista()
    player.siguiente_cancion()
    player.siguiente_cancion()
    player.anterior_cancion()
