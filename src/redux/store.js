import { createStore, applyMiddleware } from "redux";

// it allows browser to cache store depending on certain configuration options that we set
import { persistStore } from "redux-persist";

import logger from "redux-logger";

// since combineReducers is an export default we can use any name while importing.
import rootReducer from "./root-reducer";

const middlewares = [logger];

// A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// new persisted version of store
export const persistor = persistStore(store);

// Middleware lets you wrap the store's dispatch method for fun and profit
// ...middleware (arguments): Functions that conform to the Redux middleware API. Each middleware receives Store's dispatch and getState functions as named arguments, and returns a function.
// applyMiddleware: A store enhancer that applies the given middleware. The store enhancer signature looks like createStore => createStore
