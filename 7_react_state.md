## React Events & State

### Reading
- https://react.dev/learn/adding-interactivity
- https://react.dev/learn/synchronizing-with-effects
- https://react.dev/learn#using-hooks
- https://react.dev/learn/sharing-state-between-components
- https://react.dev/reference/react

### Practice
- https://www.freecodecamp.org/news/learn-react-course/

### Learning Outcomes
- What is `state`?
- What are `hooks`?
- Setting & using component state
- Lifting state from child to parent components
- HTML forms in React

### What is `state`?
Sometimes a component needs to remember information (maintain an internal `state`) that can change as users interact with the component. 

For example to track which item a user selected from a list, or how a data variable was changed.

Early versions of React prescribed `class components` to handle `state`. Now it's more common to use a `hook` within a functional component, so we'll focus on that approach.

### What are `Hooks`?
React hooks are JS functions that respond to lifecycle events and can be stateful (retain values between executions). 

React has a set of built-in hooks for common scenarios. You can also develop custom hooks for use in your application


    const MyApp = (props) => {
        const [items, setItems] = React.useState([]]);

        setItems([{"one": "First item"}, {"two": "Second item"},])

        return (
            <div> 
                <h2>Items List</h2>
                <Items data={items} />
            </div>
        );
    }


What's happening here?
- we define a state variable `items` and a method `setItems` to update that variable.
- initially items has an empty array value
- items is populated with new value using `setItems`. 
- Updating `items` will cause any element that depends on it to re-render

NOTE - state variables must be updated only through the set-state methods and not directly.

### Lifting state

Component state is accessible only to the component that owns and sets it. Components don't automatically know the state of other components.

Instead, React uses a "top-down" or "unidirectional" data flow, where a component can pass its state to child components as `props`.

![](images/react_data_flow.jpeg)


### HTML Forms in React

HTML form elements differ from other DOM elements in React, because they naturally keep an internal state. Input fields keep track of what a user enters.

To address this, React has a technique called `controlled components`, where the React component state is the “single source of truth”. The React component that renders a form receives updates as the user input values, adds those to component state, and propagates state back to the form.

Key aspects of a controlled component are:
- component state has a value corresponding to the form field
- component has a change-handler method to receive form-field updates
- state value & change-handler are attached to the field

In this example, the `ItemDetail` component renders an HTML form with form values manged by a parent component:

```
  const ItemDetail = (props) => {
    return <div>
    <hr />
    <h3>Details</h3>
    <form>
      User: <input type="text" name="user" value={props.item.user || ""} onChange={props.handleChange} /><br/>
    </form>
    </div>
    }
```

### What are `effects`?
Side effects are actions that should happen when a component renders. For example, you might want to load data from an api once your home page renders.

React executes effects each time a component renders, but code can choose when to execute in response to these. Most Effects should only re-run when needed rather than after every render.

React provides the `useEffect` hook to execute code in response to an effect.

    import { useState, useEffect } from 'react';

    export default function App() {
      const [items, setItems] = useState([]);

      useEffect(() => {
        // fetch data
        const fetchData = async()=> {
            const data = await getData();
            setItems(data) 
        }
        fetchData()
      }, []);
    }

What's happening here?
- we import the `useState` and `useEffect` hooks
- we define a state variable `items` and a function `setIems` to update that variable
- useEffect includes an async function `fetchData` to retrieve data and store in app state
- useEffect executes the `fetchData` only if effect dependencies are empty
- when `fetchData` completes, the result is saved into component state using `setItems`
