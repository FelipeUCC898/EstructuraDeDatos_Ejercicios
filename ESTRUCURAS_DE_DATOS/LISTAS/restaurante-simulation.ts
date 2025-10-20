class Order {
    constructor(

        public orderID: number,
        public description: string,
        public total: number = 0

    ) {}
}

class Client {

    constructor(public name: string) {

    }

    requesOrder(description: string): Order {
        console.log(`${this.name} requested: ${description}`);
        return new Order(Date.now(), description);
    }

    requestBill() {
        console.log(`${this.name} requested the bill.`);
    }

    payBill(){
        console.log(`${this.name} paid the Bill`);
    }
}

class Waiter {
    private ordersQueue: Order[] = [];

    collectOrder(order: Order) {
        console.log(`Waiter collected order: ${order.description}`);
        this.ordersQueue.push(order);
    }

    deliverToKitchen(kitchen: Kitchen) {
        const order = this.ordersQueue.shift();
        if (order) {
            console.log(`Waiter delivered order to kitchen: ${order.description}`);
            kitchen.receiveOrder(order);
        }
    }

    serveOrder(order: Order) {
        console.log(`Waiter served the order: ${order.description}`);
    }

    askForBill(cashier: Cashier, order: Order) {
        console.log(`Waiter asked the cashier to calculate the total.`);
        cashier.calculateTotal(order);
    }
}

class Kitchen {

    private kitchenQueue: Order[] = [];

    receiveOrder (order: Order) {

        console.log(`Kitchen receive order: ${order.description}`);

        this.kitchenQueue.push(order);
        this.prepareOrder();

    }

    private prepareOrder (){
        const order = this.kitchenQueue.shift();
        if (order) {
            console.log(`kitchen prepared: ${order.description}`);
            return order;
        }
    }



}

class Cashier {

    private processedOrders: Order[] = [];

    calculateTotal(order : Order){
        order.total = Math.floor(Math.random() * 50) + 10;;
        console.log(`Cashier calculated total for ${order.description}: ${order.total}`);
        this.processedOrders.push(order);
    }

    getAvailableOrders (): void {
        console.log("Orders ready for payment:");
        this.processedOrders.forEach((o) => console.log(` - ${o.description}: $${o.total}`));
    }

}

const client = new Client("Jhon");
const waiter = new Waiter();
const kitchen = new Kitchen();
const cashier = new Cashier();

const order = client.requesOrder("Pollito gratinado con ensalada");

waiter.collectOrder(order);
waiter.deliverToKitchen(kitchen);

console.log("Order is being prepared...");

waiter.serveOrder(order);

client.requestBill();
waiter.askForBill(cashier, order);

cashier.getAvailableOrders();

client.payBill();

console.log("==End of process ===");