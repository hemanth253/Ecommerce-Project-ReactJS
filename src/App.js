import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import "./App.css";
import Header from "./components/header/header.component.jsx";
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignUpAndSignInPage from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    // here if we console.log(setCurrentUser) it gives function (user) => dispatch(setCurrentUser(user))
    // so this.props is an object inside mapDispatchToProps
    const { setCurrentUser } = this.props;

    // send the user authentication object *every time* until they sign out
    // this is async because we are making api request to firestore
    // Adds an observer for changes to the user's sign-in state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // Instead of const snapShot = await userRef.get(); we can use directly use below one
        // and best pt is the below method attaches a listener for userRef to update this.state when changes are done
        userRef.onSnapshot((snapShot) => {
          // this uses the
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  // We want to close subscriptions because we dont want any memory leaks in js Application
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* we can have routes like .shop/hats,.... - so exact not required */}
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignUpAndSignInPage />
              )
            }
          />
          {/* <Route exact path="/signin" component={SignUpAndSignInPage} /> */}
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // dispatch - it is a way for Redux to know that whatever you're passing me is going to be an action object that I'm going to pass to every reducer.
  // dispatch is given by connect as argument to mapDispatchToProps.This way to trigger a state change.
  // MyNote : Dispatch is actualy a method in store--> store.dispatch(action)
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// through connect the function is passed as prop obj to component since it is Higher order component.
// With React Redux, your components never access the store directly - connect does it for you.
export default connect(mapStateToProps, mapDispatchToProps)(App);

// For <Route exact path="/" component={HomePage} /> and <Route exact path="/hats" component={HomePage} />
// After history.push("shops/jackets") it removes /hats and replaces to /shop/jackets
// http://localhost:3000/hats to http://localhost:3000/shop/jackets

// For <Route exact path="/" component={HomePage} /> and <Route exact path="/hats" component={HomePage} />
// After history.push("shops/jackets") it removes / and replaces to /shop/jackets
// http://localhost:3000/hats/ to http://localhost:3000/hats/shop/jackets

// http://localhost:3000/ or http://localhost:3000 is same

//---------------this.props similarity-----------------------
// const fun1 = () => ({
//   setCurrentUser: (user) => fun2(user),
// });
// const fun2=(user)=>({name:user})
// fun1().setCurrentUser("Hemanth")
