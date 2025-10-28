# ============================================
# 🏥 Lista Circular Doble - Sistema de turnos hospitalarios
# ============================================

class Patient:
    """Nodo que representa un paciente en la lista circular."""
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.next = None
        self.prev = None


class PatientQueue:
    """Maneja una lista circular doble de pacientes (turnos)."""
    def __init__(self):
        self.head = None

    def add_patient(self, id, name):
        """Agrega un paciente al final de la lista."""
        new_patient = Patient(id, name)
        if self.head is None:
            self.head = new_patient
            new_patient.next = new_patient
            new_patient.prev = new_patient
        else:
            last = self.head.prev
            last.next = new_patient
            new_patient.prev = last
            new_patient.next = self.head
            self.head.prev = new_patient

    def next_patient(self):
        """Pasa al siguiente turno (mueve el head)."""
        if self.head is None:
            print("No hay pacientes en la lista.")
            return
        print(f"🩺 Atendiendo a: {self.head.name}")
        self.head = self.head.next

    def remove_patient(self, id):
        """Elimina un paciente de la lista."""
        if self.head is None:
            print("Lista vacía.")
            return

        current = self.head
        while True:
            if current.id == id:
                if current.next == current:
                    self.head = None
                else:
                    current.prev.next = current.next
                    current.next.prev = current.prev
                    if current == self.head:
                        self.head = current.next
                print(f"🗑️ Paciente con ID {id} eliminado.")
                return
            current = current.next
            if current == self.head:
                break
        print("⚠️ Paciente no encontrado.")

    def show_queue(self):
        """Muestra todos los pacientes en la lista."""
        if self.head is None:
            print("No hay pacientes en espera.")
            return

        print("🧾 Lista de pacientes:")
        current = self.head
        while True:
            print(f" - {current.id}: {current.name}")
            current = current.next
            if current == self.head:
                break


# === Prueba ===
queue = PatientQueue()
queue.add_patient(101, "Felipe Narváez")
queue.add_patient(102, "María Gómez")
queue.add_patient(103, "Juan Pérez")

queue.show_queue()
queue.next_patient()
queue.next_patient()
queue.remove_patient(102)
queue.show_queue()
