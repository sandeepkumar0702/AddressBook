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

  // Add a new contact
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

  // Display all contacts
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

  // Edit an existing contact
  editContact(): void {
    const nameToSearch = readline.question(
      "\nEnter the first name of the contact you want to edit: "
    );
    const contact = this.contacts.find(
      (c) => c.firstName.toLowerCase() === nameToSearch.toLowerCase()
    );

    if (contact) {
      console.log("\nEditing Contact:");
      contact.firstName = readline.question(
        `First Name (${contact.firstName}): `, { defaultInput: contact.firstName }
      ) || contact.firstName;
      contact.lastName = readline.question(
        `Last Name (${contact.lastName}): `, { defaultInput: contact.lastName }
      ) || contact.lastName;
      contact.address = readline.question(
        `Address (${contact.address}): `, { defaultInput: contact.address }
      ) || contact.address;
      contact.city = readline.question(
        `City (${contact.city}): `, { defaultInput: contact.city }
      ) || contact.city;
      contact.state = readline.question(
        `State (${contact.state}): `, { defaultInput: contact.state }
      ) || contact.state;
      contact.zip = readline.question(
        `ZIP Code (${contact.zip}): `, { defaultInput: contact.zip }
      ) || contact.zip;
      contact.phoneNumber = readline.question(
        `Phone Number (${contact.phoneNumber}): `, { defaultInput: contact.phoneNumber }
      ) || contact.phoneNumber;
      contact.email = readline.question(
        `Email (${contact.email}): `, { defaultInput: contact.email }
      ) || contact.email;

      console.log("Contact updated successfully!");
    } else {
      console.log("Contact not found.");
    }
  }

  // Menu-driven interface
  menu(): void {
    while (true) {
      console.log("\nAddress Book Menu:");
      console.log("1. Add Contact");
      console.log("2. Display Contacts");
      console.log("3. Edit Contact");
      console.log("4. Exit");

      const choice: string = readline.question("Enter your choice: ");

      switch (choice) {
        case "1":
          this.addContact();
          break;
        case "2":
          this.displayContacts();
          break;
        case "3":
          this.editContact();
          break;
        case "4":
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