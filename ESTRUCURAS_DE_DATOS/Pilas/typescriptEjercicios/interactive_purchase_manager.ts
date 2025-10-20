/**
 * Interactive Purchase History Manager
 * Author: Felipe
 * Description: Interactive command-line interface for the Purchase History Manager system
 */

import { PurchaseHistoryManager } from './purchase_history_manager';

class InteractivePurchaseManager {
    private manager: PurchaseHistoryManager;

    constructor() {
        this.manager = new PurchaseHistoryManager();
    }

    /**
     * Display the main menu
     */
    displayMenu(): void {
        console.log("\n" + "=".repeat(50));
        console.log("🛒 PURCHASE HISTORY MANAGER - Main Menu");
        console.log("=".repeat(50));
        console.log("1. Add new purchase");
        console.log("2. Display all purchases");
        console.log("3. Search purchases");
        console.log("4. Undo last purchase");
        console.log("5. View recent purchases");
        console.log("6. View action history");
        console.log("7. Show statistics");
        console.log("8. Clear history");
        console.log("9. Exit");
        console.log("-".repeat(50));
    }

    /**
     * Get user's menu choice
     */
    getUserChoice(): number | null {
        try {
            const input = require('readline-sync').question("Enter your choice (1-9): ");
            const choice = parseInt(input);
            return isNaN(choice) ? null : choice;
        } catch (error) {
            console.log("❌ Invalid input! Please enter a number.");
            return null;
        }
    }

    /**
     * Interactive purchase addition
     */
    addPurchaseInteractive(): void {
        console.log("\n➕ ADD NEW PURCHASE");
        console.log("-".repeat(25));

        try {
            const productName = require('readline-sync').question("Enter product name: ").trim();
            if (!productName) {
                console.log("❌ Product name cannot be empty!");
                return;
            }

            const priceInput = require('readline-sync').question("Enter price: $");
            const price = parseFloat(priceInput);
            if (isNaN(price) || price <= 0) {
                console.log("❌ Invalid price! Please enter a positive number.");
                return;
            }

            const quantityInput = require('readline-sync').question("Enter quantity: ");
            const quantity = parseInt(quantityInput);
            if (isNaN(quantity) || quantity <= 0) {
                console.log("❌ Invalid quantity! Please enter a positive integer.");
                return;
            }

            const category = require('readline-sync').question("Enter category: ").trim();
            if (!category) {
                console.log("❌ Category cannot be empty!");
                return;
            }

            this.manager.addPurchase(productName, price, quantity, category);
        } catch (error) {
            console.log("❌ Error adding purchase. Please try again.");
        }
    }

    /**
     * Interactive search functionality
     */
    searchPurchasesInteractive(): void {
        console.log("\n🔍 SEARCH PURCHASES");
        console.log("-".repeat(20));

        try {
            const searchTerm = require('readline-sync').question("Enter search term: ").trim();
            if (!searchTerm) {
                console.log("❌ Search term cannot be empty!");
                return;
            }

            this.manager.searchPurchases(searchTerm);
        } catch (error) {
            console.log("❌ Error searching purchases. Please try again.");
        }
    }

    /**
     * Interactive recent purchases view
     */
    viewRecentPurchasesInteractive(): void {
        console.log("\n⏰ VIEW RECENT PURCHASES");
        console.log("-".repeat(25));

        try {
            const countInput = require('readline-sync').question("How many recent purchases to show? (default: 5): ").trim();
            const count = countInput ? parseInt(countInput) : 5;

            if (isNaN(count) || count <= 0) {
                console.log("❌ Invalid number! Using default of 5.");
                this.manager.getRecentPurchases(5);
            } else {
                this.manager.getRecentPurchases(count);
            }
        } catch (error) {
            console.log("❌ Error viewing recent purchases. Please try again.");
        }
    }

    /**
     * Confirmation dialog
     */
    confirmAction(message: string): boolean {
        try {
            const response = require('readline-sync').question(`${message} (y/n): `).toLowerCase();
            return response === 'y' || response === 'yes';
        } catch (error) {
            return false;
        }
    }

