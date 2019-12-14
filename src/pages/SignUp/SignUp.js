import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Link, Typography, Fade } from "@material-ui/core";
import intl from "react-intl-universal";

import { connect } from "react-redux";
import { updateProfile } from "../../redux/actions";
import { reqApi } from "../../api";

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  phone: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  form: {
    margin: "auto",
    maxWidth: 600,
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    margin: theme.spacing(2),
    textAlign: "center"
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  errCon: {
    textAlign: "center",
    margin: theme.spacing(1, 0)
  }
}));

const SignUp = props => {
  const { history, updateProfile } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: { email: "", password: "" },
    touched: {},
    errors: {}
  });
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  // const handleBack = () => {
  //   history.goBack();
  // };

  const handleChange = event => {
    event.persist();
    setErrMsg("");
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignUp = event => {
    event.preventDefault();
    reqApi
      .post("/User/signUp", formState.values)
      .then(function(response) {
        updateProfile(response.data);
        sessionStorage.setItem("token", response.data.sessionFullStr);
        history.push("/");
      })
      .catch(e => {
        setErrMsg(e.response.data.errMsg);
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSignUp}>
        <Typography className={classes.title} variant="h2">
          {intl.get("sign_up")}
        </Typography>
        <TextField
          className={classes.textField}
          error={hasError("name")}
          fullWidth
          helperText={hasError("name") ? formState.errors.name[0] : null}
          label="Name"
          name="name"
          onChange={handleChange}
          type="text"
          value={formState.values.name || ""}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError("email")}
          fullWidth
          helperText={hasError("email") ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          onChange={handleChange}
          type="text"
          value={formState.values.email || ""}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError("phone")}
          fullWidth
          helperText={hasError("phone") ? formState.errors.phone[0] : null}
          label="Phone Number"
          name="phone"
          onChange={handleChange}
          type="text"
          value={formState.values.phone || ""}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError("password")}
          fullWidth
          helperText={
            hasError("password") ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
        <Fade in={errMsg && errMsg.length > 0}>
          <Typography className={classes.errCon} color="error">
            {errMsg}
          </Typography>
        </Fade>
        <Button
          className={classes.signInButton}
          color="primary"
          disabled={!formState.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {intl.get("sign_up")}
        </Button>
        <Typography color="textSecondary" variant="body1">
          Have an account?{" "}
          <Link component={RouterLink} to="/sign-in" variant="h6">
            {intl.get("sign_in")}
          </Link>
        </Typography>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};
export default withRouter(connect(null, { updateProfile })(SignUp));
// export default withRouter(SignUp);
