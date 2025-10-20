var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return undefined;
    };
    Stack.prototype.top = function () {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    };
    Stack.prototype.printStack = function () {
        console.log(this.items);
    };
    return Stack;
}());
var numbers = new Stack();
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
