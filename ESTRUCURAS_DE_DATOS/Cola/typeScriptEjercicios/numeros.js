var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Queue.prototype.front = function () {
        return this.items[0];
    };
    Queue.prototype.rear = function () {
        return this.items[this.size() - 1];
    };
    Queue.prototype.size = function () {
        return this.items.length;
    };
    return Queue;
}());
var queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
console.log('Size queue: ', queue.size());
console.log('Size queue: ', queue.front());
console.log('Size queue: ', queue.rear());
console.log('Elementos eliminados: ');
while (!queue.isEmpty) {
    console.log(queue.dequeue());
}
console.log('Size queue: ', queue.size());
