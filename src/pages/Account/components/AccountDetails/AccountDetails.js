import React, { useState, useEffect } from "react";
import clsx from "clsx";
import validate from "validate.js";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Fade,
  Typography
} from "@material-ui/core";

import { connect } from "react-redux";
import { updateProfile } from "../../../../redux/actions";
import { reqApi } from "../../../../api";
import intl from "react-intl-universal";

const useStyles = makeStyles(() => ({
  root: {}
}));
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
  }
};
const AccountDetails = props => {
  const { className, profile, updateProfile, ...rest } = props;
  const classes = useStyles();
  const { name, email, phone } = profile;
  console.log(name, email, phone);

  const [formState, setFormState] = useState({
    isValid: false,
    values: { name, email, phone },
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

  const handleChange = event => {
    event.persist();
    setErrMsg(false);
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
  const handleSave = event => {
    event.preventDefault();
    reqApi
      .post("/User/setProfile", formState.values)
      .then(function(response) {
        updateProfile(response.data);
      })
      .catch(e => {
        setErrMsg(e.response.data.errMsg);
      });
  };
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="on" onSubmit={handleSave}>
        <CardHeader title={intl.get("sidebar_account")} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.textField}
                error={hasError("email")}
                fullWidth
                helperText={
                  hasError("email") ? formState.errors.email[0] : null
                }
                label={intl.get("field_email")}
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.textField}
                error={hasError("phone")}
                fullWidth
                helperText={
                  hasError("phone") ? formState.errors.phone[0] : null
                }
                label={intl.get("field_phone")}
                name="phone"
                onChange={handleChange}
                type="text"
                value={formState.values.phone || ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            disabled={!formState.isValid}
            type="submit"
            variant="contained"
          >
            {intl.get("save")}
          </Button>
          <Fade in={errMsg && errMsg.length > 0}>
            <Typography className={classes.errCon} color="error">
              {errMsg}
            </Typography>
          </Fade>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};
const mapStateToProps = state => {
  // const { visibilityFilter } = state;
  // let profile = { name: "joey" };
  return state;
};
export default connect(mapStateToProps, { updateProfile })(AccountDetails);
