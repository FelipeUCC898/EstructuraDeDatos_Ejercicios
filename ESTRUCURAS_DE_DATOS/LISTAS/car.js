class Auto {
    constructor(plate, brand, color) {
        this.plate = plate;
        this.brand = brand;
        this.color = color;
    }
    getPlate() {
        return this.plate;
    }
    setPlate(plate) {
        this.plate === plate;
    }
    getBrand() {
        return this.brand;
    }
    setBrand(brand) {
        this.brand === brand;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
}
class Parking {
    constructor(numberSpaces) {
        this.carsParked = [];
        this.numberSpaces = numberSpaces;
    }
    searchCar(plate) {
        return this.carsParked.findIndex((car) => car.getPlate() === plate);
    }
    addCar(car) {
        if (this.carsParked.length <= this.numberSpaces) {
            this.carsParked.push(car);
        }
    }
    deleteCar(plate) {
        const carIndex = this.searchCar(plate);
        if (carIndex !== -1) {
            this.carsParked.splice(carIndex, 1);
        }
        else {
            console.error('Car not found');
        }
    }
    updateCar(plate, carNew) {
        const carIndex = this.searchCar(plate);
        if (carIndex) {
            this.carsParked[carIndex] = carNew;
        }
        else {
            console.error('Car not found');
        }
    }
    getQuantitySpacesAvailable() {
        const quantity = this.numberSpaces - this.carsParked.length;
        return console.log('Quantity spacces available: ${quantity}');
    }
    listCarsParked() {
        return console.table(this.carsParked);
    }
}
const parking = new Parking(10);
const carMazda = new Auto('AAAA-123', 'MAZDA', 'RED');
const FERRARI = new Auto('AAAA-123', 'MAZDA', 'RED');
const MKI = new Auto('DDD-012', 'MAZDA', 'RED');
const FORD = new Auto('AAAA-123', 'MAZDA', 'RED');
const CARCHEVROLET = new Auto('AAAA-123', 'MAZDA', 'RED');
const CARAUDI = new Auto('EEE-345', 'MAZDA', 'RED');
const CARKIA = new Auto('AAAA-123', 'MAZDA', 'RED');
parking.addCar(carMazda);
parking.addCar(FERRARI);
parking.addCar(MKI);
parking.addCar(FORD);
parking.addCar(CARAUDI);
parking.addCar(CARKIA);
parking.getQuantitySpacesAvailable();
parking.listCarsParked();
parking.updateCar('DDD-012', FERRARI);
parking.listCarsParked();
parking.deleteCar('EEE-345');
parking.listCarsParked();
parking.getQuantitySpacesAvailable();
