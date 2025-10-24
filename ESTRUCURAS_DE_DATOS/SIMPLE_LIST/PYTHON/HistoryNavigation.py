class Node:
    def __init__(self, url):
        self.url = url
        self.next = None
        
        
class HistoryNavigation:
    def __init__(self):
        self.head = None
        self.current = None
        
    def add_url (self, url):
        new_node = Node ()