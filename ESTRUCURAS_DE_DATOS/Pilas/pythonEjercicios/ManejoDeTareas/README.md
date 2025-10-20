# Task Management System with Stack Data Structure

## 📋 Project Description
A comprehensive task management system that demonstrates the practical use of Stack data structure for implementing undo functionality. This system allows users to manage their daily tasks with the ability to undo recent actions.

## 🎯 User Story
**As** a software developer  
**I want** a system that allows me to manage my daily tasks with undo capability  
**So that** I can organize my work efficiently and correct mistakes easily

## 🚀 Features
- ✅ Add new tasks
- ✅ Mark tasks as completed
- ✅ View all tasks with status
- ✅ Undo last action (add or complete)
- ✅ View action history
- ✅ Task statistics
- ✅ Interactive command-line interface

## 📁 File Structure
```
Pilas/
├── task_manager.py              # Core system implementation
├── interactive_task_manager.py  # Interactive user interface
├── README.md                    # Project documentation
└── [other existing files...]
```

## 🔧 Installation & Usage

### Running the Demo Version
```bash
python task_manager.py
```
This runs a demonstration with sample tasks and operations.

### Running the Interactive Version
```bash
python interactive_task_manager.py
```
This provides an interactive menu-driven interface for managing tasks.

## 🏗️ Architecture

### Core Classes
1. **Stack**: Basic stack implementation using Python list
2. **Task**: Represents individual tasks with properties and methods
3. **Action**: Represents operations for undo functionality
4. **TaskManager**: Main system that orchestrates all operations

### Stack Usage
The system uses two main stacks:
- **Task List**: Regular list for storing tasks
- **Action History Stack**: Stack for storing actions to enable undo functionality

## 🔄 How Undo Works
1. Every action (add/complete task) is stored in the action history stack
2. When undo is called, the last action is popped from the stack
3. The system reverses the effect of that action:
   - If action was "add": removes the task
   - If action was "complete": marks task as incomplete

## 📊 Example Output
```
📋 Task List (4 tasks):
--------------------------------------------------
 0. [✓] Review project documentation
 1. [○] Implement user authentication
 2. [✓] Write unit tests for API endpoints
 3. [○] Update database schema

📊 Task Statistics:
Total tasks: 4
Completed: 2
Pending: 2
Actions in history: 6
```

## 🎓 Educational Value
This project demonstrates:
- Stack data structure implementation
- LIFO (Last In, First Out) principle
- Object-oriented programming
- Command pattern for undo functionality
- Real-world application of data structures

## 🔧 Technical Details
- **Language**: Python 3.x
- **Data Structure**: Stack (implemented with Python list)
- **Design Patterns**: Command pattern for undo operations
- **Architecture**: Object-oriented design with separation of concerns

