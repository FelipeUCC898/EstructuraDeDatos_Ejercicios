"""
Task Management System using Stack Data Structure
Author: Felipe
Description: A system that allows managing daily tasks with undo functionality
"""

from datetime import datetime

class Stack:
    """Basic Stack implementation using Python list"""
    
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add an item to the top of the stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return the top item from the stack"""
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def is_empty(self):
        """Check if the stack is empty"""
        return len(self.items) == 0
    
    def peek(self):
        """Return the top item without removing it"""
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def size(self):
        """Return the number of items in the stack"""
        return len(self.items)
    
    def display(self):
        """Display all items in the stack"""
        if self.is_empty():
            print("Stack is empty")
        else:
            print("Stack contents:", self.items)


class Task:
    """Task class to represent individual tasks"""
    
    def __init__(self, description, task_id=None):
        self.description = description
        self.task_id = task_id or datetime.now().strftime("%Y%m%d%H%M%S")
        self.created_at = datetime.now()
        self.completed = False
    
    def __str__(self):
        status = "✓" if self.completed else "○"
        return f"[{status}] {self.description}"
    
    def complete(self):
        """Mark task as completed"""
        self.completed = True
    
    def undo_complete(self):
        """Mark task as not completed"""
        self.completed = False


class Action:
    """Action class to represent operations for undo functionality"""
    
    def __init__(self, action_type, task):
        self.action_type = action_type  # 'add' or 'complete'
        self.task = task
        self.timestamp = datetime.now()
    
    def __str__(self):
        return f"{self.action_type.upper()}: {self.task.description}"


class TaskManager:
    """Main Task Manager class using Stack data structure"""
    
    def __init__(self):
        self.tasks = []
        self.action_history = Stack()  # Stack to store actions for undo
        self.task_counter = 1
    
    def add_task(self, description):
        """Add a new task to the task list"""
        task = Task(description, f"TASK_{self.task_counter:03d}")
        self.tasks.append(task)
        self.action_history.push(Action('add', task))
        self.task_counter += 1
        print(f"✓ Task added: {task.description}")
    
    def complete_task(self, task_index):
        """Mark a task as completed"""
        if 0 <= task_index < len(self.tasks):
            task = self.tasks[task_index]
            if not task.completed:
                task.complete()
                self.action_history.push(Action('complete', task))
                print(f"✓ Task completed: {task.description}")
            else:
                print("Task is already completed!")
        else:
            print("Invalid task index!")
    
    def undo_last_action(self):
        """Undo the last action performed"""
        if self.action_history.is_empty():
            print("No actions to undo!")
            return
        
        last_action = self.action_history.pop()
        
        if last_action.action_type == 'add':
            # Remove the task that was added
            task_to_remove = last_action.task
            self.tasks = [task for task in self.tasks if task.task_id != task_to_remove.task_id]
            print(f"✓ Undid adding task: {task_to_remove.description}")
        
        elif last_action.action_type == 'complete':
            # Mark the task as not completed
            task_to_undo = last_action.task
            for task in self.tasks:
                if task.task_id == task_to_undo.task_id:
                    task.undo_complete()
                    print(f"✓ Undid completing task: {task.description}")
                    break
    
    def display_tasks(self):
        """Display all tasks with their status"""
        if not self.tasks:
            print("\n📋 No tasks found!")
            return
        
        print(f"\n📋 Task List ({len(self.tasks)} tasks):")
        print("-" * 50)
        for i, task in enumerate(self.tasks):
            print(f"{i:2d}. {task}")
    
    def display_action_history(self):
        """Display the action history stack"""
        print("\n🔄 Action History:")
        if self.action_history.is_empty():
            print("No actions recorded")
        else:
            # Display stack in reverse order to show chronological sequence
            temp_stack = Stack()
            actions = []
            
            # Pop all actions to get them in reverse chronological order
            while not self.action_history.is_empty():
                action = self.action_history.pop()
                actions.append(action)
                temp_stack.push(action)
            
            # Restore the original stack
            while not temp_stack.is_empty():
                self.action_history.push(temp_stack.pop())
            
            # Display actions in chronological order (oldest first)
            for i, action in enumerate(reversed(actions)):
                print(f"{i+1}. {action}")
    
    def get_statistics(self):
        """Get task statistics"""
        total_tasks = len(self.tasks)
        completed_tasks = sum(1 for task in self.tasks if task.completed)
        pending_tasks = total_tasks - completed_tasks
        
        print(f"\n📊 Task Statistics:")
        print(f"Total tasks: {total_tasks}")
        print(f"Completed: {completed_tasks}")
        print(f"Pending: {pending_tasks}")
        print(f"Actions in history: {self.action_history.size()}")


def main():
    """Main function to demonstrate the Task Manager"""
    print("🚀 Welcome to Task Manager with Undo Functionality!")
    print("=" * 60)
    
    manager = TaskManager()
    
    # Demo tasks
    print("\n📝 Adding sample tasks...")
    manager.add_task("Review project documentation")
    manager.add_task("Implement user authentication")
    manager.add_task("Write unit tests for API endpoints")
    manager.add_task("Update database schema")
    
    # Display initial state
    manager.display_tasks()
    manager.get_statistics()
    
    # Complete some tasks
    print("\n✅ Completing tasks...")
    manager.complete_task(0)  # Complete first task
    manager.complete_task(2)  # Complete third task
    
    # Display after completing tasks
    manager.display_tasks()
    manager.get_statistics()
    
    # Show action history
    manager.display_action_history()
    
    # Undo operations
    print("\n↩️  Undoing last action...")
    manager.undo_last_action()
    manager.display_tasks()
    
    print("\n↩️  Undoing another action...")
    manager.undo_last_action()
    manager.display_tasks()
    
    # Final statistics
    manager.get_statistics()


if __name__ == "__main__":
    main()

