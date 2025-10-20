/**
 * Purchase History Management System using Stack Data Structure
 * Author: Felipe
 * Description: A system that allows managing purchase history with undo functionality
 */

// Generic Stack implementation
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

    peek(): T | undefined {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return undefined;
    }

    size(): number {
        return this.items.length;
    }

    getAll(): T[] {
        return [...this.items]; // Return a copy to prevent external modification
    }

    display(): void {
        console.log(this.items);
    }
}

// Purchase interface
interface Purchase {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    purchaseDate: Date;
    category: string;
}

// Action interface for undo functionality
interface PurchaseAction {
    type: 'purchase' | 'undo';
    purchase: Purchase;
    timestamp: Date;
}

// Purchase History Manager class
class PurchaseHistoryManager {
    private purchases: Purchase[] = [];
    private actionHistory: Stack<PurchaseAction> = new Stack<PurchaseAction>();
    private purchaseCounter: number = 1;

    /**
     * Add a new purchase to the history
     */
    addPurchase(productName: string, price: number, quantity: number, category: string): void {
        const purchase: Purchase = {
            id: `PURCHASE_${this.purchaseCounter.toString().padStart(3, '0')}`,
            productName,
            price,
            quantity,
            purchaseDate: new Date(),
            category
        };

        this.purchases.push(purchase);
        this.actionHistory.push({
            type: 'purchase',
            purchase,
            timestamp: new Date()
        });
        this.purchaseCounter++;

        console.log(`✅ Purchase added: ${purchase.productName} - $${purchase.price} x${purchase.quantity}`);
    }

    /**
     * Undo the last purchase
     */
    undoLastPurchase(): boolean {
        if (this.actionHistory.isEmpty()) {
            console.log("❌ No actions to undo!");
            return false;
        }

        const lastAction = this.actionHistory.pop();

        if (lastAction && lastAction.type === 'purchase') {
            // Remove the purchase from the purchases array
            this.purchases = this.purchases.filter(p => p.id !== lastAction.purchase.id);

            // Add undo action to history
            this.actionHistory.push({
                type: 'undo',
                purchase: lastAction.purchase,
                timestamp: new Date()
            });

            console.log(`↩️ Undid purchase: ${lastAction.purchase.productName}`);
            return true;
        }

        console.log("❌ Cannot undo this action");
        return false;
    }

    /**
     * Display all purchases
     */
    displayPurchases(): void {
        if (this.purchases.length === 0) {
            console.log("\n📋 No purchases found!");
            return;
        }

        console.log(`\n📋 Purchase History (${this.purchases.length} purchases):`);
        console.log("=".repeat(80));
        console.log("ID".padEnd(12) + "Product".padEnd(20) + "Price".padEnd(10) + "Qty".padEnd(5) + "Category".padEnd(15) + "Date");
        console.log("-".repeat(80));

        this.purchases.forEach(purchase => {
            const dateStr = purchase.purchaseDate.toLocaleDateString();
            console.log(
                purchase.id.padEnd(12) +
                purchase.productName.padEnd(20) +
                `$${purchase.price}`.padEnd(10) +
                purchase.quantity.toString().padEnd(5) +
                purchase.category.padEnd(15) +
                dateStr
            );
        });
    }

