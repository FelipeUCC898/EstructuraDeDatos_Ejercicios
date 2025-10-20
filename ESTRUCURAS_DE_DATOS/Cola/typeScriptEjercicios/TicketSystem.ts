// Ticket management system with dynamic typing
class TicketSystem<T = number> {
    private ticketQueue: T[] = [];
    private nextNumber: number = 1;
    private servedCount: number = 0;

    // Take a new ticket
    takeTicket(): T {
        const ticketNumber = this.nextNumber as unknown as T;
        this.ticketQueue.push(ticketNumber);
        this.nextNumber++;
        console.log(`✅ Ticket #${ticketNumber} generated. There are ${this.getWaitingPeople()} people waiting`);
        return ticketNumber;
    }

    // Serve next customer
    serveNext(): T | undefined {
        if (this.isEmpty()) {
            console.log("⏸️ No customers waiting");
            return undefined;
        }

        const ticket = this.ticketQueue.shift();
        this.servedCount++;
        console.log(`🎯 Serving ticket #${ticket}. Customers served: ${this.servedCount}`);
        return ticket;
    }

    // View next pending ticket
    viewNext(): T | undefined {
        if (this.isEmpty()) {
            console.log("No pending tickets");
            return undefined;
        }
        return this.ticketQueue[0];
    }

    // View current status
    viewStatus(): void {
        console.log("\n📊 SYSTEM STATUS:");
        console.log(`Tickets waiting: ${this.getWaitingPeople()}`);
        console.log(`Next ticket: ${this.viewNext() || 'None'}`);
        console.log(`Total served: ${this.servedCount}`);
        console.log(`Next available number: ${this.nextNumber}\n`);
    }

    // Add custom ticket (for different types)
    addCustomTicket(ticket: T): void {
        this.ticketQueue.push(ticket);
        console.log(`✅ Custom ticket ${ticket} added. There are ${this.getWaitingPeople()} people waiting`);
    }

    // Helper methods
    isEmpty(): boolean {
        return this.ticketQueue.length === 0;
    }

    getWaitingPeople(): number {
        return this.ticketQueue.length;
    }

    getTotalServed(): number {
        return this.servedCount;
    }

    getQueue(): T[] {
        return [...this.ticketQueue];
    }
}

// System simulation with different types
function simulateCustomerService(): void {
    console.log("=== NUMERIC TICKET SYSTEM ===");
    const numericSystem = new TicketSystem<number>();

    console.log("🏪 STARTING TICKET SYSTEM\n");

    // Simulation of customers arriving
    numericSystem.takeTicket(); // Customer 1
    numericSystem.takeTicket(); // Customer 2
    numericSystem.takeTicket(); // Customer 3

    numericSystem.viewStatus();

    // Serve some customers
    numericSystem.serveNext(); // Serve Customer 1
    numericSystem.serveNext(); // Serve Customer 2

    numericSystem.viewStatus();

    console.log("\n=== STRING TICKET SYSTEM ===");
    const stringSystem = new TicketSystem<string>();
    
    // Add custom string tickets
    stringSystem.addCustomTicket("VIP-001");
    stringSystem.addCustomTicket("REG-002");
    stringSystem.addCustomTicket("VIP-003");

    stringSystem.viewStatus();
    stringSystem.serveNext();
    stringSystem.viewStatus();

    console.log("\n=== MIXED TICKET SYSTEM ===");
    const mixedSystem = new TicketSystem<string | number>();
    
    mixedSystem.addCustomTicket("VIP-001");
    mixedSystem.takeTicket(); // This will add a number
    mixedSystem.addCustomTicket("URGENT-100");

    mixedSystem.viewStatus();
    mixedSystem.serveNext();
    mixedSystem.serveNext();
    mixedSystem.viewStatus();

    // Final statistics
    console.log("📈 FINAL STATISTICS:");
    console.log(`Numeric system - Total served: ${numericSystem.getTotalServed()}`);
    console.log(`String system - Total served: ${stringSystem.getTotalServed()}`);
    console.log(`Mixed system - Total served: ${mixedSystem.getTotalServed()}`);
    console.log(`Queue contents: ${mixedSystem.getQueue()}`);
}

// Run the simulation
simulateCustomerService();