class Node:
    def __init__(self, url):
        self.url = url
        self.next = None
        
        
class HistoryNavigation:
    def __init__(self):
        self.head = None
        self.current = None
        
    def add_url (self, url):
        new_node = Node (url)
        
        if self.head is None:
            self.head = new_node
            self.current = new_node
        else: 
            self.current.next = new_node
            self.current = new_node
            
    def show_history (self):
        current_node = self.head
        while current_node is not None:
            print("URL: ", current_node.url)
            print("NEXT: ", current_node.next)
            print("-----------------------------")
            current_node = current_node.next
            
history = HistoryNavigation()

history.add_url("https://www.google.com")
history.add_url("https://www.google.com")
history.add_url("https://www.google.com")

history.show_history()


  
            