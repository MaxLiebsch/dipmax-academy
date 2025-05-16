/*
🔧 Let’s Start with Factory Pattern
✅ Real-World Scenario:
You’re building a system that sends different types of notifications: Email, SMS, or Push.

You want a NotificationFactory to decide which object to return based on input.

🧩 Task: Notification Factory
✅ Your Goal:
Define an interface Notifier with a method notify(message: string).

Implement:

EmailNotifier

SMSNotifier

PushNotifier

Create a NotifierFactory.create(type: 'email' | 'sms' | 'push')

Use it to send a message without manually constructing notifiers.

*/

interface Notifier {
  notify(message: string): void;
}

type EmailOptions = { smtpHost: string; fromEmail: string };

class EmailNotifier implements Notifier {
  constructor({}: EmailOptions) {}
  notify(message: string): void {
    console.log(`${message} sent via Email`);
  }
}

type SMSOptions = {
  apiKey: string;
};

class SMSNotifier implements Notifier {
  constructor(options: SMSOptions) {}
  notify(message: string): void {
    console.log(`${message} sent via SMS`);
  }
}

type PushOptions = { deviceToken: string; appId: string };

class PushNotifer implements Notifier {
  constructor(options: PushOptions) {}
  notify(message: string): void {
    console.log(`${message} sent via Push`);
  }
}

class NotifierFactory {
  constructor(
    private readonly options: {
      email: EmailOptions;
      sms: SMSOptions;
      push: PushOptions;
    }
  ) {}
  create(type: "sms" | "push" | "email"): Notifier {
    switch (type) {
      case "email": {
        return new EmailNotifier(this.options.email);
      }
      case "push": {
        return new PushNotifer(this.options.push);
      }
      case "sms": {
        return new SMSNotifier(this.options.sms);
      }
      default: {
        throw new Error(`Notifier of type ${type}. Not supported`);
      }
    }
  }
}

const notifier = new NotifierFactory({
  email: {
    smtpHost: "host",
    fromEmail: "info@dipmax-software.org",
  },
  sms: {
    apiKey: "key",
  },
  push: {
    deviceToken: "token",
    appId: "id",
  },
});

notifier.create("email").notify("Wooooooww");

notifier.create("sms").notify("Pin: 332 232");

notifier.create("push").notify("Transaction processed.");
