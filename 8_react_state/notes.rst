React State Management

Reading
----
- https://reactjs.org/docs/state-and-lifecycle.html
- https://reactjs.org/docs/handling-events.html
- https://reactjs.org/docs/lifting-state-up.html
- https://www.tutorialspoint.com/reactjs/reactjs_state.htm
- https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm

Practice
----
- https://www.freecodecamp.org/news/learn-react-course/

State & Lifecycle
----
Sometimes it's useful for a component to maintain an internal `state` that can change as users interact with the component.

React `class` components enable this (also Hooks but that's a later topic).

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

React component classes can also specify code that should execute when certain **lifecycle** events occur:
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

.. image:: ../images/react_data_flow.jpeg
  :width: 490

