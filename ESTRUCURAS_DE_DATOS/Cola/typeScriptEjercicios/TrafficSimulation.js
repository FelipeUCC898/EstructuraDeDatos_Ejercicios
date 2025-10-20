var CarQueue = /** @class */ (function () {
    function CarQueue() {
        this.elements = [];
    }
    CarQueue.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
    CarQueue.prototype.enqueue = function (element) {
        this.elements.push(element);
    };
    CarQueue.prototype.dequeue = function () {
        return this.elements.shift() || null;
    };
    CarQueue.prototype.peek = function () {
        return this.elements.length > 0 ? this.elements[0] : null;
    };
    return CarQueue;
}());
var Car = /** @class */ (function () {
    function Car(licensePlate, brand) {
        this.licensePlate = licensePlate;
        this.brand = brand;
    }
    return Car;
}());
var TrafficSimulation = /** @class */ (function () {
    function TrafficSimulation(queue) {
        this.queue = queue;
    }
    TrafficSimulation.prototype.simulate = function () {
        var count = 0;
        while (!this.queue.isEmpty()) {
            var car = this.queue.dequeue();
            if (car) {
                count++;
                console.log("Car #".concat(count, ": ").concat(car.brand, " (").concat(car.licensePlate, ") was removed from the queue"));
            }
        }
    };
    return TrafficSimulation;
}());
var queue = new CarQueue();
queue.enqueue(new Car('ABC-123', 'Mazda'));
queue.enqueue(new Car('DEF-456', 'Toyota'));
queue.enqueue(new Car('GHI-789', 'Honda'));
queue.enqueue(new Car('JKL-012', 'Ford'));
var simulation = new TrafficSimulation(queue);
simulation.simulate();