    /**
     * Main interactive loop
     */
    run(): void {
        console.log("🛒 Welcome to Interactive Purchase History Manager!");
        console.log("This system uses Stack data structure for undo functionality.");

        while (true) {
            this.displayMenu();
            const choice = this.getUserChoice();

            if (!choice) {
                console.log("❌ Invalid choice! Please select 1-9.");
                continue;
            }

            switch (choice) {
                case 1:
                    this.addPurchaseInteractive();
                    break;

                case 2:
                    this.manager.displayPurchases();
                    break;

                case 3:
                    this.searchPurchasesInteractive();
                    break;

                case 4:
                    console.log("\n↩️ UNDO LAST PURCHASE");
                    console.log("-".repeat(25));
                    this.manager.undoLastPurchase();
                    break;

                case 5:
                    this.viewRecentPurchasesInteractive();
                    break;

                case 6:
                    this.manager.displayActionHistory();
                    break;

                case 7:
                    this.manager.getStatistics();
                    break;

                case 8:
                    console.log("\n🗑️ CLEAR HISTORY");
                    console.log("-".repeat(20));
                    if (this.confirmAction("Are you sure you want to clear all purchase history?")) {
                        this.manager.clearHistory();
                    } else {
                        console.log("Operation cancelled.");
                    }
                    break;

                case 9:
                    console.log("\n👋 Thank you for using Purchase History Manager!");
                    console.log("Goodbye! 👋");
                    return;

                default:
                    console.log("❌ Invalid choice! Please select 1-9.");
            }

            // Pause before showing menu again
            try {
                require('readline-sync').question("\nPress Enter to continue...");
            } catch (error) {
                // Handle case where readline-sync is not available
                console.log("\nPress Enter to continue...");
            }
        }
    }
}

// Simple fallback interface for environments without readline-sync
class SimpleInteractivePurchaseManager {
    private manager: PurchaseHistoryManager;

    constructor() {
        this.manager = new PurchaseHistoryManager();
    }

    /**
     * Run simple demo without external dependencies
     */
    runSimpleDemo(): void {
        console.log("🛒 Simple Purchase History Manager Demo!");
        console.log("=".repeat(50));

        // Add sample purchases
        console.log("\n📝 Adding sample purchases...");
        this.manager.addPurchase("Gaming Laptop", 1299.99, 1, "Electronics");
        this.manager.addPurchase("Mechanical Keyboard", 89.99, 1, "Electronics");
        this.manager.addPurchase("Coffee Beans", 15.99, 2, "Food & Drinks");
        this.manager.addPurchase("TypeScript Handbook", 39.99, 1, "Books");

        // Display all operations
        this.manager.displayPurchases();
        this.manager.getStatistics();
        this.manager.searchPurchases("laptop");
        this.manager.getRecentPurchases(3);
        this.manager.displayActionHistory();

        // Demonstrate undo functionality
        console.log("\n↩️ Demonstrating undo functionality...");
        this.manager.undoLastPurchase();
        this.manager.displayPurchases();

        console.log("\n↩️ Undoing another purchase...");
        this.manager.undoLastPurchase();
        this.manager.displayPurchases();

        // Final statistics
        this.manager.getStatistics();

        console.log("\n✨ Demo completed! The system uses Stack data structure for undo functionality.");
    }
}

// Export classes
export { InteractivePurchaseManager, SimpleInteractivePurchaseManager };

// Run appropriate demo based on environment
if (require.main === module) {
    try {
        // Try to use full interactive interface
        require('readline-sync');
        const interactiveManager = new InteractivePurchaseManager();
        interactiveManager.run();
    } catch (error) {
        // Fallback to simple demo
        console.log("Running simple demo (readline-sync not available)...");
        const simpleManager = new SimpleInteractivePurchaseManager();
        simpleManager.runSimpleDemo();
    }
}
