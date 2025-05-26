/* 
🧳 Behavioral Pattern 8: Visitor
✅ Purpose:
Separate algorithms from the objects on which they operate — allowing you to add new operations 
to a set of objects without modifying their classes.

You define a visitor that visits each object, and each object accepts that visitor.

🧩 Real-World Scenario: Tax Reporting on Products
You're building a product catalog system with two types of products:

Books (0% tax)
Electronics (19% tax)

Each product knows its own data (e.g. name, price), but does not calculate its tax — instead, you’ll use a TaxCalculatorVisitor.

✅ Your Task:
Define an interface Product with:

interface Product {
  accept(visitor: ProductVisitor): void;
}
Implement:
Book
Electronics
Each calls visitor.visitBook(this) or visitor.visitElectronics(this) inside accept().

Define a ProductVisitor interface with:

interface ProductVisitor {
  visitBook(book: Book): void;
  visitElectronics(electronic: Electronics): void;
}
Implement a concrete TaxCalculatorVisitor that calculates taxes per product.

✅ Example Usage:
const products: Product[] = [new Book("1984", 10), new Electronics("TV", 400)];
const visitor = new TaxCalculatorVisitor();

products.forEach(p => p.accept(visitor));
*/

interface ProductVisitor {
  visitBook(book: Book): void;
  visitElectronics(electronic: Electronics): void;
}

interface Product {
  name: string;
  price: number;
  accept(visitor: ProductVisitor): void;
}

abstract class BaseProduct implements Product {
  constructor(public readonly name: string, public readonly price: number) {}
  abstract accept(visitor: ProductVisitor): void;
}

class Book extends BaseProduct {
  accept(visitor: ProductVisitor): void {
    visitor.visitBook(this);
  }
}

class Electronics extends BaseProduct {
  accept(visitor: ProductVisitor): void {
    visitor.visitElectronics(this);
  }
}

class TaxCalculatorVisitor implements ProductVisitor {
  visitBook(book: Book): void {
    console.log("Taxes for Book %s are %d EUR",book.name, 0);
  }
  visitElectronics(electronic: Electronics): void {
    console.log(
      "Taxes for Electronic %s are %d EUR",
      electronic.name,
      Math.round((electronic.price - electronic.price / 1.19) * 100) / 100
    );
  }
}

const visitor = new TaxCalculatorVisitor();
const products = [new Book("1984", 25), new Electronics("TV", 400)];

products.forEach((p) => p.accept(visitor));
