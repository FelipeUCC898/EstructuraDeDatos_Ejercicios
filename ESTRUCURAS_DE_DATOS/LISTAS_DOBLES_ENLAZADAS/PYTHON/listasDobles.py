class Node:
    
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None
        
class DoublyLinkedList:
    
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0 
        
    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        
        self.length += 1
        
        
        
    def pretend (self, value):
        new_node = Node(value)
        if self.head is None:      
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self.length += 1
                 
        
    
    def traverse_to_index (self, index):
        current_node = self.head    
        1 = 0
        while i != index:
            current_node = current_node.next
            i += 1
    
    def insert (self, index, value):
        if index == 0:
            self.pretend(value)
        elif index >= self.length:
            self.append(value)
            
        else:
            new_node = Node(value)
            leader = self.traverse_to_index(index - 1)
            follower = leader.next 
            leader.next = new_node
            new_node.prev = leader
            new_node.next = follower
            follower.prev = new_node
            self.length += 1
                    
    
    def remove (self, index):
        if index == 0:
            self.head = self.head.next
            self.head.prev = None
        elif index >= self.length - 1:
            self.tail = self.tail.prev
            self.tail.next = None
        else:
            leader = self.traverse_to_index(index - 1)
            unwanted_node = leader.next
            follower = unwanted_node.next
            leader.next = follower
            follower.prev = leader
        self.length -= 1
        
        
    def print_list(self):
        curent_node = self.head
        result = ''
        while current_node is not None:
            result += str(current_node.value) + ' <-> '
            current_node = current_node.next
        print("-".join(result))
        
        
my_list = DoublyLinkedList()
my_list.append(10)
my_list.append(20)
my_list.append(5)
my_list.append(6)

my_list.print_list()

my_list.insert(2, 15)

my_list.pretend(5)
my_list.append(6)
my_list.append(7)

my_list.print_list()

my_list.insert(3, 25)

my_list.print_list()

my_list.remove(7)

my_list.print_list()