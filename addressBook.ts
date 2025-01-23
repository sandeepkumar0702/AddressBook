import * as readline from "readline-sync";

interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  email: string;
}

class AddressBook {
  private contacts: Contact[];

  constructor() {
    this.contacts = [];
  }

  addContact(): void {
    console.log("\nEnter Contact Details:");
    const firstName = readline.question("First Name: ");
    const lastName = readline.question("Last Name: ");
    const address = readline.question("Address: ");
    const city = readline.question("City: ");
    const state = readline.question("State: ");
    const zip = readline.question("ZIP Code: ");
    const phoneNumber = readline.question("Phone Number (10 digits): ");
    const email = readline.question("Email: ");

    const contact: Contact = {
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
  }

  displayContacts(): void {
    if (this.contacts.length === 0) {
      console.log("No contacts available.");
    } else {
      console.log("\nContacts List:");
      this.contacts.forEach((contact, index) => {
        console.log(`
          ${index + 1}. ${contact.firstName} ${contact.lastName}, Address: ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, Phone: ${contact.phoneNumber}, Email: ${contact.email}
        `);
      });
    }
  }

  menu(): void {
    while (true) {
      console.log("\nAddress Book Menu:");
      console.log("1. Add Contact");
      console.log("2. Display Contacts");
      console.log("3. Exit");

      const choice: string = readline.question("Enter your choice: ");

      switch (choice) {
        case "1":
          this.addContact();
          break;
        case "2":
          this.displayContacts();
          break;
        case "3":
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