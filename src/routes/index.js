import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "../components";
import { Main as MainLayout, Minimal as MinimalLayout } from "../layouts";

import {
  SignIn as SignInView,
  SignUp as SignUpView,
  Dashboard as DashboardView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView,
  UserList as UserListView
} from "../pages";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        isAuth={true}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
