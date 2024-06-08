1. What is the difference between Component and PureComponent?Give an example where it might break my app.

Component : A component is the building block of any react application. A regular react component re-render itself every time the parent component re-renders or when the state changes. A component can be divided into two types : class components and functional components. A class component consists of states and lifecycle methods. On the other hand, functional components are used to display the JSX. After the introduction of ES6, even functional components can implement state and side effects using react hooks. 

class Autocomplete extends Component {
   render() {
       return <h1>Autocomplete Component</h1>
   }
}
	
Pure Components : A pure component is similar to the regular component but it implements the ‘shouldComponentUpdate()’ method with a shallow comparison of the state and props to decide whether the re-render is required or not. This in turn helps in optimising the performance of the application and also, avoids unnecessary re-renders. The code snippet below shows a pure component.

class Autocomplete extends PureComponent {
   render() {
       return <h1>Autocomplete Component</h1>
   }
}

Given a scenario of an e-commerce platform where list of items is rendered,
If we are using a Regular Component for managing the item rendering might result in unnecessary re-renders if the parent component regularly updates its state even where items remain unchanged. This could reduce the performance as the entire list is rendered each item and can also degrade further if the list grows. 
In the case of Pure Components, it can help improve the performance but if the fetched list of items consists of a nested data structure, the shallow comparison method may overlook the changes in these nested structures this could lead to incorrect rendering. 
		

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

The reason why using ‘Context’ with ‘shouldComponentUpdate’ might be dangerous is that if an application uses ‘Context’ for some of its data but solely relies on ‘shouldComponentUpdate’ to decide if a re-render is required, the component might not re-render when the context changes. This happens because ‘shouldComponentUpdate’ does not check for changes in ‘Context’, which may lead to the component not updating as needed, resulting in unexpected behaviour.


3. Describe 3 ways to pass information from a component to its PARENT.

The three ways to pass information from a component to its parent are:

-Callback Functions : In this, the parent component passes a function as a prop to the child component. The child component calls this function by using ‘props.functionName’ and can send data back to the parent component. 

-Event Emitters : These are used to pass information between components to avoid going through the component hierarchy. The child components utilise these to create custom events and emit them, the parent components then listen to these and receive the data. 

-Context or Redux : Both of these follow a global state management approach. With Context or Redux, both parent and child components can read and update the state easily without having to navigate through the component hierarchy. This approach simplifies state management across the entire application, making it easier to maintain and share state between deeply nested components. Additionally, Redux provides more advanced features like middleware, devtools, and predictable state management through reducers and actions, which can be beneficial for larger and more complex applications.
		
4. Give 2 ways to prevent components from re-rendering.

-useMemo : This is a React hook which is designed to enhance the performance by preventing unnecessary re-renders in functional components. It does this by memoizing the result of an expensive calculation and only recalculating it when the array of dependency changes.  This can be particularly useful in situations that involve heavy calculations based on state or prop which in turn help improve the overall efficiency of the application. The syntax of useMemo is shown below:
const memoizedValue = useMemo(() => {
 // Expensive calculation or any other computation
 return result;
}, [dependency1, dependency2, ...]);

-useCallback : This React hook is similar to useMemo, but instead of memoizing a value, it memoizes a function. The primary purpose of useCallback is to prevent the recreation of a function on every re-render, especially when the function is passed as a prop to child components. This optimization helps improve performance by ensuring that child components do not unnecessarily re-render due to changes in function references.
const memoizedCallback = useCallback(() => {
   // Function
 }, [dependency1, dependency2, ...]);
 
	
5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment can be used to group multiple elements together without introducing an extra node in the DOM. These can be used in scenarios where we do not need a parent wrapper. 
These are helpful in writing cleaner code and maintaining code quality without creating extra DOM nodes. 
In some cases if we use a <div> element, it might cause unintended styling which can be avoided by using a fragment. 
Example without using a fragment:
import React from 'react';


const MyComponent = ({ isShow }) => {
 const showItems = () => {
   if (isShow) {
     return (
       <div>
         <p>Item 1</p>
         <p>Item 2</p>
         <p>Item 3</p>
       </div>
     );
   } else {
     return <p>No items to display</p>;
   }
 };


 return (
   <div>
     {showItems()}
   </div>
 );
};


