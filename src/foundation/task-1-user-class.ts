/*
🧩 Task 1: Implement a User Class
Goal: Practice constructors, public properties.

Create a User class with name, email, and role.

Instantiate and log one User.

*/

class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly role: string
  ) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
  getName() {
    console.log(`The name is ${this.name}.`);
  }

  describe(){
     console.log(`${this.name} ${this.email} ${this.role}`)
  }
}

const user = new User("Max", "liebsch@mail.com", "Fullstack");

user.getName();
user.describe();
