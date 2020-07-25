import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen.jsx";
import RentIn from "./pages/RentIn.jsx";
import RentOut from "./pages/RentOut.jsx";
import PayRent from "./pages/PayRent.js";
import EndContract from "./pages/EndContract";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact>
        <HomeScreen />
      </Route>
      <Route path="/rentin" exact>
        <RentIn />
      </Route>
      <Route path="/rentout" exact>
        <RentOut />
      </Route>
      <Route path="/payrent" exact>
        <PayRent />
      </Route>
      <Route path="/endcontract" exact>
        <EndContract />
      </Route>
      <Route exact path="" render={() => <Redirect to="/home" />} />
    </Switch>
  </BrowserRouter>
);

export default Router;
