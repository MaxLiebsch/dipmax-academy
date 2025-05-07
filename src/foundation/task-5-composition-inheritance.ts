/*

🧩 Task 5: Composition over Inheritance
Goal: Learn how to compose instead of extend.

Create an Engine class with start().

Create a Car class that accepts Engine in its constructor.

Create a startCar() method that uses engine.start().

*/

// interface or abstract class
/*

interface Engine {
   start():void
}


*/

abstract class Engine {
  constructor() {}
  abstract start(): void;
}

class ElectricEngine implements Engine {
  start() {
    console.log("Electric Engine started.");
  }
}

class ElectricCar {
  constructor(private readonly engine: Engine) {}

  startCar() {
    this.engine.start();
  }
}

const electricCar = new ElectricCar(new ElectricEngine());
electricCar.startCar();



