class CarQueue:
    def __init__(self):
        self.elements = []

    def is_empty(self):
        return len(self.elements) == 0

    def enqueue(self, element):
        self.elements.append(element)

    def dequeue(self):
        if self.elements:
            return self.elements.pop(0)
        return None

    def peek(self):
        if self.elements:
            return self.elements[0]
        return None

    def show_all_cars(self):
        if self.is_empty():
            print("🚫 No hay carros en la cola.")
        else:
            print("🚗 Carros en la cola:")
            for i, car in enumerate(self.elements, start=1):
                print(f"  {i}. {car.brand} - {car.license_plate}")
    


class Car:
    def __init__(self, license_plate, brand):
        self.license_plate = license_plate
        self.brand = brand


class TrafficSimulation:
    def __init__(self, queue):
        self.queue = queue

    def simulate(self):
        count = 0
        while not self.queue.is_empty():
            car = self.queue.dequeue()
            if car:
                count += 1
                print(f"Car #{count}: {car.brand} ({car.license_plate}) was removed from the queue")


# --- Ejecución del programa ---
if __name__ == "__main__":
    queue = CarQueue()
    queue.enqueue(Car('ABC-123', 'Mazda'))
    queue.enqueue(Car('DEF-456', 'Toyota'))
    queue.enqueue(Car('GHI-789', 'Honda'))
    queue.enqueue(Car('JKL-012', 'Ford'))

    queue.show_all_cars()

    print("\n🟢 Iniciando simulación...\n")
    simulation = TrafficSimulation(queue)
    simulation.simulate()

    print("\n🔴 Estado final de la cola:")
    queue.show_all_cars()
