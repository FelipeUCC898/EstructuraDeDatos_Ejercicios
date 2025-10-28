# ==============================================================
# 🧾 LISTA DOBLE CIRCULAR - SISTEMA DE TURNOS
# ==============================================================

class Cliente:
    """Nodo que representa un cliente en la cola circular."""
    def __init__(self, nombre):
        self.nombre = nombre
        self.anterior = None
        self.siguiente = None


class ColaCircular:
    """Maneja una cola circular de clientes."""
    def __init__(self):
        self.inicio = None

    def agregar_cliente(self, nombre):
        """Agrega un cliente al final de la cola."""
        nuevo = Cliente(nombre)
        if self.inicio is None:
            self.inicio = nuevo
            nuevo.siguiente = nuevo
            nuevo.anterior = nuevo
        else:
            ultimo = self.inicio.anterior
            ultimo.siguiente = nuevo
            nuevo.anterior = ultimo
            nuevo.siguiente = self.inicio
            self.inicio.anterior = nuevo
        print(f"✅ Cliente '{nombre}' agregado a la cola.")

    def atender_cliente(self):
        """Atiende al siguiente cliente (mueve al final)."""
        if self.inicio is None:
            print("⚠️ No hay clientes en la cola.")
            return
        print(f"👩‍💼 Atendiendo a: {self.inicio.nombre}")
        self.inicio = self.inicio.siguiente

    def mostrar_cola(self):
        """Muestra todos los clientes en la cola circular."""
        if self.inicio is None:
            print("📭 La cola está vacía.")
            return

        actual = self.inicio
        lista = []
        while True:
            lista.append(actual.nombre)
            actual = actual.siguiente
            if actual == self.inicio:
                break
        print("🧾 Cola de clientes:", " -> ".join(lista))


# ---------- CÓDIGO DE PRUEBA ----------
if __name__ == "__main__":
    cola = ColaCircular()
    cola.agregar_cliente("Carlos")
    cola.agregar_cliente("Ana")
    cola.agregar_cliente("Luis")

    cola.mostrar_cola()
    cola.atender_cliente()
    cola.mostrar_cola()
