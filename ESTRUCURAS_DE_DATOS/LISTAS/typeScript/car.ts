class Auto {

    private plate: string;
    private brand: string;
    private color: string;

    constructor(plate: string, brand: string, color: string) {
        this.plate = plate;
        this.brand = brand;
        this.color = color;
    }
    getPlate(): string {
        return this.plate;
    }

    setPlate(plate: string): void {
        this.plate === plate;
    }

    getBrand(): string {
        return this.brand
    }

    setBrand(brand: string): void {
        this.brand === brand;
    }

    getColor(): string {
        return this.color
    }

    setColor(color: string): void {
        this.color = color
    }
}

class Parking {
    private numberSpaces: number;
    private carsParked: Auto[] = [];

    constructor(numberSpaces: number) {
        this.numberSpaces = numberSpaces;
    }

    searchCar(plate: string): number {
        return this.carsParked.findIndex((car) => car.getPlate() === plate);
    }

    addCar(car: Auto): void {
        if (this.carsParked.length <= this.numberSpaces) {
            this.carsParked.push(car);
        }
    }

    deleteCar(plate: string): void {
        const carIndex = this.searchCar(plate);
        if (carIndex !== -1) {
            this.carsParked.splice(carIndex, 1);

        } else {
            console.error('Car not found');
        }
    }

    updateCar(plate: string, carNew: Auto): void {
        const carIndex = this.searchCar(plate);
        if (carIndex) {
            this.carsParked[carIndex] = carNew;
        } else {
            console.error('Car not found');
        }
    }

    getQuantitySpacesAvailable(): void {
        const quantity = this.numberSpaces - this.carsParked.length;
        return console.log(`Quantity spacces available: ${quantity}`);
    }

    listCarsParked(): void {
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
