import * as readline from "readline-sync";
class AddressBook {
    contacts;
    constructor() {
        this.contacts = [];
    }
    // Add one or more contacts
    addContacts() {
        console.log("\nAdd Multiple Contacts:");
        while (true) {
            console.log("\nEnter Contact Details:");
            const firstName = readline.question("First Name: ");
            const lastName = readline.question("Last Name: ");
            const address = readline.question("Address: ");
            const city = readline.question("City: ");
            const state = readline.question("State: ");
            const zip = readline.question("ZIP Code: ");
            const phoneNumber = readline.question("Phone Number (10 digits): ");
            const email = readline.question("Email: ");
            const contact = {
                firstName,
                lastName,
                address,
                city,
                state,
                zip,
                phoneNumber,
                email,
            };
            this.contacts.push(contact);
            console.log("Contact added successfully!");
            // Ask if the user wants to add another contact
            const addAnother = readline
                .question("Do you want to add another contact? (yes/no): ")
                .toLowerCase();
            if (addAnother !== "yes")
                break;
        }
    }
    // Display all contacts
    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
        }
        else {
            console.log("\nContacts List:");
            this.contacts.forEach((contact, index) => {
                console.log(`
          ${index + 1}. ${contact.firstName} ${contact.lastName}, Address: ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, Phone: ${contact.phoneNumber}, Email: ${contact.email}
        `);
            });
        }
    }
    // Edit an existing contact
    editContact() {
        const nameToSearch = readline.question("\nEnter the first name of the contact you want to edit: ");
        const contact = this.contacts.find((c) => c.firstName.toLowerCase() === nameToSearch.toLowerCase());
        if (contact) {
            console.log("\nEditing Contact:");
            contact.firstName = readline.question(`First Name (${contact.firstName}): `) || contact.firstName;
            contact.lastName = readline.question(`Last Name (${contact.lastName}): `) || contact.lastName;
            contact.address = readline.question(`Address (${contact.address}): `) || contact.address;
            contact.city = readline.question(`City (${contact.city}): `) || contact.city;
            contact.state = readline.question(`State (${contact.state}): `) || contact.state;
            contact.zip = readline.question(`ZIP Code (${contact.zip}): `) || contact.zip;
            contact.phoneNumber = readline.question(`Phone Number (${contact.phoneNumber}): `) || contact.phoneNumber;
            contact.email = readline.question(`Email (${contact.email}): `) || contact.email;
            console.log("Contact updated successfully!");
        }
        else {
            console.log("Contact not found.");
        }
    }
    // Delete a contact using the filter method
    deleteContact() {
        const nameToDelete = readline.question("\nEnter the first name of the contact you want to delete: ");
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter((c) => c.firstName.toLowerCase() !== nameToDelete.toLowerCase());
        if (this.contacts.length < initialLength) {
            console.log("Contact deleted successfully!");
        }
        else {
            console.log("Contact not found.");
        }
    }
    // Menu-driven interface
    menu() {
        while (true) {
            console.log("\nAddress Book Menu:");
            console.log("1. Add Contacts");
            console.log("2. Display Contacts");
            console.log("3. Edit Contact");
            console.log("4. Delete Contact");
            console.log("5. Exit");
            const choice = readline.question("Enter your choice: ");
            switch (choice) {
                case "1":
                    this.addContacts();
                    break;
                case "2":
                    this.displayContacts();
                    break;
                case "3":
                    this.editContact();
                    break;
                case "4":
                    this.deleteContact();
                    break;
                case "5":
                    console.log("Exiting Address Book. Goodbye!");
                    process.exit(0);
                default:
                    console.log("Invalid choice. Please try again.");
            }
        }
    }
}
const addressBook = new AddressBook();
addressBook.menu();
