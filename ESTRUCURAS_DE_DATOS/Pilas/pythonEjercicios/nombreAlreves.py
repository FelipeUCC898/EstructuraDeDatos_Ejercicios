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

def reverse_string(string):
    stack = Stack()
    final_string = ''

    for char in string:
        stack.push(char)

    while not stack.is_empty():
        final_string += stack.pop()

    return final_string

print(reverse_string('Hola'))      