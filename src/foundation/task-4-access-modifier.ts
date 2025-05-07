/*

🧩 Task 4: Access Modifier Practice
Goal: Use private, protected, public.

Create a BankAccount class:

balance is private.

Add a protected ownerId.

Use getBalance() and deposit() methods.

Extend PremiumAccount and add bonus logic.

*/

class BankAccount {
  private balance = 0;
  constructor(public readonly ownerName: string, protected ownerId: string) {}

  getBalance() {
    console.log(`The account balance for ${this.ownerName} is ${this.balance} CURR`)
  }

  deposit(amount: number) {
    this.balance += amount;
    console.log(`Balance for Account ${this.ownerId} updated.`)
  }
}

class PremiumAccount extends BankAccount {
     private cryptoBalance =0;
     
     getCryptoBalance(){
        console.log(`The account crypto balance for ${this.ownerName} is ${this.cryptoBalance} Coins`)
     }

     depositCrypto(coins: number){
        this.cryptoBalance += coins;
        console.log(`Crypto balance for Account ${this.ownerId} updated.`)
     }
}

const normalAccount = new BankAccount('Max Kant', '1');

normalAccount.getBalance();
normalAccount.deposit(10);
normalAccount.getBalance();

const premiumAccount = new PremiumAccount('Max Power', '2');

premiumAccount.getBalance();
premiumAccount.deposit(20);
premiumAccount.getBalance();
premiumAccount.getCryptoBalance();
premiumAccount.depositCrypto(2);
premiumAccount.getCryptoBalance();





