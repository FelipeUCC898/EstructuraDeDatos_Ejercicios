# ==============================================================
# 🧠 LISTA DOBLEMENTE ENLAZADA CIRCULAR - GESTOR DE TAREAS
# ==============================================================

class Tarea:
    """Representa un nodo (tarea) dentro de una lista doblemente enlazada circular."""

    def __init__(self, nombre):
        self.nombre = nombre
        self.anterior = None
        self.siguiente = None


class ListaTareas:
    """Lista doblemente enlazada circular para gestionar tareas."""

    def __init__(self):
        self.inicio = None

    def agregar_inicio(self, nombre):
        """Agrega una nueva tarea al inicio de la lista."""
        nueva = Tarea(nombre)
        if self.inicio is None:
            self.inicio = nueva
            nueva.siguiente = nueva
            nueva.anterior = nueva
        else:
            ultima = self.inicio.anterior
            nueva.siguiente = self.inicio
            nueva.anterior = ultima
            ultima.siguiente = nueva
            self.inicio.anterior = nueva
            self.inicio = nueva

    def agregar_final(self, nombre):
        """Agrega una nueva tarea al final de la lista."""
        nueva = Tarea(nombre)
        if self.inicio is None:
            self.inicio = nueva
            nueva.siguiente = nueva
            nueva.anterior = nueva
        else:
            ultima = self.inicio.anterior
            ultima.siguiente = nueva
            nueva.anterior = ultima
            nueva.siguiente = self.inicio
            self.inicio.anterior = nueva

    def eliminar(self, nombre):
        """Elimina una tarea específica por su nombre."""
        if self.inicio is None:
            print("⚠️ No hay tareas para eliminar.")
            return

        actual = self.inicio
        while True:
            if actual.nombre == nombre:
                if actual.siguiente == actual:
                    # Solo una tarea
                    self.inicio = None
                else:
                    actual.anterior.siguiente = actual.siguiente
                    actual.siguiente.anterior = actual.anterior
                    if actual == self.inicio:
                        self.inicio = actual.siguiente
                print(f"🗑️ Tarea '{nombre}' eliminada.")
                return

            actual = actual.siguiente
            if actual == self.inicio:
                break
        print(f"❌ Tarea '{nombre}' no encontrada.")

    def imprimir(self):
        """Imprime todas las tareas en orden circular."""
        if self.inicio is None:
            print("📭 No hay tareas en la lista.")
            return

        actual = self.inicio
        tareas = []
        while True:
            tareas.append(actual.nombre)
            actual = actual.siguiente
            if actual == self.inicio:
                break
        print("📋 Lista de tareas:", " <-> ".join(tareas))


# ---------- CÓDIGO DE PRUEBA ----------
if __name__ == "__main__":
    tareas = ListaTareas()
    tareas.agregar_inicio("Desayunar")
    tareas.agregar_final("Ir al gimnasio")
    tareas.agregar_final("Estudiar Python")
    tareas.agregar_inicio("Levantarse")

    tareas.imprimir()
    tareas.eliminar("Ir al gimnasio")
    tareas.imprimir()
