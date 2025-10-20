class CarQueue<T> {
    private elements: T[] = [];

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    enqueue(element: T): void {
        this.elements.push(element);
    }

    dequeue(): T | null {
        return this.elements.shift() || null;
    }

    peek(): T | null {
        return this.elements.length > 0 ? this.elements[0] : null;
    }
}

class Car {
    constructor(
        public readonly licensePlate: string,
        public readonly brand: string
    ) {}
}

class TrafficSimulation {
    constructor(private queue: CarQueue<Car>) {}

    simulate(): void {
        let count = 0;
        while (!this.queue.isEmpty()) {
            const car = this.queue.dequeue();
            if (car) {
                count++;
                console.log(`Car #${count}: ${car.brand} (${car.licensePlate}) was removed from the queue`);
            }
        }
    }
}

const queue = new CarQueue<Car>();
queue.enqueue(new Car('ABC-123', 'Mazda'));
queue.enqueue(new Car('DEF-456', 'Toyota'));
queue.enqueue(new Car('GHI-789', 'Honda'));
queue.enqueue(new Car('JKL-012', 'Ford'));

const simulation = new TrafficSimulation(queue);
simulation.simulate();
