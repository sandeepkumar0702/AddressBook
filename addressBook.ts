import * as readline from "readline-sync";
import * as fs from "fs";
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
        `First Name (${contact.firstName}): `
      ) || contact.firstName;
      contact.lastName = readline.question(
        `Last Name (${contact.lastName}): `
      ) || contact.lastName;
      contact.address = readline.question(
        `Address (${contact.address}): `
      ) || contact.address;
      contact.city = readline.question(`City (${contact.city}): `) || contact.city;
      contact.state = readline.question(
        `State (${contact.state}): `
      ) || contact.state;
      contact.zip = readline.question(`ZIP Code (${contact.zip}): `) || contact.zip;
      contact.phoneNumber = readline.question(
        `Phone Number (${contact.phoneNumber}): `
      ) || contact.phoneNumber;
      contact.email = readline.question(
        `Email (${contact.email}): `
      ) || contact.email;

      console.log("Contact updated successfully!");
    } else {
      console.log("Contact not found.");
    }
  }

  // Delete a contact
  deleteContact(): void {
    const nameToDelete = readline.question(
      "\nEnter the first name of the contact you want to delete: "
    );

    const initialLength = this.contacts.length;

    this.contacts = this.contacts.filter(
      (c) => c.firstName.toLowerCase() !== nameToDelete.toLowerCase()
    );

    if (this.contacts.length < initialLength) {
      console.log("Contact deleted successfully!");
    } else {
      console.log("Contact not found.");
    }
  }
  searchContactsByCityOrState(city: string, state: string): Contact[] {
    return this.contacts.filter(
      (contact) =>
        (city && contact.city.toLowerCase() === city.toLowerCase()) ||
        (state && contact.state.toLowerCase() === state.toLowerCase())
    );
  }
  // Sort the contacts alphabetically by person's name
  sortContactsByName(): void {
    if (this.contacts.length === 0) {
      console.log("No contacts available to sort.");
      return;
    }

    this.contacts.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

      return nameA.localeCompare(nameB); // Compare names alphabetically
    });

    console.log("\nContacts sorted alphabetically by name:");
    this.displayContacts();
  }
  //sort by city zip state
  sortContacts(criteria: "city" | "state" | "zip"): void {
    if (this.contacts.length === 0) {
      console.log("No contacts available to sort.");
      return;
    }

    this.contacts.sort((a, b) => {
      const valueA = a[criteria].toLowerCase();
      const valueB = b[criteria].toLowerCase();
      return valueA.localeCompare(valueB); // Compare alphabetically by the given criteria
    });

    console.log(`\nContacts sorted by ${criteria.charAt(0).toUpperCase() + criteria.slice(1)}:`);
    this.displayContacts();
  }
  saveToFile(fileName: string): void {
    try {
      const data = JSON.stringify(this.contacts, null, 2);
      fs.writeFileSync(fileName, data);
      console.log(`Contacts saved to ${fileName} successfully.`);
    } catch (error) {
      console.error("Failed to save contacts to file:", error);
    }
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

  // Search for a person in a city or state 
  searchPersonInCityOrState(): void {
    const city = readline.question("Enter city (or leave blank): ").trim();
    const state = readline.question("Enter state (or leave blank): ").trim();

    // Ensure either a city or state 
    if (!city && !state) {
      console.log("You must enter a city or state.");
      return;
    }

    console.log("\nSearching for contacts...");
    let foundContacts: Contact[] = [];

    // Search across all address books 
    this.addressBooks.forEach((addressBook, name) => {
      const results = addressBook.searchContactsByCityOrState(city, state);
      if (results.length > 0) {
        console.log(`\nContacts in Address Book '${name}':`);
        results.forEach((contact) => {
          console.log(
            `- ${contact.firstName} ${contact.lastName}, City: ${contact.city}, State: ${contact.state}`
          );
        });
        foundContacts = foundContacts.concat(results);
      }
    });

    if (foundContacts.length === 0) {
      console.log("No contacts found in the specified city or state.");
    } else {
      console.log("\nSearch completed.");
    }
  }
  viewPersonsByCityOrState(): void {
      const choice = readline.question("\nView persons grouped by (1) City or (2) State: ").trim();
      if (choice === "1") {
        this.groupAndDisplayPersonsByCity();
      } 
      else if (choice === "2") {
        this.groupAndDisplayPersonsByState();
      } 
      else {
        console.log("Invalid choice. Please try again.");
      }
  }
  
    //group and display persons by city
  private groupAndDisplayPersonsByCity(): void {
      const cityGroups: Map<string, Contact[]> = new Map();
  
      this.addressBooks.forEach((addressBook) => {
        addressBook["contacts"].forEach((contact) => {
          if (!cityGroups.has(contact.city)) {
            cityGroups.set(contact.city, []);
          }
          cityGroups.get(contact.city)!.push(contact);
        });
      });
  
      console.log("\nContacts Grouped by City:");
      cityGroups.forEach((contacts, city) => {
        console.log(`\nCity: ${city}`);
        contacts.forEach((contact) =>
          console.log(`- ${contact.firstName} ${contact.lastName}`)
        );
      });
  }
  
    // group and display persons by state
  private groupAndDisplayPersonsByState(): void {
      const stateGroups: Map<string, Contact[]> = new Map();
  
      this.addressBooks.forEach((addressBook) => {
        addressBook["contacts"].forEach((contact) => {
          if (!stateGroups.has(contact.state)) {
            stateGroups.set(contact.state, []);
          }
          stateGroups.get(contact.state)!.push(contact);
        });
      });
  
      console.log("\nContacts Grouped by State:");
      stateGroups.forEach((contacts, state) => {
        console.log(`\nState: ${state}`);
        contacts.forEach((contact) =>
          console.log(`- ${contact.firstName} ${contact.lastName}`)
        );
      });
  }
  //count by city
  countPersonsByCityOrState(): void {
    const choice = readline
      .question("\nCount contacts grouped by (1) City or (2) State: ")
      .trim();

    if (choice === "1") {
      this.countAndDisplayByCity();
    } else if (choice === "2") {
      this.countAndDisplayByState();
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }
  //count and display contacts by city
  private countAndDisplayByCity(): void {
    const cityCounts: Map<string, number> = new Map();

    this.addressBooks.forEach((addressBook) => {
      addressBook["contacts"].forEach((contact) => {
        cityCounts.set(contact.city, (cityCounts.get(contact.city) || 0) + 1);
      });
    });

    console.log("\nContact Counts by City:");
    cityCounts.forEach((count, city) => {
      console.log(`City: ${city}, Count: ${count}`);
    });
  }

  //count and display contacts by state
  private countAndDisplayByState(): void {
    const stateCounts: Map<string, number> = new Map();

    this.addressBooks.forEach((addressBook) => {
      addressBook["contacts"].forEach((contact) => {
        stateCounts.set(contact.state, (stateCounts.get(contact.state) || 0) + 1);
      });
    });

    console.log("\nContact Counts by State:");
    stateCounts.forEach((count, state) => {
      console.log(`State: ${state}, Count: ${count}`);
    });
  }

  
  // Select an address book 

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
      console.log("3. Edit Contact");
      console.log("4. Delete Contact");
      console.log("5. Sort Contacts by Name");
      console.log("6. Sort Contacts by City");
      console.log("7. Sort Contacts by State");
      console.log("8. Sort Contacts by Zip");
      console.log("9. Go Back");
      console.log("10. Save Contacts to File");

      const choice: string = readline.question("Enter your choice: ");

      switch (choice) {
        case "1":
          addressBook.addContacts();
          break;
        case "2":
          addressBook.displayContacts();
          break;
        case "3":
          addressBook.editContact();
          break;
        case "4":
          addressBook.deleteContact();
          break;
        case "5":
          addressBook.sortContactsByName();
          break;
        case "6":
          addressBook.sortContacts("city");
          break;
        case "7":
          addressBook.sortContacts("state");
          break;
        case "8":
          addressBook.sortContacts("zip");
          break;
        case "9":
          return;
          case "10": {
            const fileName = readline.question("Enter file name to save contacts: ");
            addressBook.saveToFile(fileName);
            break;
          }
        default:
          console.log("Invalid choice. Please try again.");
      }
    }
  }
  
  // Main menu w
  menu(): void {
    while (true) {
      console.log("\nAddress Book System Menu:");
      console.log("1. Add Address Book");
      console.log("2. Select Address Book");
      console.log("3. Search Person in City or State");
      console.log("4. View Persons by City or State");
      console.log("5. Count Persons by City or State"); // New menu option
      console.log("6. Exit");

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
          this.viewPersonsByCityOrState();
          break;
        case "5":
          this.countPersonsByCityOrState(); // New option handling
          break;
        case "6":
          console.log("Exiting Address Book System. Goodbye!");
          process.exit(0);
        default:
          console.log("Invalid choice. Please try again.");
      }
    }
  }
}

// adrees book
const addressBookSystem = new AddressBookSystem();
addressBookSystem.menu();