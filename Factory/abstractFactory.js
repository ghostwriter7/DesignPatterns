
class HotDrink {
  // There are no ordinary abstract methods in JS, but to create one, leave it blank
  // alternatively throw an error if someone tries to use an abstract method
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log(`This tea is nice with lemon!`);
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

class HotDrinkFactory {
  // Abstract...
  prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea(); // customize it
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

class HotDrinkMachine {
  makeDrink(type) {
    switch(type) {
      case 'tea': {
        return new TeaFactory().prepare(200);
      }
      case 'coffee': {
        return new CoffeeFactory().prepare(50);
      }
      default: {
        throw new Error('Unknown drink');
      }
    }
  }
}

const machine = new HotDrinkMachine();
