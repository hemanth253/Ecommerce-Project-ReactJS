import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// since combineReducers is an export default we can use any name while importing.
import rootReducer from "./root-reducer";

const middlewares = [logger];

// A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

// Middleware lets you wrap the store's dispatch method for fun and profit
// ...middleware (arguments): Functions that conform to the Redux middleware API. Each middleware receives Store's dispatch and getState functions as named arguments, and returns a function.
// applyMiddleware: A store enhancer that applies the given middleware. The store enhancer signature looks like createStore => createStore
