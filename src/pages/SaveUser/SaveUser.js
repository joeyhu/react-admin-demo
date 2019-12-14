import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/core/styles";
import intl from "react-intl-universal";

import { Button, TextField, Typography, Fade } from "@material-ui/core";

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
    marginTop: theme.spacing(4),
    textAlign: "center"
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  backButton: { margin: theme.spacing(2, 1) },
  errCon: {
    textAlign: "center",
    margin: theme.spacing(1, 0)
  }
}));

const SaveUser = props => {
  const { _id } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: { _id },
    touched: {},
    errors: {}
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);
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

  const handleSaveUser = event => {
    event.preventDefault();
    reqApi
      .post("/User/saveOrUpdate", formState.values)
      .then(function(response) {
        setSuccess(true);
        setFormState(formState => ({
          ...formState,
          values: { ...formState.values, _id: response.data._id }
        }));
      })
      .catch(e => {
        setErrMsg(e.response.data.errMsg);
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSaveUser}>
        <Typography className={classes.title} variant="h2">
          {intl.get(!_id ? "field_add_user" : "field_save_user")}
        </Typography>
        <TextField
          className={classes.textField}
          error={hasError("name")}
          fullWidth
          helperText={hasError("name") ? formState.errors.name[0] : null}
          label={intl.get("field_name")}
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
          label={intl.get("field_email")}
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
          label={intl.get("field_phone")}
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
          label={intl.get("field_password")}
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
        <Fade in={errMsg && errMsg.length > 0}>
          <Typography
            style={{ textAlign: "center" }}
            className={classes.errCon}
            color="error"
          >
            {errMsg}
          </Typography>
        </Fade>

        <Button
          className={classes.signInButton}
          color="primary"
          disabled={!formState.isValid}
          size="large"
          type="submit"
          variant="contained"
        >
          {intl.get("save")}
        </Button>
        <Button
          className={classes.backButton}
          color="primary"
          to="/users"
          component={RouterLink}
          size="large"
          variant="outlined"
        >
          {intl.get("go_back")}
        </Button>
        <Fade in={success}>
          <span style={{ textAlign: "center", color: "green" }}>
            {intl.get("success")}
          </span>
        </Fade>
      </form>
    </div>
  );
};

SaveUser.propTypes = {
  history: PropTypes.object
};
export default withRouter(SaveUser);
