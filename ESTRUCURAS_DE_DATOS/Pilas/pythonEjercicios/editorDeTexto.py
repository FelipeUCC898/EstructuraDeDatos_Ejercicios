class Stack:
    """Mini editor de texto"""
    """este codigo define una clase Stack que implementa una pila con métodos para agregar, eliminar, ver el elemento superior y verificar si está vacía."""
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def is_empty(self):
        return len(self.items) == 0

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

class MiniEditor:
    def __init__(self):
        self.text = ""
        self.undo_stack = Stack()
        self.redo_stack = Stack()

    def save(self, new_text):
        self.undo_stack.push(self.text)
        self.text = new_text
        self.redo_stack = Stack()  # Clear redo stack

    def undo(self):
        if not self.undo_stack.is_empty():
            self.redo_stack.push(self.text)
            self.text = self.undo_stack.pop()
        else:
            print("Nada para deshacer.")

    def redo(self):
        if not self.redo_stack.is_empty():
            self.undo_stack.push(self.text)
            self.text = self.redo_stack.pop()
        else:
            print("Nada para rehacer.")

    def show(self):
        print(f"Texto actual: '{self.text}'")


def menu():
    editor = MiniEditor()
    while True:
        print("\n1. Escribir texto")
        print("2. Guardar")
        print("3. Deshacer")
        print("4. Rehacer")
        print("5. Mostrar texto")
        print("6. Salir")
        option = input("Elige una opción: ")

        if option == "1":
            new_input = input("Escribe el texto: ")
            editor.text = new_input
        elif option == "2":
            editor.save(editor.text)
            print("Texto guardado.")
        elif option == "3":
            editor.undo()
        elif option == "4":
            editor.redo()
        elif option == "5":
            editor.show()
        elif option == "6":
            break
        else:
            print("Opción no válida.")


if __name__ == "__main__":
    menu()
