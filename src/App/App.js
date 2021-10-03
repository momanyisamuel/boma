import React from "react";
import { Switch, Route } from "react-router";
import Login from "../pages/Auth/Login";
import Orders from "../pages/Layout/Orders";
import NotFound from "./NotFound";
import "./App.css";
import Inventory from "../pages/Layout/Inventory";
import Products from "../pages/Layout/Products";
import NewOrder from "../pages/Layout/NewOrder";
import Layout from "../pages/Layout/Layout";
import ManageSettings from "../pages/Layout/ManageSettings";
import NewInventory from "../pages/Layout/NewInventory";
import ProtectedRoute from "../helpers/ProtectedRoute";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout>
          <ProtectedRoute exact path="/dashboard" component={Orders} />
          <ProtectedRoute exact path="/purchases" component={Orders} />
          <ProtectedRoute exact path="/purchases/new" component={NewOrder} />
          <ProtectedRoute exact path="/inventory" component={Inventory} />
          <ProtectedRoute
            exact
            path="/inventory/new"
            component={NewInventory}
          />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute exact path="/settings" component={ManageSettings} />
        </Layout>
        <Route exact component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
