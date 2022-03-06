// example of multiple Builders interacting together

// Person's data will be initialized by two different builders,
// one responsible for address, another for employment
class Person {
  constructor() {
    // Address
    this.streetAddres = this.postCode = this.city = '';

    // Employment
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }

  toString() {
    return `Person lives at ${this.streetAddres}, ${this.city}, ${this.postCode}
    and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

// Base class
class PersonBuilder {

  // gets person initialized as a default empty person
  constructor(person = new Person()) {
    this.person = person;
  }

  // Exposing specific builders, passing them the same object, so all of them can build it up
  get lives() {
    return new PersonAddressBuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  // Fluid interface, each method returns this, so methods can be chained and also since both builders
  // extend base PersonBuilder, switching between specific builders is easy
  at(company) {
    this.person.companyName = company;
    return this;
  }

  as(profession) {
    this.person.position = profession;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(streetAddress) {
    this.person.streetAddres = streetAddress;
    return this;
  }

  withPostCode(postCode) {
    this.person.postCode = postCode;
    return this;
  }

  in(city) {
    this.person.city = city;
    return this;
  }
}

const personBuilder = new PersonBuilder();
let person = personBuilder;

person = person
  .lives.at('123 London Road').in('London').withPostCode('12345')
  .works.at('Great Firm').as('Developer').earning(200000)
  .build();

console.log(person.toString());
