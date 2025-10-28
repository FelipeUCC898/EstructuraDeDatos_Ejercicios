class Contact:
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email
        self.next = None

class ContactList:
    def __init__(self):
        self.first_node = None
        self.last_node = None

    def add_contact(self, contact):
        if self.first_node is None:
            self.first_node = contact
            self.last_node = contact

        else:
            self.last_node.next = contact
            self.last_node = contact

    def print_contact(self):
        if self.first_node is None:
            print("Contact list is empty")
        else:
            current_node = self.first_node
            while current_node is not None:
                print("Name: ", current_node.name)
                print("Phone: ", current_node.phone)
                print("Email: ", current_node.email)
                print("Next: ", current_node.next)
                print("---------------------------")
                current_node = current_node.next

            
contact_list = ContactList()

contact1 = Contact("AAA", "111", "aaaa@example.com")
contact2 = Contact("SSS", "222", "aaaa@example.com")
contact3 = Contact("CCC", "333", "aaaa@example.com")
contact4 = Contact("DDD", "444", "aaaa@example.com")

contact_list.add_contact(contact1)
contact_list.add_contact(contact2)
contact_list.add_contact(contact3)
contact_list.add_contact(contact4)

contact_list.print_contact()


