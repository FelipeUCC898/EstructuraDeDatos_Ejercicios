class pila:

    def __init__ (self):
        self.pila = []

    def is_empty(self):
        return len(self.pila) == 0
    
    def push (self , item):
        self.pila.append(item)

    def pop (self):
        if not self.is_empty:
            return self.pila.pop()
        
    def top (self):
        if not self.is_empty:
            return self.pila[-1]
        
    
    def showNumbers(self):
        print(self.pila)

    
numbers = pila()

numbers.push(3)
numbers.push(4)
numbers.push(5)

numbers.showNumbers()

numbers.pop()

print("Elemento eliminado", numbers.pop())
