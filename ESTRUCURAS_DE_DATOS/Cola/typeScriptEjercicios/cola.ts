// Queue implementation example in TypeScript

class Queue<T> {
    private items: T[] = [];

    // Add element to the end of the queue
    enqueue(element: T): void {
        this.items.push(element);
    }

    // Remove and return the element at the front of the queue
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    // Get the element at the front of the queue without removing it
    front(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get the size of the queue
    size(): number {
        return this.items.length;
    }

    // Print the elements of the queue
    print(): void {
        console.log(this.items.join(", "));
    }
}

// Example usage:
const queue = new Queue<number>();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log("Queue contents:");
queue.print(); // Output: 10, 20, 30

console.log("Front element:", queue.front()); // Output: 10

console.log("Dequeued element:", queue.dequeue()); // Output: 10

console.log("Queue after dequeue:");
queue.print(); // Output: 20, 30

console.log("Is queue empty?", queue.isEmpty()); // Output: false

console.log("Queue size:", queue.size()); // Output: 2
