class Queue {
    private items: number[] = [];

    isEmpty(): boolean{
        return this.items.length === 0;
    }

    enqueue (item: number): void{

        this.items.push(item);

    }

    dequeue(): number | undefined {
        return this.items.shift();
    }

    front (): number {

        return this.items[0];
    }

    rear (): number{
        return this.items[this.size() - 1];
    }

    size (): number {
        return this.items.length;
    }

    
}

const queue = new Queue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);

console.log('Size queue: ' , queue.size());
console.log('first queue: ' , queue.front());
console.log('Last queue: ' , queue.rear());

console.log('Elementos eliminados: ');
while (!queue.isEmpty) {
    console.log(queue.dequeue());
}

console.log('Size queue: ' , queue.size());





    