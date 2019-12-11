import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Link, Typography, Fade } from "@material-ui/core";

// import { connect } from "react-redux";
// import { signIn } from "../../redux/actions";

// import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
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

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: { email: "joey@gmail.com", password: "joey" },
    touched: {},
    errors: {}
  });

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
    setError(false);
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

  const handleSignIn = event => {
    event.preventDefault();
    // const { email, password } = formState.values;
    // signIn({ email, password });
    //setError(true);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const [error, setError] = React.useState(false);

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSignIn}>
        <Typography className={classes.title} variant="h2">
          Sign in
        </Typography>
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
        <Fade in={error}>
          <Typography className={classes.errCon} color="error">
            用户名或密码错误！
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
          Sign in now
        </Button>
        <Typography color="textSecondary" variant="body1">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/sign-up" variant="h6">
            Sign up
          </Link>
        </Typography>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

// export default withRouter(connect(null, { signIn })(SignIn));
export default withRouter(SignIn);
