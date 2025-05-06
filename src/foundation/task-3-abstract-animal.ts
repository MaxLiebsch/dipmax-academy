/*
🧩 Task 3: Abstract Animal Class
Goal: Understand abstraction and inheritance.

Create an abstract Animal class with an abstract speak() method.

Implement Dog and Cat classes.

Call speak() polymorphically from an Animal[] list.

*/

abstract class Animal {
    constructor(public readonly name: string){
    }
    abstract speak(): void;
}


class Cat extends Animal {
    speak(): void {
        console.log(`${this.name} makes Miaoww Miaoww`)
    }
}

class Dog extends Animal {
    speak(): void {
        console.log(`${this.name} makes Wuff Wuff`)
    }
}

const animalList: Animal[] = [
    new Dog('Pepe'),
    new Cat('Charly'),
    new Dog('Finni'),
    new Cat('Heinrich')
]

for (const animal of animalList) {
   animal.speak();
}