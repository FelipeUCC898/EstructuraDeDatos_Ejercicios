"""
Interactive Task Manager - User Interface
Author: Felipe
Description: Interactive command-line interface for the Task Manager system
"""

from task_manager import TaskManager

def display_menu():
    """Display the main menu options"""
    print("\n" + "="*50)
    print("📋 TASK MANAGER - Main Menu")
    print("="*50)
    print("1. Add new task")
    print("2. Complete task")
    print("3. Display all tasks")
    print("4. Undo last action")
    print("5. View action history")
    print("6. Show statistics")
    print("7. Exit")
    print("-"*50)

def get_user_choice():
    """Get user's menu choice"""
    try:
        choice = int(input("Enter your choice (1-7): "))
        return choice
    except ValueError:
        print("❌ Invalid input! Please enter a number.")
        return None

def add_task_interactive(manager):
    """Interactive task addition"""
    print("\n➕ ADD NEW TASK")
    print("-"*20)
    description = input("Enter task description: ").strip()
    
    if description:
        manager.add_task(description)
    else:
        print("❌ Task description cannot be empty!")

def complete_task_interactive(manager):
    """Interactive task completion"""
    print("\n✅ COMPLETE TASK")
    print("-"*20)
    manager.display_tasks()
    
    if not manager.tasks:
        print("No tasks to complete!")
        return
    
    try:
        task_index = int(input("Enter task number to complete: ")) - 1
        manager.complete_task(task_index)
    except ValueError:
        print("❌ Invalid input! Please enter a valid task number.")
    except IndexError:
        print("❌ Invalid task number!")

def main():
    """Main interactive function"""
    print("🚀 Welcome to Interactive Task Manager!")
    print("This system uses Stack data structure for undo functionality.")
    
    manager = TaskManager()
    
    while True:
        display_menu()
        choice = get_user_choice()
        
        if choice == 1:
            add_task_interactive(manager)
        
        elif choice == 2:
            complete_task_interactive(manager)
        
        elif choice == 3:
            manager.display_tasks()
        
        elif choice == 4:
            print("\n↩️  UNDO LAST ACTION")
            print("-"*25)
            manager.undo_last_action()
        
        elif choice == 5:
            manager.display_action_history()
        
        elif choice == 6:
            manager.get_statistics()
        
        elif choice == 7:
            print("\n👋 Thank you for using Task Manager!")
            print("Goodbye! 👋")
            break
        
        else:
            print("❌ Invalid choice! Please select 1-7.")
        
        # Pause before showing menu again
        input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()

