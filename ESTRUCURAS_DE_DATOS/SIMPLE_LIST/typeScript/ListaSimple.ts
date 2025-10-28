class Contact {
    name: string;
    phone: number;
    email: string;
    next: Contact | null;

    constructor(name: string, phone: number, email: string) {

        this.name = name,
        this.phone = phone,
        this.email = email,
        this.next = null

    }
}

class ContactList {

    first_node: Contact | null;
    last_node: Contact | null;

    constructor () {
        this.first_node = null
        this.last_node = null
    }

    addContact (contact: Contact): void {

        if (this.first_node === null) {
            this.first_node = contact
            this.last_node = contact
        } else {
            if (this.last_node !== null) {
                this.last_node.next = contact
                this.last_node = contact
            }
        }

    }

    showHistory (): void {
        if (this.first_node === null ) {
            console.log("Contact list is empty");
            return;
        } else {
            let current_node: Contact | null = this.first_node;
            while (current_node !== null) {
                console.log("Title: ", current_node.name);
                console.log("phone: ", current_node.phone);
                console.log("email: ", current_node.email);
                console.log("next: ", current_node.next);

            }
        }
    }
}


const myContactList = new ContactList();

const myContact = new Contact("Juan", 302244454, "juan133@gmail.com" )
const myContact2 = new Contact("luis", 302244454, "juan133@gmail.com" )
const myContact3 = new Contact("carlos", 302244454, "juan133@gmail.com" )
const myContact4 = new Contact("pepe", 302244454, "juan133@gmail.com" )

myContactList.addContact(myContact);
myContactList.addContact(myContact2);
myContactList.addContact(myContact3);
myContactList.addContact(myContact4);


myContactList.showHistory();



