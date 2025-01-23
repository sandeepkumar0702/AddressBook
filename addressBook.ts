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

  // Add one or more contacts
  addContacts(): void {
    console.log("\nAdd Multiple Contacts:");

    while (true) {
      console.log("\nEnter Contact Details:");
      const firstName = readline.question("First Name: ");
      const lastName = readline.question("Last Name: ");

      // Check for duplicates
      const duplicate = this.contacts.some(
        (contact) =>
          contact.firstName.toLowerCase() === firstName.toLowerCase() &&
          contact.lastName.toLowerCase() === lastName.toLowerCase()
      );

      if (duplicate) {
        console.log("A contact with this name already exists. Please try again.");
        continue; // Skip adding this contact
      }

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

      const addAnother = readline
        .question("Do you want to add another contact? (yes/no): ")
        .toLowerCase();
      if (addAnother !== "yes") break;
    }
  }

  // Display all contacts
  displayContacts(): void {
    if (this.contacts.length === 0) {
      console.log("No contacts available.");
    } else {
      console.log("\nContacts List:");
      this.contacts.forEach((contact, index) => {
        console.log(` ${index + 1}. ${contact.firstName} ${contact.lastName}, Address: ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, Phone: ${contact.phoneNumber}, Email: ${contact.email}`);
      });
    }
  }

  // Find all contacts in a city or state
  findContactsByCityOrState(city: string, state: string): Contact[] {
    return this.contacts.filter(
      (contact) =>
        contact.city.toLowerCase() === city.toLowerCase() ||
        contact.state.toLowerCase() === state.toLowerCase()
    );
  }
}

class AddressBookSystem {
  private addressBooks: Map<string, AddressBook>;

  constructor() {
    this.addressBooks = new Map();
  }

  // Add a new address book
  addAddressBook(): void {
    const name = readline.question("\nEnter a unique name for the new address book: ");

    if (this.addressBooks.has(name)) {
      console.log("An address book with this name already exists.");
      return;
    }

    this.addressBooks.set(name, new AddressBook());
    console.log(`Address book '${name}' created successfully!`);
  }

  // Select an address book and perform operations
  selectAddressBook(): void {
    const name = readline.question(
      "\nEnter the name of the address book you want to access: "
    );

    const addressBook = this.addressBooks.get(name);

    if (!addressBook) {
      console.log("Address book not found.");
      return;
    }

    while (true) {
      console.log(`\nAddress Book: ${name}`);
      console.log("1. Add Contacts");
      console.log("2. Display Contacts");
      console.log("3. Go Back");

      const choice: string = readline.question("Enter your choice: ");

      switch (choice) {
        case "1":
          addressBook.addContacts();
          break;
        case "2":
          addressBook.displayContacts();
          break;
        case "3":
          return;
        default:
          console.log("Invalid choice. Please try again.");
      }
    }
  }

  // Search for a person in a city or state across all address books
  searchPersonInCityOrState(): void {
    const searchCity = readline.question("\nEnter the city to search (leave blank if not applicable): ");
    const searchState = readline.question("Enter the state to search (leave blank if not applicable): ");

    if (!searchCity && !searchState) {
      console.log("You must specify at least a city or a state.");
      return;
    }

    console.log("\nSearching for contacts...");
    let foundContacts: Contact[] = [];

    this.addressBooks.forEach((addressBook, name) => {
      const results = addressBook.findContactsByCityOrState(searchCity, searchState);
      if (results.length > 0) {
        console.log(`\nIn Address Book '${name}':`);
        results.forEach((contact) => {
          console.log(`- ${contact.firstName} ${contact.lastName}, ${contact.city}, ${contact.state}`);
        });
        foundContacts = foundContacts.concat(results);
      }
    });

    if (foundContacts.length === 0) {
      console.log("No contacts found in the specified city or state.");
    } else {
      console.log("\nSearch complete.");
    }
  }

  // Menu-driven interface
  menu(): void {
    while (true) {
      console.log("\nAddress Book System Menu:");
      console.log("1. Add Address Book");
      console.log("2. Select Address Book");
      console.log("3. Search Person in City or State");
      console.log("4. Exit");

      const choice: string = readline.question("Enter your choice: ");

      switch (choice) {
        case "1":
          this.addAddressBook();
          break;
        case "2":
          this.selectAddressBook();
          break;
        case "3":
          this.searchPersonInCityOrState();
          break;
        case "4":
          console.log("Exiting Address Book System. Goodbye!");
          process.exit(0);
        default:
          console.log("Invalid choice. Please try again.");
      }
    }
  }
}

const addressBookSystem = new AddressBookSystem();
addressBookSystem.menu();
