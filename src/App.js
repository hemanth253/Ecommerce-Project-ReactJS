import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/header.component.jsx";
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignUpAndSignInPage from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // send the user authentication object *every time* until they sign out
    // this is async because we are making api request to firestore
    // Adds an observer for changes to the user's sign-in state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // Instead of const snapShot = await userRef.get(); we can use directly use below one
        // and best pt is the below method attaches a listener for userRef to update this.state when changes are done
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
          // console.log(this.state.currentUser);
        });
      } else {
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignUpAndSignInPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

// For <Route exact path="/" component={HomePage} /> and <Route exact path="/hats" component={HomePage} />
// After history.push("shops/jackets") it removes /hats and replaces to /shop/jackets
// http://localhost:3000/hats to http://localhost:3000/shop/jackets

// For <Route exact path="/" component={HomePage} /> and <Route exact path="/hats" component={HomePage} />
// After history.push("shops/jackets") it removes / and replaces to /shop/jackets
// http://localhost:3000/hats/ to http://localhost:3000/hats/shop/jackets

// http://localhost:3000/ or http://localhost:3000 is same
