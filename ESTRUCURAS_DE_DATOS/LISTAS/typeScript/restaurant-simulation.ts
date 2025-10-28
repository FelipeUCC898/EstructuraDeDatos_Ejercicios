// Restaurant Order Flow Simulation using Lists in TypeScript

// Data Models
class Dish {
    private id: number;
    private name: string;
    private price: number;
    private preparationTime: number;

    constructor(id: number, name: string, price: number, preparationTime: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.preparationTime = preparationTime;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getPreparationTime(): number {
        return this.preparationTime;
    }

    toString(): string {
        return `${this.id}. ${this.name} - $${this.price.toFixed(2)}`;
    }
}

class OrderItem {
    private dish: Dish;
    private quantity: number;

    constructor(dish: Dish, quantity: number) {
        this.dish = dish;
        this.quantity = quantity;
    }

    getDish(): Dish {
        return this.dish;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTotalPrice(): number {
        return this.dish.getPrice() * this.quantity;
    }

    toString(): string {
        return `${this.quantity}x ${this.dish.getName()} - $${this.getTotalPrice().toFixed(2)}`;
    }
}

class Order {
    private static orderCounter: number = 1;
    private orderId: number;
    private items: OrderItem[];
    private status: 'pending' | 'in_kitchen' | 'ready' | 'delivered' | 'paid';
    private createdAt: Date;

    constructor() {
        this.orderId = Order.orderCounter++;
        this.items = [];
        this.status = 'pending';
        this.createdAt = new Date();
    }

    getOrderId(): number {
        return this.orderId;
    }

    getItems(): OrderItem[] {
        return [...this.items]; // Return copy to prevent external modification
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: 'pending' | 'in_kitchen' | 'ready' | 'delivered' | 'paid'): void {
        this.status = status;
    }

    getTotalAmount(): number {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    getTotalPreparationTime(): number {
        return this.items.reduce((total, item) => 
            total + (item.getDish().getPreparationTime() * item.getQuantity()), 0);
    }

    toString(): string {
        return `Order #${this.orderId} - Status: ${this.status} - Total: $${this.getTotalAmount().toFixed(2)}`;
    }
}

class Receipt {
    private orderId: number;
    private items: OrderItem[];
    private total: number;
    private issuedAt: Date;

    constructor(order: Order) {
        this.orderId = order.getOrderId();
        this.items = order.getItems();
        this.total = order.getTotalAmount();
        this.issuedAt = new Date();
    }

    print(): void {
        console.log("\n💸 GENERATING RECEIPT");
        console.log("═══════════════════════");
        console.log(`📋 Order #${this.orderId}`);
        console.log(`📅 Date: ${this.issuedAt.toLocaleString()}`);
        console.log("\n🍽️  ORDERED ITEMS:");
        this.items.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.toString()}`);
        });
        console.log(`\n💰 TOTAL AMOUNT: ${this.total.toFixed(2)}`);
        console.log("═══════════════════════");
        console.log("Thank you for dining with us! 🍽️✨\n");
    }
}

// Actor Classes
class Customer {
    private name: string;
    private currentOrder: Order | null;

    constructor(name: string) {
        this.name = name;
        this.currentOrder = null;
    }

    getName(): string {
        return this.name;
    }

    requestOrder(): Order {
        console.log(`\n🛎️  Customer ${this.name}: I would like to place an order`);
        this.currentOrder = new Order();
        return this.currentOrder;
    }

    chooseDishes(availableDishes: Dish[], waiter: Waiter): void {
        console.log(`\n👤 Customer ${this.name}: Let me choose from the menu...`);
        
        // Simulate customer choosing dishes (predefined selection for demo)
        const selections = [
            { dishId: 1, quantity: 2 },
            { dishId: 3, quantity: 1 },
            { dishId: 5, quantity: 1 }
        ];

        selections.forEach(selection => {
            const dish = availableDishes.find(d => d.getId() === selection.dishId);
            if (dish && this.currentOrder) {
                const orderItem = new OrderItem(dish, selection.quantity);
                this.currentOrder.addItem(orderItem);
                console.log(`   Selected: ${orderItem.toString()}`);
            }
        });

        if (this.currentOrder) {
            waiter.takeOrder(this.currentOrder);
        }
    }

    requestBill(): void {
        console.log(`\n💳 Customer ${this.name}: Could I have the bill, please?`);
    }
}

class Waiter {
    private name: string;
    private menu: Dish[]; // List of available dishes

    constructor(name: string) {
        this.name = name;
        this.menu = this.initializeMenu();
    }

    private initializeMenu(): Dish[] {
        // Initialize menu as a list of dishes
        return [
            new Dish(1, "Caesar Salad", 12.99, 10),
            new Dish(2, "Grilled Chicken", 18.50, 25),
            new Dish(3, "Pasta Carbonara", 15.75, 20),
            new Dish(4, "Fish Tacos", 16.25, 18),
            new Dish(5, "Chocolate Cake", 8.99, 5),
            new Dish(6, "Vegetarian Pizza", 14.50, 22),
            new Dish(7, "Beef Burger", 13.75, 15)
        ];
    }

    getName(): string {
        return this.name;
    }

    showAvailableDishes(): Dish[] {
        console.log(`\n📋 Waiter ${this.name}: Here's our menu:`);
        console.log("=== MENU ===");
        this.menu.forEach(dish => {
            console.log(`   ${dish.toString()}`);
        });
        console.log("============\n");
        return [...this.menu]; // Return copy of menu
    }

