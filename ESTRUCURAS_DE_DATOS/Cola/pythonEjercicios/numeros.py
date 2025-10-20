class Queue:

    def __init__(self):
        self.number = []

    def is_empty(self):
        return len(self.number) == 0 

    def enqueue (self, number):
        self.number.append(number)

    def dequeue(self):
        if not self.isEmpty:
            return self.number.pop()

    def front (self):
        return self.number[0]

    def rear (self):
        if not self.isEmpty:
            return self.number[-1]

    def size (self):
        print(len(self.number))

    
numbers = Queue()

numbers.enqueue(10)
numbers.enqueue(20)
numbers.enqueue(30)
numbers.enqueue(40)

print("Size queue: " , numbers.size)
print("First queue: " , numbers.front)
print("First queue: " , numbers.rear)

print("Elementos eliminados: ")

while (numbers.is_empty != 0):
    print(numbers.dequeue)

print("Size queue: " , numbers.size)









    
    
