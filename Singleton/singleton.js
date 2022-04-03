const fs = require('fs');
const path = require('path');
// ** SINGLETON **
// A component which is instantiated only once

// Motivation:
// Database repository
// Object factory

// Initialized only once
// Same instance provided to all interested parties
// Prevent others from creating copies of it!

class Singleton {
  // constructor has a property instance, when creating a new instance, constructor checks whether an instance already
  // exists or if it has to be instantiated
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }
}


// Monostate
// Each instantiated object will be a new instance, but they all share data
class ChiefExecutiveOfficer {
  // Inside the class, provided getters and setters that point to the same source of data
  get name() { return ChiefExecutiveOfficer._name };
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }
  get age() { return ChiefExecutiveOfficer._age };
  set age(value) { ChiefExecutiveOfficer._age = value };

  toString() {
    return `A CEO of the company is ${this.name}, who is ${this.age}`;
  }
}

// Data initialized outside the class
ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

const CEO1 = new ChiefExecutiveOfficer();
CEO1.name = 'John Freeman';
CEO1.age = 55;

const CEO2 = new ChiefExecutiveOfficer();
CEO2.name = 'Super Mario';
CEO2.age = 13;

console.log(CEO1.toString());
console.log(CEO2.toString());


// SINGLETON PROBLEMS

// Low level module!
class MyDatabase {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;

    console.log('Initializing database');
    this.capitals = {};

    const lines = fs.readFileSync(
      path.join(__dirname, 'capitals.txt')
    ).toString().split('\r\n');

    for (let i = 0; i < lines.length / 2; i++) {
      this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

// High level module!
class SingletonRecordFinder {
  totalPopulation(cities) {
    return cities.map(city => new MyDatabase().getPopulation(city)).reduce((x, y) => x + y);
  }
}

class DummyDatabase {
  constructor() {
    this.capitals = {
      'alpha': 1,
      'beta': 2,
      'gamma': 3
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

describe('singleton database', function() {
  it('is a singleton', function() {
    const db1 = new MyDatabase();
    const db2 = new MyDatabase();
    expect(db1).toBe(db2);
  });

  // it is not a Unit test anymore! but an integration test
  // to test SingletonRecordFinder, MyDatabase has to be instantiated too
  // test is very fragile, if data changes, toBe() gets broken
  // in real life you don't test on real databases but on dummy data
  it('calculates total population', function() {
    const rf = new SingletonRecordFinder();
    const cities = ['Warsaw', 'Cracow'];
    const totalPopulation = rf.totalPopulation(cities);
    expect(totalPopulation).toBe(155500 + 123133);
  });

  it('calculates total population better', function () {
    const db = new DummyDatabase();
    const rf = new ConfigurableRecordFinder(db);
    expect(rf.totalPopulation(['alpha', 'gamma'])).toEqual(4)
  })
});

// To fix SingletonRecordFinder, introduce dependency injection
// High level module MUST NOT depend on LOW LEVEL module - previous case
class ConfigurableRecordFinder {
  constructor(database) {
    this.database = database;
  }

  totalPopulation(cities) {
    return cities.map(city => this.database.getPopulation(city)).reduce((x, y) => x + y);
  }
}
