# Doubly linked list - versión corregida y sencilla

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def append(self, value):
        """Agregar al final"""
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self.length += 1

    def prepend(self, value):
        """Agregar al inicio"""
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.length += 1

    def traverse_to_index(self, index):
        """Devuelve el nodo en la posición index (0-based). Lanza IndexError si fuera de rango."""
        if index < 0 or index >= self.length:
            raise IndexError("Index out of range")
        current = self.head
        i = 0
        while i < index:
            current = current.next
            i += 1
        return current

    def insert(self, index, value):
        """Inserta en la posición index (0 = inicio). Si index >= length -> append."""
        if index <= 0:
            self.prepend(value)
            return
        if index >= self.length:
            self.append(value)
            return
        # insertar en medio
        new_node = Node(value)
        leader = self.traverse_to_index(index - 1)
        follower = leader.next
        leader.next = new_node
        new_node.prev = leader
        new_node.next = follower
        if follower:
            follower.prev = new_node
        self.length += 1

    def remove(self, index):
        """Elimina el nodo en la posición index (0-based). Lanza IndexError si fuera de rango."""
        if self.length == 0:
            raise IndexError("Remove from empty list")
        if index < 0 or index >= self.length:
            raise IndexError("Index out of range")

        if index == 0:
            # eliminar cabeza
            removed = self.head
            self.head = self.head.next
            if self.head:
                self.head.prev = None
            else:
                # lista quedó vacía
                self.tail = None
            self.length -= 1
            return removed.value

        if index == self.length - 1:
            # eliminar cola
            removed = self.tail
            self.tail = self.tail.prev
            if self.tail:
                self.tail.next = None
            else:
                self.head = None
            self.length -= 1
            return removed.value

        leader = self.traverse_to_index(index - 1)
        unwanted = leader.next
        follower = unwanted.next
        leader.next = follower
        if follower:
            follower.prev = leader
        self.length -= 1
        return unwanted.value

    def to_list_forward(self):
        result = []
        current = self.head
        while current:
            result.append(current.value)
            current = current.next
        return result

    def to_list_backward(self):
        result = []
        current = self.tail
        while current:
            result.append(current.value)
            current = current.prev
        return result

    def print_list(self):
        vals = self.to_list_forward()
        if not vals:
            print("(empty)")
        else:
            print(" <-> ".join(str(v) for v in vals))


# ---------- Código de prueba ----------
if __name__ == "__main__":
    my_list = DoublyLinkedList()
    my_list.append(10)
    my_list.append(20)
    my_list.append(5)
    my_list.append(6)

    print("Inicial:")
    my_list.print_list()              # 10 <-> 20 <-> 5 <-> 6

    print("\nInsertar 15 en pos 2:")
    my_list.insert(2, 15)
    my_list.print_list()              # 10 <-> 20 <-> 15 <-> 5 <-> 6

    print("\nPrepend 3:")
    my_list.prepend(3)
    my_list.print_list()              # 3 <-> 10 <-> 20 <-> 15 <-> 5 <-> 6

    print("\nInsertar 25 en pos 3:")
    my_list.insert(3, 25)
    my_list.print_list()              # 3 <-> 10 <-> 20 <-> 25 <-> 15 <-> 5 <-> 6

    print("\nEliminar índice 7 (último):")
    try:
        removed = my_list.remove(my_list.length - 1)
        print("Eliminado:", removed)
    except IndexError as e:
        print("Error:", e)
    my_list.print_list()
