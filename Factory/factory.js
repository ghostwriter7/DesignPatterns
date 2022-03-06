class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // This method wires Point and PointFactory together what should be avoided
  // but improves the experience of an API user.
  static get factory() {
    return PointFactory;
  }
}

// Methods don't have to be static if there's a reason for the Factory to hold some data
// passed via constructor

class PointFactory {
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const point1 = PointFactory.newCartesianPoint(10, 10);
const point2 = Point.factory.newPolarPoint(45, 100);