export default MyComponent;



In this example, the `isShow` state holds a boolean value, and when it is true, the function `showItems()` is called, which returns multiple `<p>` elements directly without using a fragment. This is incorrect because returning multiple sibling elements without a parent wrapper is not allowed in React. By using a fragment, this issue would be resolved, ensuring that the correct component is being rendered and preventing any potential errors during rendering.

6. Give 3 examples of the HOC pattern.

Higher Order Components(HOC) is a component that receives a component and returns another component with enhanced functionality . These are used to help reuse the same logic in multiple components. The three examples of the HOC pattern are:

-Styling HOC : These can be used to apply themes to components for example : light and dark themes or for applying common styles. This can be useful in maintaining consistent styling across the entire application.
import React from 'react';


const withStyle = (WrappedComponent) => {
 return (props) => (
   <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
     <WrappedComponent {...props} />
   </div>
 );
};


export default withStyle;

In this example, `withStyle` is a Higher Order Component (HOC) that enhances a wrapped component by applying a specific style. It takes a `WrappedComponent` as its argument and returns a new functional component that renders the `WrappedComponent` within a `<div>` element. The `<div>` has inline styles defined to give it a light blue background and padding. Any props passed to the enhanced component are forwarded to the `WrappedComponent` using the spread operator (`{...props}`). This HOC enables consistent styling to be applied to any component it wraps, promoting code reusability and maintainability.

-Authentication HOC :  This HOC can be used to handle the authentication logic such as, checking if a user is logged in before displaying the home component. If the user is not logged in, then redirect him to the login page.  This helps in enforcing authentication across multiple components in your application.
import React from 'react';
import { Redirect } from 'react-router-dom';


const withAuth = (WrappedComponent) => {
 const AuthComponent = (props) => {
   const isAuthenticated = checkAuthentication(); // Example function to check authentication


   if (!isAuthenticated) {
     return <Redirect to="/login" />;
   }


   return <WrappedComponent {...props} />;
 };


 return AuthComponent;
};


export default withAuth;


 
In this example, `withAuth`, checks if a user is authenticated before rendering a component. It takes a `WrappedComponent` as input and returns a new component. Inside this new component, it checks if the user is authenticated using an example function called `checkAuthentication()`. If the user is not authenticated, it redirects them to the "/login" route using `<Redirect>`. If the user is authenticated, it renders the `WrappedComponent` along with any props passed to it. 

-Loader HOC : This is used to simplify the handling of loading states in components that fetch data asynchronously. By implementing this in our code, we can improve the code reusability and readability.
import React from 'react';


const withLoader = (WrappedComponent) => {
 return ({ isLoading, ...otherProps }) => {
   return isLoading ? <div>Loading...</div> : <WrappedComponent {...otherProps} />;
 };
};


export default withLoader;

In this example,’withLoader’ HOC takes a ‘WrappedComponent’ as input and returns a new functional component. Inside this new component, it checks the ‘isLoading’ prop. If isLoading is true, it displays a simple loading indicator (<div>Loading...</div>). Otherwise, it renders the ‘WrappedComponent’ along with any other props passed to it.




7. What's the difference in handling exceptions in promises,
callbacks and async...await?

-Promises 
Promises use .then() and .catch() methods. .then() is used to handle successful operations and .catch() is used to handle errors. 
When an error occurs, it goes in the .catch() block and is handled using a callback function. The error handling code is separate from the main code to help improve readability. 
The syntax of this is shown below
fetch(url)
 .then(response => {
   // handle success
 })
 .catch(error => {
   // handle error
 });

-Callbacks
Callbacks consist of two arguments, the first is the error and the result in the second argument. 
These errors are passed to a callback function. 
function fetchData(callback) {
   if (error) {
     callback(error, null);
   } else {
     callback(null, data);
   }
 }
  fetchData((error, data) => {
   if (error) {
     // handle error
   } else {
     // handle success
   }
 });
 
