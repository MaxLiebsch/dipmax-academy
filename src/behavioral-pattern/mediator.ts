/* 
🧭 Behavioral Pattern 7: Mediator
✅ Purpose:
Centralize communication between related objects, 
so they don’t refer to each other directly — reducing tight coupling 
and making the system easier to maintain.

🧩 Real-World Scenario: Chat Room
You're building a chat room system where multiple users can send messages to each other.

Instead of users directly referencing one another, you’ll use a ChatRoomMediator to:

Manage the users
Deliver messages to all or specific participants

✅ Your Task
Create a ChatRoomMediator interface with:

register(user: User): void

send(message: string, from: User): void

Create a concrete SimpleChatRoom that implements the mediator

Create a User class that:

Has a name
Holds a reference to the mediator
Can send(message: string) and receive(message: string, from: string)

✅ Example usage:

const chat = new SimpleChatRoom();
const max = new User("Max", chat);
const lena = new User("Lena", chat);

chat.register(max);
chat.register(lena);

max.send("Hello, Lena!");
// Lena receives message from Max
*/
class User {
  constructor(
    public readonly name: string,
    private readonly chat: ChatRoomMediator
  ) {}
  leave(){
    this.chat.deRegister(this);
  }
  send(message: string) {
    this.chat.send(message, this);
  }
  sendTo(message: string, toName: string){
    this.chat.sendTo(message, this, toName);
  }
  receive(message: string, from: string) {
    console.log("%s receivces message: %s from %s", this.name,message, from);
  }
}

interface ChatRoomMediator {
  register(user: User): void;
  deRegister(user: User): void;
  send(message: string, from: User): void;
  sendTo(message: string, from: User, toName: string): void;
}

interface Message  {
    from: string,
    message: string;
    date: Date;
}

class SimpleChatRoom implements ChatRoomMediator {
  private users: User[] = [];
  private readonly history: Message[] = []
  deRegister(user: User): void {
     const userIndex = this.users.indexOf(user);
     if(userIndex !== -1){
        this.users.splice(userIndex, 1);
        console.log('Good bye %s', user.name);
     }
  }
  register(user: User): void {
    if (this.users.indexOf(user) === -1) {
      console.log("Welcome, %s You are registered", user.name);
      this.users.push(user);
    } else {
      console.log("You are already registered in that chat");
    }
  }
  send(message: string, from: User): void {
    this.history.push({
        message,
        from: from.name,
        date: new Date()
    })
    this.users.forEach((user) => {
      if (user.name !== from.name) user.receive(message, from.name);
    });
  }
  sendTo(message: string, from: User, toName: string): void {
      const toUser = this.users.find(user => user.name === toName);
      if(!toUser) console.log('%s is not in the chat', toName);
      else toUser.receive(message, from.name);
  }
  getHistory(){
    return this.history
  }
}

const chat = new SimpleChatRoom();

const max = new User("Max", chat);
const louise = new User("Louise", chat);
const jimm = new User('Jimm', chat)

chat.register(max);
chat.register(jimm);
chat.register(louise);

max.send("Hello, Louise");
louise.send("Hello friends, how are you?");
jimm.send("Good good, but I need to run!")
jimm.leave();
console.log(chat.getHistory());
chat.register(jimm);
max.sendTo('Hello Louise, I wanted to share in private the following', "Louise")
max.sendTo('This person does not exists', 'Harry');
max.send('Welcome back Jimm');
