## TypeScript

### Reading

https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- https://www.typescriptlang.org/docs/handbook/intro.html
- https://www.freecodecamp.org/news/learn-typescript-beginners-guide/

### Learning Outcomes

- `Types` in programming
- Pros & Cons of strict types
- `TypeScript` concepts & basic syntax
- Using TypeScript in a JavaScript application

### Types in Programming

Computer programming languages can be distinguished between `strongly typed` and `loosely typed`.

**Strongly Typed**
- Variables must be defined with a specific data type. 
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
- Enables static type checking and hints in IDE
- Enforces code consistency
- Removes ambiguity about objects imported into other applications

**Cons**

- Adds significant program structure & overhead to JavaScript projects. 
- JavaScript programs using TypeScript must be compiled to run in a browser
- Can add significant overhead to JavaScript object definition

### TypeScript Concepts

TypeScript is a Microsoft framework that layers on top of JavaScript, similar to `React`, and implements `type` suppport in JavaScript code.

JavaScript projects using TypeScript define `types` in code files with a special `.ts` or `.tsx` extension and must `compile` the files to plain JavaScript code before the program can run.

- TypeScript includes rules about how different kinds of values can be used (e.g. in math operations)

### Type Definitions

TypeStript supports three `primitive` data types -  `string`, `number`, and `boolean`

The TypeScript compiler can `infer` a variable's type from its initial value:

```commandline
let helloWorld = "Hello World"; // TypeScript infers 'string' type
```

Or the variable's type can be defined explicitly:

```commandline
let helloWorld: string = "Hello World"; // explicit type definition
```

**Arrays** can be defined as a certain type:

```commandline
let names: string[] = ["jim", "bob"];
let ages: number[] = [12, 32];
```

TypeScript supports specifying the types of both input parameters and output values of functions.

```commandline
const greet = (name: string): string => {
  return `Hello, ${name.toUpperCase()}!!`);
}
```

### Object Types

JavaScript objects can be defined with types for each property. **Optional** types can be identified with a question-mark.

```commandline
type Person = {
  name: string;
  prefix?: string;
  age: number;
};

const greet = (person: Person) => {
  if (person.prefix) {
    return `Hello ${person.prefix} ${person.name}`;
  }
  return `Hello ${person.name}`;
}

console.log(greet({name:"Jim", age:32}));
console.log(greet({prefix: "Mr.", name:"Bill", age:22}));
```


### Getting Started

The TypeScript compiler can be installed & executed as a node module, to compile .ts files into .js files:

```commandline
npm install typescript

npx tsc <FILENAME>.ts
```