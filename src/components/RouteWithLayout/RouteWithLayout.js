import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, isAuth, ...rest } = props;
  const notLogin = sessionStorage.getItem("isLogin") !== "1";
  return (
    <Route
      {...rest}
      render={matchProps =>
        isAuth && notLogin ? (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location }
            }}
          />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
