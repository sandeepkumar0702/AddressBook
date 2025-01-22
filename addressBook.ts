const readlineSync = require('readline-sync');
class Contact {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;
  
    constructor(
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        state: string,
        zip: string,
        phoneNumber: string,
        email: string
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
  }
  // AddressBook
class AddressBook {
    private contacts: Contact[] = [];
}

const addressBook = new AddressBook();

console.log(addressBook);