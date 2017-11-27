React & SPA's

**Reading**

* https://facebook.github.io/react/ 
* https://www.tutorialspoint.com/reactjs/index.htm  
 

**SPA**

A single-page application (SPA) performs all UI on a single web pageLinks to an external site. to provide a more responsive user experience than multi-page web apps. The page does not reload or transfer to another page during user interaction.

Necessary resources are retrieved with a single page load, or dynamically loaded from a web server and added to the page as necessary, usually in response to user actions.

A number of client-side JavaScript frameworks enable SPA functionality, including  AngularJSLinks to an external site., Ember.jsLinks to an external site., ExtJS ,Links to an external site. jQuery, and ReactJS Links to an external site..

This class will focus on ReactJS, which has become very popular recently for it's performance and simplicity.

**React Intro**

React is a JavaScript framework that lets you declare encapsulated UI components that maintain their own state. React will efficiently update and render just the right components when page data changes. 

React uses a virtual DOM to update only those elements that have changed, rather than updating the whole page DOM as changes occur.

**Installation**

In a professional setting, React applications may involve more complex installation. But for the purposes of this class, your app can enable React with these hosted libraries:

 <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
 
**JSX**

React uses an XML-like syntax called JSX to describe components.
::

  const element = <h1 className="greeting">Hello, world!</h1>;

JSX is optional and compiles to regular JavaScript, like so:
::

  const element = { 
    type: 'h1', 
    props: { 
      className: 'greeting', 
      children: 'Hello, world' 
    }
  };

Some benefits of JSX are: 

executes faster because it performs optimization while compiling to JavaScript,
It is type-safe and allow errors to be caught during compilation instead of at run-time,
easier and faster to write templates if you are familiar with HTML,
JSX can contain embedded JavaScript, inside curly brackets.

Because JSX statements compile to JavaScript objects, they can be assigned to variables, passed as function parameters, and returned from functions:
::

  function getGreeting(user) { 
    if (user) {  
      return <h1>Hello, {formatName(user)}!</h1>;
    }  
    return <h1>Hello, Stranger.</h1>; 
  }

Rendering Elements

You render a React element into the HTML DOM by specifying it's 'root' DOM node:
::

  <div id="root"/>
  <script>
    const element = <h1>Hello, world</h1>; 
    ReactDOM.render( element, document.getElementById('root') );
  </script>

Everything inside the root node will be managed by React. Pure React applications will typically have a single root node, but mixed applications can have as many isolated root DOM nodes as needed.

**Components**

React uses components to compose a UI of independent, reusable pieces. These components are like JavaScript functions that accept parameters (called "props") and return React elements.

Components can be defined in a function:
::

  function Welcome(props) { 
    return <h1>Hello, {props.name}</h1>; 
  }

Or in a class declaration:
::

  class Welcome extends React.Component { 
    render() { 
      return <h1>Hello, {this.props.name}</h1>; 
    } 
  }

Both are equivalent, but classes can include richer features such as managing state. 

React can recognize an element that represents a user-defined component, and render it to the DOM with supplied 'props':
::

  const element = <Welcome name="Sara" />;
  ReactDOM.render( 
    element, 
    document.getElementById('root') 
  );

React components are 'pure' functions that must not modify their inputs (props).

Instead, React components use 'state' to change their output over time in response to user actions, network responses, and other events.

**State & Lifecycle**

State is similar to props, but is private and fully controlled by the component.

Local state is available only to components defined as classes.

React classes can define an initial state in a 'constructor' method that initializes the class. This is the only place where state is directly assigned to a value.

The state can be referenced in other class methods such as render().
::

  class Clock extends React.Component {  
    constructor(props) {  
      super(props);  
      this.state = {date: new Date()}; 
    } 
    render() { 
      return ( <div> <h1>Hello, world!</h1>  <h2>It is {this.state.date.toLocaleTimeString()}.</h2>  </div> ); 
    } 
  } 

  ReactDOM.render(  <Clock />,  document.getElementById('root') );

React component classes can also specify code ("hooks") that should execute when certain 'lifecycle' events occur: 
::

  componentDidMount() {   
   // code to execute when component first rendered to DOM
  } 
  
  componentWillUnmount() {
    // code to execute when component is removed from DOM
  }

Component state can be modified outside the constructor method only through the setState() method:
::

  this.setState({date: new Date()});

Because React may perform state updates asynchronously, setState() commands shouldn't rely on a component's state or props values for calculating the next state. Instead, those values can be passed as function parameters:
::

  this.setState((prevState, props) => ({
   counter: prevState.counter + props.increment 
  }));

In React, state is accessible only to the component that owns and sets it. Component's don't know the state of other components. 

Instead, React uses a "top-down" or "unidirectional" data flow, where a component can pass its state to child components as 'props'.