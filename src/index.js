import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store.js";

import "./index.css";
import App from "./App";

ReactDOM.render(
  // The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.
  // provider is this component class that we get from react redux that once passed the store object then will be able to give that redux store context to the rest of the application
  // We pass store because we can 1) dispatch actions to that store or 2) pull values off the store into our component.
  // All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
  <Provider store={store}>
    {/* whenever the browser refreshes the persistGate fire actions that redyhrade state*/}
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// We need everything(App) to get access to store object that we get from Redux
// This provider is a component that is the parent of everything inside of our application.And as the parent, it allows us to get access to all of the things related to the store that we're going to put all of the actual code we want to store on our redux state.

// PERSIST :
// first persist action coming from the Persist Library is checking whether or not anything exists.And then if it does, it will fire off this new action:-
// that rehydrate the state with whatever it is that we've stored inside of our preferred means of storage.
