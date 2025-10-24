 enum State {
        PENDIENTE,
        COMPLETADO   
    }

class Task {
    constructor(

        public title: string,
        public description: string,
        public state: State = State.PENDIENTE,
        public next = null

    ) {}
}

class TaskList {
  firstNode: Task | null;
  lastNode: Task | null;

  constructor() {
    this.firstNode = null;
    this.lastNode = null;
  }

  addTask(task: Task): void {
    if (this.firstNode === null) {
      this.firstNode = task;
      this.lastNode = task;
    } else {
      if (this.lastNode) {
        this.lastNode.next = task;
      }
      this.lastNode = task;
    }
  }

  printTasks(): void {
    if (this.firstNode === null) {
      console.log("The task list is empty.");
    } else {
      let currentNode: Task | null = this.firstNode;
      while (currentNode !== null) {
        console.log("Title:", currentNode.title);
        console.log("Description:", currentNode.description);
        console.log("State:", State[currentNode.state]);
        console.log("------------------------------------");
        currentNode = currentNode.next;
      }
    }
  }

  completeTask(title: string): void {
    let current: Task | null = this.firstNode;
    while (current !== null) {
      if (current.title === title) {
        current.state = State.COMPLETADA;
        console.log(`Task '${title}' marked as completed.`);
        return;
      }
      current = current.next;
    }
    console.log(`Task '${title}' not found.`);
  }

  deleteTask(title: string): void {
    if (this.firstNode === null) {
      console.log("No tasks available to delete.");
      return;
    }

    // If the first node is the one to delete
    if (this.firstNode.title === title) {
      this.firstNode = this.firstNode.next;
      console.log(`Task '${title}' deleted successfully.`);
      return;
    }

    let previous: Task | null = null;
    let current: Task | null = this.firstNode;

    while (current !== null) {
      if (current.title === title) {
        if (previous !== null) {
          previous.next = current.next;
        }
        console.log(`Task '${title}' deleted successfully.`);
        return;
      }
      previous = current;
      current = current.next;
    }

    console.log(`Task '${title}' not found in the list.`);
  }
}

const taskList = new TaskList();

const task1 = new Task("Buy milk", "Go to the store and buy milk");
const task2 = new Task("Study TypeScript", "Practice linked lists");
const task3 = new Task("Do laundry", "Wash and fold clothes");

taskList.addTask(task1);
taskList.addTask(task2);
taskList.addTask(task3);

console.log("📝 All tasks:");
taskList.printTasks();

console.log("\n✅ Marking one as completed...");
taskList.completeTask("Study TypeScript");

console.log("\n🗑️ Deleting a task...");
taskList.deleteTask("Do laundry");

console.log("\n📋 Final list of tasks:");
taskList.printTasks();