-Async Await
Async Await uses try and catch blocks to handle both synchronous and asynchronous errors, making error handling feel more like traditional synchronous code.
The await keyword is used to  wait for promises to resolve.
The errors are caught using the try and catch blocks. This provides a more synchronous style of error handling, making the code easier to read and understand.
async function fetchData() {
   try {
     const response = await fetch(url);
     // handle success
   } catch (error) {
     // handle error
   }
 }


8. How many arguments does setState take and why is it async.

The setState function takes two arguments:
State object or Function - This holds the new state value which is used in the given component.
Callback function - This argument is an optional callback function that is executed after the state has been updated.

Class components
this.setState(newState, callback);
 Functional components with hooks
const [state, setState] = useState(initialState);

setState is asynchronous because:
Prevents Blocking UI Updates: By processing state updates asynchronously, React ensures that the UI remains responsive and doesn't get blocked by long-running tasks. If state updates were synchronous, complex updates could delay UI rendering, leading to a sluggish user experience. Asynchronous state updates allow React to prioritise rendering and maintain a smooth UI performance, even when handling heavy computations or asynchronous operations.
Supports Concurrent Operations:Asynchronous `setState` enables React to handle concurrent operations more effectively. It allows multiple state updates to be queued and processed independently, without blocking the main execution thread. This concurrency support is crucial for modern web applications, where components often need to handle multiple asynchronous tasks simultaneously, such as data fetching, user interactions, and UI updates. Asynchronous state management ensures that React can efficiently manage these concurrent operations while maintaining UI responsiveness and consistency.


9. List the steps needed to migrate a Class to Function Component.

Steps to migrate a Class component to a Functional component:
-Create a new function component with the same name as the class component.
-Copy the logic from the ‘render()’ method of the class component into the body of the function component. This includes any state variables, props usage, event handlers, and JSX rendering logic.
-Replace the states in the class component  i.e, ‘this.state’ by implementing ‘useState’ hook. 
-Remove lifecycle methods such as `componentDidMount`, `componentDidUpdate`, etc. and use the `useEffect` hook instead.
-If the class component uses HOCs, refactor them using hooks like `useEffect`, `useCallback`, or `useMemo`.
-Update the event handlers to work with functional components. And make use `useState` for state changes in the event handlers.
-If the class component has helper methods, turn them into regular functions outside or inside the function component.
-Remove any `this` references within the functional component.
-Access props directly from functional component parameters.
-Make sure the converted component works as expected. Fix the bugs and refractor it.

10.List a few ways styles can be used with components.
There are several ways styles can be used with components. Some of them are explained below:
-Inline styles : In this, the styles can directly be applied to the elements by making use of the ‘style’ attribute. These are objects with key value pairs that are written in camelCase and string respectively. 

-styled-components : This is a third-party library that provides a seamless integration of styling directly within JavaScript code. Beyond offering a more expressive approach to crafting and managing styles, it facilitates component-based styling, allowing for the encapsulation of styles alongside component logic for improved organisation and reusability. Notably, styled-components support dynamic styling through JavaScript template literals, automatic vendor prefixing for cross-browser compatibility, and prevention of class name collisions by generating unique class names. 

-css modules : This is like a regular CSS file, but it comes with a special feature: when you import it into your component, each CSS class and animation inside the module is scoped locally to that component. This means you can use class names without worrying about them conflicting with names used elsewhere in your app. To use CSS modules, just name your CSS file with the format `filename.module.css`.

11. How to render an HTML string coming from the server.

To render an HTML string coming from the server, we can make use of the ‘dangerouslySetInnerHTML’ attribute. This is used to help react know how to handle the HTML elements in a component where the contents are to be rendered. However, by making use of this the application can be prone to vulnerabilities. To mitigate these risks, there are a few security measures that can be implemented such as :

-Sanitization : before using the ‘dangerouslySetInnerHTML’, make sure to sanitise the HTML string this can be done by making use of some third party libraries like DOMPurify.

-Server-side validation : Implement server-side validation to ensure that the HTML content received from the server is safe and trustworthy. Validate and sanitise user-generated content on the server before sending it to the client.

-Limit Usage: Limit the usage of ‘dangerouslySetInnerHTML’ to trusted sources or admin-managed content. Avoid using it with untrusted user-generated content to minimise the risk of security vulnerabilities. 

