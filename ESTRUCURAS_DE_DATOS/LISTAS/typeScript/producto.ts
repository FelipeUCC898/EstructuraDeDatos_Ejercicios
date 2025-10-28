class Product:
    """Representa un producto dentro del inventario."""
    def __init__(self, code, name, stock, price):
        self.code = code
        self.name = name
        self.stock = stock
        self.price = price

    def get_info(self):
        return f"Código: {self.code}, Producto: {self.name}, Stock: {self.stock}, Precio: ${self.price}"


class Inventory:
    """Gestión básica de un inventario de productos."""
    def __init__(self):
        self.products = []

    def add_product(self, product):
        """Agrega un producto al inventario."""
        self.products.append(product)
        print(f"✅ Producto '{product.name}' agregado al inventario.")

    def remove_product(self, code):
        """Elimina un producto del inventario por código."""
        for i, p in enumerate(self.products):
            if p.code == code:
                del self.products[i]
                print(f"🗑️ Producto {code} eliminado del inventario.")
                return
        print("❌ Producto no encontrado.")

    def update_stock(self, code, new_stock):
        """Actualiza el stock de un producto."""
        for p in self.products:
            if p.code == code:
                p.stock = new_stock
                print(f"📦 Stock actualizado para {p.name}: {new_stock} unidades.")
                return
        print("❌ Producto no encontrado.")

    def list_inventory(self):
        """Muestra todos los productos del inventario."""
        if not self.products:
            print("Inventario vacío.")
        else:
            print("🛒 Productos en inventario:")
            for p in self.products:
                print(" -", p.get_info())


# === Simulación ===
store = Inventory()

p1 = Product("001", "Proteína Whey", 15, 120000)
p2 = Product("002", "Creatina Monohidratada", 10, 90000)
p3 = Product("003", "BCAA", 8, 75000)

store.add_product(p1)
store.add_product(p2)
store.add_product(p3)

store.list_inventory()
store.update_stock("001", 20)
store.remove_product("002")
store.list_inventory()
