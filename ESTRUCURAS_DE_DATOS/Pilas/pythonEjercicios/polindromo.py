"En este codigo se implementa una pila con los metodos push, pop, is_empty, top y print_stack, y se utilizarad para crear un ejemplo practico y sencillo con el uso de pilas, al estilo de los anteriores ejemplos. "

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

# Ejemplo práctico: Verificar si una palabra es un palíndromo utilizando una pila
def es_palindromo(palabra):
    pila = Stack()
    for char in palabra:
        pila.push(char)

    
    print(pila.items)

    palabra_invertida = ""
    while not pila.is_empty():
        palabra_invertida += pila.pop()

    print(palabra_invertida)

    return palabra == palabra_invertida

# Prueba del ejemplo
palabra = "reconocer"
print(f"¿'{palabra}' es palíndromo?: {es_palindromo(palabra)}")

palabra2 = "pila"
print(f"¿'{palabra2}' es palíndromo?: {es_palindromo(palabra2)}")
