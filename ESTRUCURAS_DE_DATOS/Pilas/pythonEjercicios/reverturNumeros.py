class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()

    def is_empty(self):
        return len(self.items) == 0

    def top(self):
        if not self.is_empty():
            return self.items[-1]

    def print_stack(self):
        print(self.items)

# Ejemplo práctico: Revertir el orden de una lista de números usando una pila
def revertir_lista(lista):
    pila = Stack()
    for elemento in lista:
        pila.push(elemento)
    
    lista_revertida = []
    while not pila.is_empty():
        lista_revertida.append(pila.pop())
    
    return lista_revertida

# Prueba del ejemplo
numeros = [1, 2, 3, 4, 5]
print("Lista original:", numeros)
print("Lista revertida:", revertir_lista(numeros))
