# ============================================
# 🪩 Lista Circular Doble - Reproductor de música
# ============================================

class Song:
    """Nodo que representa una canción en la lista circular doble."""
    def __init__(self, title, artist):
        self.title = title
        self.artist = artist
        self.next = None
        self.prev = None


class MusicPlaylist:
    """Clase que maneja una lista circular doble de canciones."""
    def __init__(self):
        self.head = None

    def add_song(self, title, artist):
        """Agrega una nueva canción al final de la lista."""
        new_song = Song(title, artist)
        if self.head is None:
            self.head = new_song
            new_song.next = new_song
            new_song.prev = new_song
        else:
            last = self.head.prev
            last.next = new_song
            new_song.prev = last
            new_song.next = self.head
            self.head.prev = new_song

    def delete_song(self, title):
        """Elimina una canción por su título."""
        if self.head is None:
            print("🎵 La lista está vacía.")
            return

        current = self.head
        while True:
            if current.title == title:
                if current.next == current:  # Solo un nodo
                    self.head = None
                else:
                    current.prev.next = current.next
                    current.next.prev = current.prev
                    if current == self.head:
                        self.head = current.next
                print(f"❌ Canción '{title}' eliminada.")
                return
            current = current.next
            if current == self.head:
                break
        print("⚠️ Canción no encontrada.")

    def show_playlist(self):
        """Muestra todas las canciones en la lista."""
        if self.head is None:
            print("Lista vacía.")
            return

        print("🎧 Playlist actual:")
        current = self.head
        while True:
            print(f" - {current.title} ({current.artist})")
            current = current.next
            if current == self.head:
                break


# === Prueba ===
playlist = MusicPlaylist()
playlist.add_song("Shape of You", "Ed Sheeran")
playlist.add_song("Bohemian Rhapsody", "Queen")
playlist.add_song("Levitating", "Dua Lipa")
playlist.show_playlist()

playlist.delete_song("Bohemian Rhapsody")
playlist.show_playlist()
