class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyCircularList:
    def __init__(self):
        self.head = None

    def insert_at_beginning(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            new_node.next = new_node
            new_node.prev = new_node
        else:
            last = self.head.prev
            new_node.next = self.head
            new_node.prev = last
            last.next = new_node
            self.head.prev = new_node
            self.head = new_node

    def insert_at_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            new_node.next = new_node
            new_node.prev = new_node
        else:
            last = self.head.prev
            last.next = new_node
            new_node.prev = last
            new_node.next = self.head
            self.head.prev = new_node

    def delete(self, data):
        if self.head is None:
            print("La lista está vacía")
            return

        current = self.head

        # Caso 1: solo hay un nodo
        if current.next == self.head and current.data == data:
            self.head = None
            return

        # Caso 2: eliminar el primero
        if current.data == data:
            last = self.head.prev
            self.head = current.next
            self.head.prev = last
            last.next = self.head
            return

        # Caso 3: eliminar en el medio o al final
        while current.next != self.head:
            if current.data == data:
                current.prev.next = current.next
                current.next.prev = current.prev
                return
            current = current.next

        # Caso 4: eliminar el último nodo
        if current.data == data:
            current.prev.next = self.head
            self.head.prev = current.prev

    def print_list(self):
        if self.head is None:
            print("Lista vacía")
            return

        current = self.head
        print("Elementos en la lista:")
        while True:
            print(current.data, end=" <-> ")
            current = current.next
            if current == self.head:
                break
        print()


# --- Prueba ---
my_list = DoublyCircularList()
my_list.insert_at_beginning(10)
my_list.insert_at_end(20)
my_list.insert_at_beginning(5)
my_list.insert_at_end(25)

my_list.print_list()

my_list.delete(5)
my_list.delete(25)

my_list.print_list()