    /**
     * Search purchases by product name
     */
    searchPurchases(searchTerm: string): Purchase[] {
        const results = this.purchases.filter(purchase =>
            purchase.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log(`\n🔍 Search results for "${searchTerm}":`);
        if (results.length === 0) {
            console.log("No purchases found matching your search.");
        } else {
            results.forEach(purchase => {
                console.log(`- ${purchase.productName} - $${purchase.price} x${purchase.quantity} (${purchase.category})`);
            });
        }

        return results;
    }

    /**
     * Get purchase statistics
     */
    getStatistics(): void {
        const totalPurchases = this.purchases.length;
        const totalSpent = this.purchases.reduce((sum, purchase) => sum + (purchase.price * purchase.quantity), 0);
        const totalItems = this.purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);

        // Group by category
        const categoryStats = this.purchases.reduce((acc, purchase) => {
            acc[purchase.category] = (acc[purchase.category] || 0) + (purchase.price * purchase.quantity);
            return acc;
        }, {} as Record<string, number>);

        console.log("\n📊 Purchase Statistics:");
        console.log("=".repeat(40));
        console.log(`Total Purchases: ${totalPurchases}`);
        console.log(`Total Spent: $${totalSpent.toFixed(2)}`);
        console.log(`Total Items: ${totalItems}`);
        console.log(`Actions in History: ${this.actionHistory.size()}`);

        if (Object.keys(categoryStats).length > 0) {
            console.log("\n💰 Spending by Category:");
            Object.entries(categoryStats)
                .sort(([, a], [, b]) => b - a)
                .forEach(([category, amount]) => {
                    console.log(`  ${category}: $${amount.toFixed(2)}`);
                });
        }
    }

    /**
     * Display action history
     */
    displayActionHistory(): void {
        console.log("\n🔄 Action History:");
        if (this.actionHistory.isEmpty()) {
            console.log("No actions recorded");
        } else {
            const actions = this.actionHistory.getAll();
            actions.reverse().forEach((action, index) => {
                const actionIcon = action.type === 'purchase' ? '🛒' : '↩️';
                const timeStr = action.timestamp.toLocaleTimeString();
                console.log(`${index + 1}. ${actionIcon} ${action.type.toUpperCase()}: ${action.purchase.productName} (${timeStr})`);
            });
        }
    }

    /**
     * Get recent purchases (last N purchases)
     */
    getRecentPurchases(count: number = 5): Purchase[] {
        const recent = this.purchases.slice(-count);

        console.log(`\n⏰ Recent Purchases (last ${count}):`);
        recent.forEach((purchase, index) => {
            console.log(`${index + 1}. ${purchase.productName} - $${purchase.price} x${purchase.quantity}`);
        });

        return recent;
    }

    /**
     * Clear all purchase history
     */
    clearHistory(): void {
        this.purchases = [];
        this.actionHistory = new Stack<PurchaseAction>();
        this.purchaseCounter = 1;
        console.log("🗑️ Purchase history cleared!");
    }
}

// Demo function
function demonstratePurchaseManager(): void {
    console.log("🛒 Welcome to Purchase History Manager!");
    console.log("=".repeat(60));

    const manager = new PurchaseHistoryManager();

    // Add sample purchases
    console.log("\n📝 Adding sample purchases...");
    manager.addPurchase("Laptop", 999.99, 1, "Electronics");
    manager.addPurchase("Wireless Mouse", 29.99, 2, "Electronics");
    manager.addPurchase("Programming Book", 49.99, 1, "Books");
    manager.addPurchase("Coffee", 4.50, 3, "Food & Drinks");
    manager.addPurchase("Notebook", 12.99, 5, "Office Supplies");

    // Display purchases
    manager.displayPurchases();

    // Show statistics
    manager.getStatistics();

    // Search functionality
    manager.searchPurchases("laptop");
    manager.searchPurchases("electronics");

    // Show recent purchases
    manager.getRecentPurchases(3);

    // Show action history
    manager.displayActionHistory();

    // Undo operations
    console.log("\n↩️ Undoing last purchase...");
    manager.undoLastPurchase();
    manager.displayPurchases();

    console.log("\n↩️ Undoing another purchase...");
    manager.undoLastPurchase();
    manager.displayPurchases();

    // Final statistics
    manager.getStatistics();
}

// Export for potential module usage
export { Stack, Purchase, PurchaseAction, PurchaseHistoryManager, demonstratePurchaseManager };

// Run demonstration if this file is executed directly
if (require.main === module) {
    demonstratePurchaseManager();
}
