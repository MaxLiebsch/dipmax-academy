/*
🧩 Task 6: Dependency Injection Simulation
Goal: Practice passing dependencies into classes.

Create a Notifier interface (e.g., send(message: string)).

Implement EmailNotifier and SMSNotifier.

Create a UserService that receives a Notifier via constructor.

Call UserService.notifyUser() with different notifiers.

*/

interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log('Message: ',message, 'send via email' )
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log('Message: ',message, 'send via SMS' )
  }
}

class UserService {
  constructor(private readonly notifier: Notifier) {}
  notifyUser(message: string) {
    this.notifier.send(message);
  }
}

const userService = new UserService(new EmailNotifier())
userService.notifyUser('Transaction received.')


const userService2 = new UserService(new SMSNotifier())
userService2.notifyUser('Transaction received')

