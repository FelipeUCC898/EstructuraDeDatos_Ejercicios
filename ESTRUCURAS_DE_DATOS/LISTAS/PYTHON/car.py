class Auto:
    def __init__(self, plate, brand, color):
        self.plate = plate
        self.brand = brand
        self.color = color

    def get_plate(self):
        return self.plate

    def set_plate(self, plate):
        self.plate = plate

    def get_brand(self):
        return self.brand

    def set_brand(self, brand):
        self.brand = brand

    def get_color(self):
        return self.color

    def set_color(self, color):
        self.color = color


class Parking:
    def __init__(self, number_spaces):
        self.number_spaces = number_spaces
        self.cars_parked = []

    def search_car(self, plate):
        for i, car in enumerate(self.cars_parked):
            if car.get_plate() == plate:
                return i
        return -1

    def add_car(self, car):
        if len(self.cars_parked) < self.number_spaces:
            self.cars_parked.append(car)
        else:
            print("No more parking spaces available.")

    def delete_car(self, plate):
        index = self.search_car(plate)
        if index != -1:
            del self.cars_parked[index]
            print(f"Car with plate {plate} removed.")
        else:
            print("Car not found.")

    def update_car(self, plate, new_car):
        index = self.search_car(plate)
        if index != -1:
            self.cars_parked[index] = new_car
            print(f"Car with plate {plate} updated.")
        else:
            print("Car not found.")

    def get_quantity_spaces_available(self):
        quantity = self.number_spaces - len(self.cars_parked)
        print(f"Quantity spaces available: {quantity}")

    def list_cars_parked(self):
        if not self.cars_parked:
            print("No cars parked.")
        else:
            print("Cars parked:")
            for car in self.cars_parked:
                print(f" - Plate: {car.get_plate()}, Brand: {car.get_brand()}, Color: {car.get_color()}")


# === Simulation ===
parking = Parking(10)

car_mazda = Auto('AAAA-123', 'MAZDA', 'RED')
ferrari = Auto('BBB-234', 'FERRARI', 'BLACK')
mki = Auto('DDD-012', 'MKI', 'BLUE')
ford = Auto('CCC-345', 'FORD', 'WHITE')
car_chevrolet = Auto('FFF-567', 'CHEVROLET', 'GRAY')
car_audi = Auto('EEE-345', 'AUDI', 'RED')
car_kia = Auto('GGG-678', 'KIA', 'SILVER')

parking.add_car(car_mazda)
parking.add_car(ferrari)
parking.add_car(mki)
parking.add_car(ford)
parking.add_car(car_audi)
parking.add_car(car_kia)

parking.get_quantity_spaces_available()
parking.list_cars_parked()

parking.update_car('DDD-012', ferrari)

parking.list_cars_parked()

parking.delete_car('EEE-345')

parking.list_cars_parked()
parking.get_quantity_spaces_available()
