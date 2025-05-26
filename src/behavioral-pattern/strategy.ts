/*
🧩 Behavioral Pattern 1: Strategy
✅ Purpose:
Encapsulate different algorithms or behaviors, and make them interchangeable at runtime.

✅ Real-World Scenario:
You’re building a payment system, and users can choose to pay via:

Credit Card

PayPal

Crypto

Each has different rules but shares the same interface: process(amount: number): void.

✅ Your Task:
Define a PaymentStrategy interface.

Implement:

CreditCardPayment

PayPalPayment

CryptoPayment

Create a PaymentContext class that:

Accepts a PaymentStrategy via setStrategy()

Has a pay(amount) method that uses the current strategy

🧪 Bonus:
Log which strategy is being used

Switch strategy at runtime and test both


*/

interface PaymentStrategy {
  process(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  process(amount: number){
     console.log(`${amount} has been transfered by Creditcard`)
  }
}

class PayPalPayment implements PaymentStrategy {
    process(amount: number) {
        console.log(`${amount} has been transfered by Paypal`)
    };
}

class CryptoPayment implements PaymentStrategy {
    process(amount: number): void {
        console.log(`${amount} has been transfered by Crypto`)
    }
    
}

class PaymentContext {
  private paymentStrategy!: PaymentStrategy;
  constructor() {}
  setStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
    console.log(`Strategy set to: ${paymentStrategy.constructor.name}`);
  }
  pay(amount: number) {
    if(!this.paymentStrategy) throw new Error('No payment strategy set')
    this.paymentStrategy.process(amount);
  }
}

const context = new PaymentContext()
context.setStrategy(new CreditCardPayment())
context.pay(25)
context.setStrategy(new PayPalPayment())
context.pay(40)
context.setStrategy(new CryptoPayment())
context.pay(50)
