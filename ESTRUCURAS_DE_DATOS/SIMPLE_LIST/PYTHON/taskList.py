from enum import Enum

# Define the possible states for a task
class State(Enum):
    PENDIENTE = 1
    COMPLETADA = 2

# Define the Task class
class Task:
    def __init__(self, title, description, state=State.PENDIENTE):
        self.title = title
        self.description = description
        self.state = state
        self.next = None  # Pointer to the next task

# Define the linked list to manage tasks
class TaskList:
    def __init__(self):
        self.first_node = None
        self.last_node = None

    def add_task(self, task):
        if self.first_node is None:
            self.first_node = task
            self.last_node = task
        else:
            self.last_node.next = task
            self.last_node = task

    def print_tasks(self):
        if self.first_node is None:
            print("The task list is empty.")
        else:
            current_node = self.first_node
            while current_node is not None:
                print("Title:", current_node.title)
                print("Description:", current_node.description)
                print("State:", current_node.state.name)
                print("------------------------------------")
                current_node = current_node.next

    def complete_task(self, title):
        current = self.first_node
        while current is not None:
            if current.title == title:
                current.state = State.COMPLETADA
                print(f"Task '{title}' marked as completed.")
                return
            current = current.next
        print(f"Task '{title}' not found.")

    def delete_task(self, title):
        if self.first_node is None:
            print("No tasks available to delete.")
            return

        if self.first_node.title == title:
            self.first_node = self.first_node.next
            print(f"Task '{title}' deleted successfully.")
            return

        previous = None
        current = self.first_node
        while current is not None:
            if current.title == title:
                previous.next = current.next
                print(f"Task '{title}' deleted successfully.")
                return
            previous = current
            current = current.next

        print(f"Task '{title}' not found in the list.")


# ---------- TESTING ----------
task_list = TaskList()

task1 = Task("Buy milk", "Go to the store and buy milk")
task2 = Task("Study Python", "Practice linked lists")
task3 = Task("Do laundry", "Wash and fold clothes")

task_list.add_task(task1)
task_list.add_task(task2)
task_list.add_task(task3)

print("📝 All tasks:")
task_list.print_tasks()

print("\n✅ Marking one as completed...")
task_list.complete_task("Study Python")

print("\n🗑️ Deleting a task...")
task_list.delete_task("Do laundry")

print("\n📋 Final list of tasks:")
task_list.print_tasks()

"""dadad"""