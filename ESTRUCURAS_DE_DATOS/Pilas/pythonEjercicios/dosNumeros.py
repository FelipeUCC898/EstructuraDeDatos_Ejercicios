class Stack:

    def __init__(self):
        self.items = []

    def is_empty(self):
        return len(self.items) == 0 

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()

    def top(self):
        if not self.is_empty():
            return self.items[-1]
    
    def print_stack(self):
        print(self.items)

numbers = Stack()

numbers.push(1)
numbers.push(2)

numbers.print_stack()
print("TOP: " , numbers.top())



numbers.push(3)
numbers.push(4)

numbers.print_stack()
print("TOP: " , numbers.top())


numbers.push(5)
numbers.push(6)

numbers.print_stack()
print("TOP: " , numbers.top())

numbers.pop()
numbers.pop()
numbers.pop()

numbers.print_stack()



    