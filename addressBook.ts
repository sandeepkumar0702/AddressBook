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
}

const addressBook = new AddressBook();