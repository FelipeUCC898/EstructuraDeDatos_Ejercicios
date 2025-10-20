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

links_navigation = Stack()

links_navigation.push('https://www.google.com')
links_navigation.push('https://www.youtube.com')
links_navigation.push('https://www.facebook.com')

links_navigation.print_stack()

def return_links(element):
    while not element.is_empty():
        element.print_stack()
        element.pop()

return_links(links_navigation)