    takeOrder(order: Order): void {
        console.log(`\n📝 Waiter ${this.name}: I'll take your order to the kitchen`);
        console.log(`   Order details: ${order.toString()}`);
        order.getItems().forEach(item => {
            console.log(`   - ${item.toString()}`);
        });
    }

    sendOrderToKitchen(order: Order, kitchen: Kitchen): void {
        console.log(`\n🏃 Waiter ${this.name}: Sending order #${order.getOrderId()} to kitchen`);
        kitchen.receiveOrder(order);
    }

    requestBillFromCashier(orderId: number, cashier: Cashier): Receipt {
        console.log(`\n🧾 Waiter ${this.name}: Requesting bill for order #${orderId}`);
        return cashier.generateReceipt(orderId);
    }

    deliverOrder(order: Order): void {
        console.log(`\n🍽️  Waiter ${this.name}: Here's your order #${order.getOrderId()}`);
        order.setStatus('delivered');
    }
}

class Kitchen {
    private orderQueue: Order[]; // FIFO Queue (List) for managing orders
    private currentlyPreparing: Order | null;

    constructor() {
        this.orderQueue = [];
        this.currentlyPreparing = null;
    }

    receiveOrder(order: Order): void {
        console.log(`\n👨‍🍳 Kitchen: Received order #${order.getOrderId()}`);
        order.setStatus('in_kitchen');
        this.orderQueue.push(order); // Add to end of queue (FIFO)
        console.log(`   Added to queue. Queue length: ${this.orderQueue.length}`);
        this.processNextOrder();
    }

    private processNextOrder(): void {
        if (this.currentlyPreparing === null && this.orderQueue.length > 0) {
            this.currentlyPreparing = this.orderQueue.shift()!; // Remove from front of queue (FIFO)
            console.log(`\n🔥 Kitchen: Started preparing order #${this.currentlyPreparing.getOrderId()}`);
            console.log(`   Estimated preparation time: ${this.currentlyPreparing.getTotalPreparationTime()} minutes`);
            
            // Simulate preparation time
            setTimeout(() => {
                this.finishOrder();
            }, 1000); // 1 second simulation
        }
    }

    private finishOrder(): void {
        if (this.currentlyPreparing) {
            console.log(`\n✅ Kitchen: Order #${this.currentlyPreparing.getOrderId()} is ready!`);
            this.currentlyPreparing.setStatus('ready');
            this.currentlyPreparing = null;
            
            // Process next order in queue
            if (this.orderQueue.length > 0) {
                this.processNextOrder();
            }
        }
    }

