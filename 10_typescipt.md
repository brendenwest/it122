## TypeScript

### Reading

- https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
- https://www.freecodecamp.org/news/learn-typescript-beginners-guide/

### Learning Outcomes

- `Types` in programming
- Pros & Cons of strict types
- `TypeScript` concepts & basic syntax
- Using TypeScript in a JavaScript application

### Types in Programming

Computer programming languages can be distinguished between `strongly typed` and loosely typed.

**Strongly Typed**
- Variables must be defined with specific data types. 
- Language makes a distinction between numeric data types (e.g. int, float, double precision).
- Arrays can only contain items of the same data type
- Program code is checked at `compile` time for mismatch between variable definition and subsequent updates. Mismatches generate an error and prevent program compilation. 
- Examples include Java, C#, C++, & Swift.

**Loosely Typed** 
- Variables can be defined without a specific data type.
- Language doesn't distinguish between different numeric data types
- Arrays can contain items of different data types 
- Compiler implies datatype based on initial value and may allow assigning new values of a different data type.
- Examples include JavaScript & Python

### Pros & Cons of Strict Types

**Pros**

- Catches potential data errors at `compile` time before a program reaches real users
- Enforces code consistency
- Removes ambiguity about objects imported into other applications
- Enables static type checking and hints in IDE

**Cons**

- Adds significant program structure & execution overhead to JavaScript projects. 
- JavaScript programs that use TypeScript cannot be run in a web browser without explicit compilation
- Can add significant overhead to JavaScript object definition

### TypeScript Concepts

TypeScript is a Microsoft project that implements strict types in JavaScript projects through an external layer (compiler), rather than through direct support in the JavaScript language. 

Projects using TypeScript must define `types` (objects) in files with a special `.ts` or `.tsx` extension and compile them to JavaScript with a build system such as https://webpack.js.org/

- TypeScript code compiles to native JavaScript.
- TypeScript includes rules about how different kinds of values can be used (e.g. in math operations)
- 