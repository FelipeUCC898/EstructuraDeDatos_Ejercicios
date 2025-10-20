class Stack<T> {
    private items: T[] = [];

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return undefined;
    }

    top(): T | undefined {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    }

    printStack(): void {
        console.log(this.items);
    }
}

const numbers = new Stack<number>();

numbers.push(1);
numbers.push(2);

numbers.printStack();
console.log("TOP:", numbers.top());

numbers.push(3);
numbers.push(4);

numbers.printStack();
console.log("TOP:", numbers.top());

numbers.push(5);
numbers.push(6);

numbers.printStack();
console.log("TOP:", numbers.top());

numbers.pop();
numbers.pop();
numbers.pop();

numbers.printStack();
