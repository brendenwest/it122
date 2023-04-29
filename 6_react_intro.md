## React & SPA's

### Reading

- Brown, Ch. 16 - Single-page Applications
- https://react.dev/learn - Quick Start
- https://react.dev/learn/thinking-in-react

### Practice

- https://www.freecodecamp.org/news/learn-react-course/

### Watch

- https://www.linkedin.com/learning/learning-react-js-4?u=2359778 (

### Learning Outcomes

- Single-page applications
- React virtual dom
- React components
- CSS styles in React

**Single-page Applications (SPA)**

An SPA performs all UI on a single web page to provide a more responsive user experience than multi-page web apps. The page does not reload or transfer to another page during user interaction.

Necessary resources are retrieved with a single page load, or dynamically loaded from a web server and added to the page as necessary.

A variety of JavaScript frameworks enable SPA functionality, including  `Angular <https://angular.io>`_, `jQuery <https://jquery.com/>`_, `Vue.js <https://vuejs.org/>`_ and `ReactJS <https://reactjs.org>`_.

This class will focus on ReactJS, which has become very popular recently for it's performance and simplicity. Other frameworks adopt similar concepts, with an understanding of React you can learn other frameworks quickly.

**React Intro**

React is a *declarative UI* framework that lets you define UI as components that can efficiently rende & update as page-data changes.

React uses a *virtual DOM* to update only those elements that have changed, rather than updating the whole page DOM as changes occur.

**Installation**

In a professional setting, you might use a *build* process (e.g. webpack) to bundle React  dependencies into your app.

But for this class your app can enable React with these hosted libraries:

    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
 
JSX
----
React uses an XML-like syntax called **JSX** to describe UI components.

    const greeting = <h1 className="greeting">Hello, world!</h1>;

JSX is optional and compiles to regular JavaScript, like so:

    const greeting = {
    type: 'h1', 
    props: { 
      className: 'greeting', 
      children: 'Hello, world' 
    }
    };

**NOTE** - CSS classes on DOM elements are specified using a `className` attribute.

Some benefits of JSX are:
- executes faster because it performs optimization while compiling to JavaScript,
- It is type-safe and allows errors to be caught during compilation instead of at run-time,
- easier and faster to write templates if you are familiar with HTML,

JSX can contain embedded JavaScript, inside curly brackets.

JSX statements can be assigned to variables, passed as function parameters, and returned from functions:

    const Greeting = (props) => {
    if (props.user) {  
      return <h1>Hello, {props.user}!</h1>;
    }  
    return <h1>Hello, Stranger.</h1>; 
    }

**NOTE** - Components defined as a function must begin with a capital letter.

### Rendering JSX

You render a React element into the HTML DOM by specifying it's 'root' DOM node:

    <div id="root"/>
    <script type="text/babel">
      const greeting = <h1>Hello, world</h1>;
      ReactDOM.render( greeting, document.getElementById('root') );
    </script>

Elements inside the root node will be managed by React. Pure React applications will typically have a single root node, but mixed applications can have as many isolated React root nodes as needed.

**Note** - React is unaware of DOM elements outside of defined root nodes. So you would need to use other methods such as jQuery to manipulate those.

### CSS Styles

As noted above, React elements can reference CSS classes from a stylesheet using a `className` or ID attribute. They can also use inline style objects:

    const divStyle = {
      color: 'blue',
      backgroundImage: 'url(background_image.png)'
    };

    function HelloWorldComponent() {
      return <div style={divStyle}>Hello World!</div>;
    }

**NOTE** - The style attribute requires a JavaScript object with camelCased properties rather than a CSS string.

See https://reactjs.org/docs/dom-elements.html for other nuances of using inline styles in React.

### Components

React applications compose a UI of reusable components. Components are JavaScript functions or classes that accept parameters (called "props") and return React elements.

Components can be defined as a function:

    const Welcome = (props) => {
      return <h1>Hello, {props.name}</h1>;
    }

Or in a class declaration:

    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

Either approach may be appropriate, but classes support richer features such as state management. React best practice is to use the simplest approach possible.

React can recognize an element that represents a user-defined component and render it to the DOM with supplied 'props':

React can recognize an element that represents a user-defined component, and render it to the DOM with supplied 'props':

    const greeting = <Welcome name="Sara" />;
    ReactDOM.render( 
        greeting,
        document.getElementById('root') 
    );

React components are **pure functions** that do not modify their inputs (props).

React classes can use **state** to change their output over time in response to user actions, network responses, and other events.

### Lists & Keys

React supports collections of elements in JSX (Links to an external site.) using curly braces {}. For example:

    const names = ["dave", "sue", "keisha", "darrell"];
    const listItems = names.map((item) =>  <li key={item}>{item}</li>);
    ReactDOM.render(
      <ul>{listItems}</ul>,  document.getElementById('root')
    );

**Note** that React expects list items to have a **unique key** that helps identify items when the DOM changes. Ideally, keys are not the array index value, since that can change when an array is modified.

### Conditional Rendering

Because JavaScript expressions can embedded in JSX, conditional rendering can be accomplished with the logical **&& operator**.

    const Greeting = (props) => {
      const isLoggedIn = props.isLoggedIn;
      return (
        <div>
          <h1>Hello!</h1>
          {isLoggedIn &&
            <h2>
              You have unread messages.
            </h2>
          }
        </div>
      );
    }

    ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      <Greeting isLoggedIn={false} />,
      document.getElementById('root')
    );
