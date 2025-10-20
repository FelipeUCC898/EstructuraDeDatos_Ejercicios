# Purchase History Manager - TypeScript

## 📋 Project Description
A comprehensive purchase history management system built with TypeScript that demonstrates the practical use of Stack data structure for implementing undo functionality in e-commerce applications.

## 🎯 User Story
**As** an e-commerce application user  
**I want** a system that allows me to manage my purchase history with undo capability  
**So that** I can correct purchase mistakes and maintain accurate transaction records

## 🚀 Features
- ✅ Add new purchases with detailed information
- ✅ View all purchases in a formatted table
- ✅ Search purchases by product name
- ✅ Undo last purchase using Stack data structure
- ✅ View recent purchases
- ✅ Display action history (purchases and undos)
- ✅ Comprehensive purchase statistics
- ✅ Category-based spending analysis
- ✅ Interactive command-line interface
- ✅ Type-safe implementation with TypeScript

## 📁 File Structure
```
typescriptEjercicios/
├── purchase_history_manager.ts     # Core system implementation
├── interactive_purchase_manager.ts # Interactive user interface
├── package.json                    # Node.js dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps
```bash
# Navigate to the project directory
cd Pilas/typescriptEjercicios

# Install dependencies
npm install

# Install TypeScript globally (if not already installed)
npm install -g typescript ts-node
```

## 🚀 Usage

### Option 1: Run Demo Version
```bash
# Run the demonstration with sample data
npm run demo
# or
ts-node purchase_history_manager.ts
```

### Option 2: Run Interactive Version
```bash
# Run the interactive interface
npm run dev:interactive
# or
ts-node interactive_purchase_manager.ts
```

### Option 3: Compile and Run
```bash
# Compile TypeScript to JavaScript
npm run build

# Run compiled JavaScript
npm start
# or
npm run start:interactive
```

## 🏗️ Architecture

### Core Classes and Interfaces

#### 1. **Stack<T>** - Generic Stack Implementation
```typescript
class Stack<T> {
    private items: T[] = [];
    // Standard stack operations: push, pop, peek, isEmpty, etc.
}
```

#### 2. **Purchase Interface**
```typescript
interface Purchase {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    purchaseDate: Date;
    category: string;
}
```

#### 3. **PurchaseAction Interface**
```typescript
interface PurchaseAction {
    type: 'purchase' | 'undo';
    purchase: Purchase;
    timestamp: Date;
}
```

#### 4. **PurchaseHistoryManager Class**
```typescript
class PurchaseHistoryManager {
    private purchases: Purchase[] = [];
    private actionHistory: Stack<PurchaseAction> = new Stack<PurchaseAction>();
    // Core functionality methods
}
```

## 🔄 How Stack-Based Undo Works

### Purchase Addition Process
1. User adds a new purchase
2. Purchase is added to the `purchases` array
3. A `PurchaseAction` is pushed to the `actionHistory` stack
4. The action contains the purchase details and timestamp

### Undo Process
1. System pops the last action from the `actionHistory` stack
2. If the action type is 'purchase', the purchase is removed from the array
3. A new 'undo' action is pushed to maintain the action history
4. User gets confirmation of the undo operation

### Stack Benefits
- **LIFO Principle**: Last action is always the first to be undone
- **Memory Efficiency**: Only stores necessary action information
- **Type Safety**: TypeScript ensures correct data types throughout
- **Extensibility**: Easy to add new action types in the future

## 📊 Example Output
```
📋 Purchase History (4 purchases):
================================================================================
ID           Product              Price      Qty  Category        Date
--------------------------------------------------------------------------------
PURCHASE_001 Gaming Laptop        $1299.99   1    Electronics     12/15/2023
PURCHASE_002 Mechanical Keyboard  $89.99     1    Electronics     12/15/2023
PURCHASE_003 Coffee Beans         $15.99     2    Food & Drinks   12/15/2023
PURCHASE_004 TypeScript Handbook  $39.99     1    Books           12/15/2023

📊 Purchase Statistics:
========================================
Total Purchases: 4
Total Spent: $1446.95
Total Items: 5
Actions in History: 4

💰 Spending by Category:
  Electronics: $1389.98
  Food & Drinks: $31.98
  Books: $39.99
```

## 🎓 Educational Value

This project demonstrates:
- **Stack Data Structure**: Practical implementation with real-world application
- **TypeScript Generics**: Type-safe stack implementation
- **Object-Oriented Design**: Clean separation of concerns
- **Interface Design**: Well-defined contracts between components
- **Command Pattern**: For implementing undo functionality
- **Error Handling**: Robust input validation and error management
- **Modern TypeScript**: Latest features and best practices

## 🔧 Technical Features

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Generic Stack**: Reusable stack implementation for any data type
- **Interface-Based Design**: Clear contracts and extensibility
- **Error Handling**: Comprehensive input validation
- **Modular Architecture**: Separated concerns for maintainability
- **Interactive Interface**: User-friendly command-line interface
- **Statistics**: Comprehensive analytics and reporting
- **Search Functionality**: Product search with case-insensitive matching

## 🚀 Advanced Features

- **Action History**: Complete audit trail of all operations
- **Category Analysis**: Spending breakdown by product categories
- **Recent Purchases**: Quick access to latest transactions
- **Search Capability**: Find purchases by product name
- **Undo Chain**: Multiple undo operations with proper state management
- **Data Persistence**: Ready for database integration
- **Extensible Design**: Easy to add new features and action types

## 📈 Performance Considerations

- **Time Complexity**: 
  - Add Purchase: O(1)
  - Undo: O(1)
  - Search: O(n)
  - Statistics: O(n)
- **Space Complexity**: O(n) where n is the number of purchases and actions
- **Memory Management**: Efficient stack operations with minimal overhead

## 🔮 Future Enhancements

- Database integration for persistence
- Web-based user interface
- Advanced filtering and sorting
- Export functionality (CSV, JSON)
- Purchase categories with subcategories
- Price tracking and alerts
- Integration with payment systems
- Multi-user support
