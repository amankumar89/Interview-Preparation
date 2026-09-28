# Core-Java — 02 OOP

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is Object-Oriented Programming (OOP)?

**Interview Answer:**
OOP is a programming paradigm based on objects and classes. It organizes code around real-world entities and encourages modular, reusable, and maintainable design.

**Detailed Explanation:**
In Java, OOP helps model business domains with clear responsibilities. Classes describe the structure and behavior, while objects are instances that hold state and perform actions.

### Q2. What is a class and what is an object?

**Interview Answer:**
A class is a blueprint, while an object is an instance of that class. The class defines fields and methods; the object stores actual values.

**Detailed Explanation:**
Example: `Car` is a class, and `myCar` is an object of type `Car`. The object has state such as color and speed, while the class defines how those properties are managed.

### Q3. What are the main pillars of OOP?

**Interview Answer:**
The four main pillars are encapsulation, inheritance, polymorphism, and abstraction.

**Detailed Explanation:**
Each pillar addresses a different design concern. Encapsulation hides internals, inheritance reuses behavior, polymorphism allows flexible method calls, and abstraction focuses on essential behavior instead of implementation details.

### Q4. What is encapsulation?

**Interview Answer:**
Encapsulation is the practice of hiding implementation details and exposing only required behavior through methods and access modifiers.

**Detailed Explanation:**
This reduces complexity and protects internal state. Fields are often marked `private`, and public getter/setter methods control how values are read or changed.

### Q5. What is inheritance?

**Interview Answer:**
Inheritance allows a class to acquire fields and methods from another class. The subclass extends the superclass and can add or override behavior.

**Detailed Explanation:**
Inheritance models an “is-a” relationship. Example: `Dog extends Animal` means a dog is an animal. It promotes reuse, but too much inheritance can create rigid designs and complex hierarchies.

### Q6. What is polymorphism?

**Interview Answer:**
Polymorphism allows one interface or method to behave differently based on the runtime object. In Java, this is commonly achieved through method overriding and interfaces.

**Detailed Explanation:**
A method declared in a superclass can behave differently in each subclass. This makes code more flexible and reduces conditional checks when handling different implementations.

### Q7. What is abstraction?

**Interview Answer:**
Abstraction focuses on essential behavior while hiding unnecessary details. In Java, it is implemented using abstract classes and interfaces.

**Detailed Explanation:**
This helps define contracts and reduce coupling. Clients depend on the behavior they need without needing to know how it is implemented internally.

### Q8. What is method overloading?

**Interview Answer:**
Method overloading occurs when a class has multiple methods with the same name but different parameters.

**Detailed Explanation:**
It allows methods to be called in different ways without changing the method name. Overloading is resolved at compile time based on method signature.

### Q9. What is method overriding?

**Interview Answer:**
Method overriding happens when a subclass defines a method with the same name and signature as a superclass method.

**Detailed Explanation:**
It is used for runtime polymorphism. The method that gets called depends on the actual object type at runtime, not the reference type.

### Q10. What is the difference between `this` and `super`?

**Interview Answer:**
`this` refers to the current instance of the class, while `super` refers to the parent class instance or parent class members.

**Detailed Explanation:**
`this` is used to distinguish instance variables from parameters or to call the current class constructor. `super` is used to access superclass methods or constructors, especially when overriding behavior.

## Practical Questions

### Q11. What is composition and why is it often preferred over inheritance?

**Answer:**
Composition means building a class using other objects rather than inheriting behavior. It is often preferred because it is more flexible and avoids deep inheritance hierarchies.

### Q12. What are common OOP design mistakes in production?

**Answer:**
Common mistakes include overusing inheritance, creating god classes, exposing mutable state, and ignoring encapsulation. These issues make code harder to maintain and extend over time.