    getQueueStatus(): void {
        console.log(`\n📊 Kitchen Queue Status:`);
        console.log(`   Orders in queue: ${this.orderQueue.length}`);
        console.log(`   Currently preparing: ${this.currentlyPreparing ? 
            `Order #${this.currentlyPreparing.getOrderId()}` : 'None'}`);
        
        if (this.orderQueue.length > 0) {
            console.log(`   Next orders in queue:`);
            this.orderQueue.forEach((order, index) => {
                console.log(`     ${index + 1}. Order #${order.getOrderId()}`);
            });
        }
    }
}

class Cashier {
    private name: string;
    private processedOrders: Order[]; // List to track processed orders
    private receipts: Receipt[]; // List of generated receipts

    constructor(name: string) {
        this.name = name;
        this.processedOrders = [];
        this.receipts = [];
    }

    getName(): string {
        return this.name;
    }

    receiveReadyOrder(order: Order): void {
        console.log(`\n💰 Cashier ${this.name}: Received ready order #${order.getOrderId()}`);
        this.processedOrders.push(order);
        console.log(`   Total amount: $${order.getTotalAmount().toFixed(2)}`);
    }

    generateReceipt(orderId: number): Receipt {
        console.log(`\n🧮 Cashier ${this.name}: Calculating total for order #${orderId}`);
        
        const order = this.processedOrders.find(o => o.getOrderId() === orderId);
        if (!order) {
            throw new Error(`Order #${orderId} not found`);
        }

        const receipt = new Receipt(order);
        this.receipts.push(receipt);
        
        console.log(`   Total calculated: $${order.getTotalAmount().toFixed(2)}`);
        return receipt;
    }

    processPayment(orderId: number): void {
        console.log(`\n💳 Cashier ${this.name}: Processing payment for order #${orderId}`);
        
        const order = this.processedOrders.find(o => o.getOrderId() === orderId);
        if (order) {
            order.setStatus('paid');
            console.log(`   Payment processed successfully!`);
        }
    }

    getProcessedOrdersList(): Order[] {
        return [...this.processedOrders]; // Return copy
    }
}

// Restaurant Management Class
class Restaurant {
    private customer: Customer;
    private waiter: Waiter;
    private kitchen: Kitchen;
    private cashier: Cashier;

    constructor() {
        this.customer = new Customer("John");
        this.waiter = new Waiter("Maria");
        this.kitchen = new Kitchen();
        this.cashier = new Cashier("Carlos");
    }

    async simulateRestaurantFlow(): Promise<void> {
        console.log("🏪 Starting Restaurant Order Flow Simulation");
        console.log("==========================================\n");

        try {
            // Step 1: Customer requests order
            const order = this.customer.requestOrder();

            // Step 2: Waiter shows available dishes (from menu list)
            const availableDishes = this.waiter.showAvailableDishes();

            // Step 3: Customer chooses dishes
            this.customer.chooseDishes(availableDishes, this.waiter);

            // Step 4: Waiter takes order and sends to kitchen
            this.waiter.sendOrderToKitchen(order, this.kitchen);

            // Show kitchen queue status
            this.kitchen.getQueueStatus();

            // Step 5: Kitchen processes order (FIFO queue)
            // Wait for kitchen to finish (simulated with setTimeout)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Step 6: Cashier receives ready order
            this.cashier.receiveReadyOrder(order);

            // Step 7: Waiter delivers order
            this.waiter.deliverOrder(order);

            // Step 8: Customer requests bill
            this.customer.requestBill();

            // Step 9: Waiter requests bill from cashier
            const receipt = this.waiter.requestBillFromCashier(order.getOrderId(), this.cashier);

            // Step 10: Cashier generates receipt and processes payment
            receipt.print();
            this.cashier.processPayment(order.getOrderId());

            console.log("\n🎉 Order process completed successfully!");
            console.log("=====================================");

            // Show final statistics
            this.showFinalStats();

        } catch (error) {
            console.error("❌ Error in restaurant flow:", error);
        }
    }

    private showFinalStats(): void {
        console.log("\n📈 Restaurant Statistics:");
        console.log(`Customer: ${this.customer.getName()}`);
        console.log(`Waiter: ${this.waiter.getName()}`);
        console.log(`Cashier: ${this.cashier.getName()}`);
        console.log(`Processed Orders: ${this.cashier.getProcessedOrdersList().length}`);
    }
}

// Main execution
async function main(): Promise<void> {
    const restaurant = new Restaurant();
    await restaurant.simulateRestaurantFlow();
}

// Execute the simulation
main().catch(console.error);