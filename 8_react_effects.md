## React Effects

### Reading
- https://react.dev/learn/synchronizing-with-effects
- https://react.dev/learn/you-might-not-need-an-effect
- https://dev.to/jasmin/how-to-use-async-function-in-useeffect-5efc

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

