# ============================================
# 🛍️ Lista Circular Doble - Gestión de productos
# ============================================

class ProductNode:
    """Nodo que representa un producto en la lista circular."""
    def __init__(self, code, name, price):
        self.code = code
        self.name = name
        self.price = price
        self.next = None
        self.prev = None


class ProductList:
    """Maneja una lista circular doble de productos."""
    def __init__(self):
        self.head = None

    def add_product(self, code, name, price):
        """Agrega un nuevo producto al final."""
        new_product = ProductNode(code, name, price)
        if self.head is None:
            self.head = new_product
            new_product.next = new_product
            new_product.prev = new_product
        else:
            last = self.head.prev
            last.next = new_product
            new_product.prev = last
            new_product.next = self.head
            self.head.prev = new_product

    def remove_product(self, code):
        """Elimina un producto por su código."""
        if self.head is None:
            print("Inventario vacío.")
            return

        current = self.head
        while True:
            if current.code == code:
                if current.next == current:
                    self.head = None
                else:
                    current.prev.next = current.next
                    current.next.prev = current.prev
                    if current == self.head:
                        self.head = current.next
                print(f"🗑️ Producto {code} eliminado.")
                return
            current = current.next
            if current == self.head:
                break
        print("⚠️ Producto no encontrado.")

    def show_inventory(self):
        """Muestra todos los productos del inventario."""
        if self.head is None:
            print("No hay productos.")
            return

        print("📦 Inventario actual:")
        current = self.head
        while True:
            print(f" - {current.code} | {current.name} | ${current.price}")
            current = current.next
            if current == self.head:
                break


# === Prueba ===
store = ProductList()
store.add_product("P001", "Proteína Whey", 120000)
store.add_product("P002", "Creatina", 95000)
store.add_product("P003", "BCAA", 70000)
store.show_inventory()

store.remove_product("P002")
store.show_inventory()
