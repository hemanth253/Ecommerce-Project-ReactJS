import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
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
