import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/header.component.jsx";
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignUpAndSignInPage from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.jsx";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/signin" component={SignUpAndSignInPage} />
      </Switch>
    </div>
  );
}

export default App;

// For <Route exact path="/" component={HomePage} /> and <Route exact path="/hats" component={HomePage} />
// After history.push("shops/jackets") it removes /hats and replaces to /shop/jackets
// http://localhost:3000/hats to http://localhost:3000/shop/jackets

// For <Route exact path="/" component={HomePage} /> and <Route exact path="/hats" component={HomePage} />
// After history.push("shops/jackets") it removes / and replaces to /shop/jackets
// http://localhost:3000/hats/ to http://localhost:3000/hats/shop/jackets

// http://localhost:3000/ or http://localhost:3000 is same
