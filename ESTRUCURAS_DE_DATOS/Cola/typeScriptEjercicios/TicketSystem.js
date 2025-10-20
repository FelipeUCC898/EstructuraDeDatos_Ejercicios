var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Ticket management system with dynamic typing
var TicketSystem = /** @class */ (function () {
    function TicketSystem() {
        this.ticketQueue = [];
        this.nextNumber = 1;
        this.servedCount = 0;
    }
    // Take a new ticket
    TicketSystem.prototype.takeTicket = function () {
        var ticketNumber = this.nextNumber;
        this.ticketQueue.push(ticketNumber);
        this.nextNumber++;
        console.log("\u2705 Ticket #".concat(ticketNumber, " generated. There are ").concat(this.getWaitingPeople(), " people waiting"));
        return ticketNumber;
    };
    // Serve next customer
    TicketSystem.prototype.serveNext = function () {
        if (this.isEmpty()) {
            console.log("⏸️ No customers waiting");
            return undefined;
        }
        var ticket = this.ticketQueue.shift();
        this.servedCount++;
        console.log("\uD83C\uDFAF Serving ticket #".concat(ticket, ". Customers served: ").concat(this.servedCount));
        return ticket;
    };
    // View next pending ticket
    TicketSystem.prototype.viewNext = function () {
        if (this.isEmpty()) {
            console.log("No pending tickets");
            return undefined;
        }
        return this.ticketQueue[0];
    };
    // View current status
    TicketSystem.prototype.viewStatus = function () {
        console.log("\n📊 SYSTEM STATUS:");
        console.log("Tickets waiting: ".concat(this.getWaitingPeople()));
        console.log("Next ticket: ".concat(this.viewNext() || 'None'));
        console.log("Total served: ".concat(this.servedCount));
        console.log("Next available number: ".concat(this.nextNumber, "\n"));
    };
    // Add custom ticket (for different types)
    TicketSystem.prototype.addCustomTicket = function (ticket) {
        this.ticketQueue.push(ticket);
        console.log("\u2705 Custom ticket ".concat(ticket, " added. There are ").concat(this.getWaitingPeople(), " people waiting"));
    };
    // Helper methods
    TicketSystem.prototype.isEmpty = function () {
        return this.ticketQueue.length === 0;
    };
    TicketSystem.prototype.getWaitingPeople = function () {
        return this.ticketQueue.length;
    };
    TicketSystem.prototype.getTotalServed = function () {
        return this.servedCount;
    };
    TicketSystem.prototype.getQueue = function () {
        return __spreadArray([], this.ticketQueue, true);
    };
    return TicketSystem;
}());
// System simulation with different types
function simulateCustomerService() {
    console.log("=== NUMERIC TICKET SYSTEM ===");
    var numericSystem = new TicketSystem();
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
    var stringSystem = new TicketSystem();
    // Add custom string tickets
    stringSystem.addCustomTicket("VIP-001");
    stringSystem.addCustomTicket("REG-002");
    stringSystem.addCustomTicket("VIP-003");
    stringSystem.viewStatus();
    stringSystem.serveNext();
    stringSystem.viewStatus();
    console.log("\n=== MIXED TICKET SYSTEM ===");
    var mixedSystem = new TicketSystem();
    mixedSystem.addCustomTicket("VIP-001");
    mixedSystem.takeTicket(); // This will add a number
    mixedSystem.addCustomTicket("URGENT-100");
    mixedSystem.viewStatus();
    mixedSystem.serveNext();
    mixedSystem.serveNext();
    mixedSystem.viewStatus();
    // Final statistics
    console.log("📈 FINAL STATISTICS:");
    console.log("Numeric system - Total served: ".concat(numericSystem.getTotalServed()));
    console.log("String system - Total served: ".concat(stringSystem.getTotalServed()));
    console.log("Mixed system - Total served: ".concat(mixedSystem.getTotalServed()));
    console.log("Queue contents: ".concat(mixedSystem.getQueue()));
}
// Run the simulation
simulateCustomerService();
