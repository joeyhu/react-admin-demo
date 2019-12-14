import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "../components";
import { Main as MainLayout } from "../layouts";

import {
  SignIn as SignInView,
  SignUp as SignUpView,
  Dashboard as DashboardView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView,
  UserList as UserListView,
  SaveUser as SaveUserView
} from "../pages";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={DashboardView}
        exact
        isAuth={true}
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        isAuth={true}
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={SaveUserView}
        exact
        isAuth={true}
        layout={MainLayout}
        path="/save-user"
      />

      <RouteWithLayout
        component={SignInView}
        exact
        layout={MainLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MainLayout}
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
        isAuth={true}
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
