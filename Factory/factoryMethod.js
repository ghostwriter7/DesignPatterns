// Bad example
// If in the future you decide to handle a different coordinate system, you would have to update
// both the enumerable and the class Point, what violates the Open / Close principle

const CoordinateSystem = {
  cartesian: 0,
  polar: 1
}

class BadPoint {
  constructor(a, b, coordinateSystem = CoordinateSystem.cartesian) {
    switch(coordinateSystem) {
      case CoordinateSystem.cartesian: {
        this.x = a;
        this.y = b;
        break;
      }
      case CoordinateSystem.polar: {
        this.x = a * Math.cos(b);
        this.y = a * Math.sin(b);
        break;
      }
    }
  }
}


// Factory Method
// Benefits: static methods clearly tell what values are expected as opposed to a and b in previous example

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const point1 = Point.newCartesianPoint(1, 1);
const point2 = Point.newPolarPoint(40, 170);
