import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Fade,
  Typography
} from "@material-ui/core";

import { connect } from "react-redux";
import { reqApi } from "../../../../api";
import { updateProfile } from "../../../../redux/actions";
import intl from "react-intl-universal";

const useStyles = makeStyles(() => ({
  root: {}
}));
const schema = {
  confirm: {
    presence: { allowEmpty: false, message: "is required" },
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
const Password = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [values, setValues] = useState({
    password: "",
    confirm: ""
  });
  const [formState, setFormState] = useState({
    isValid: false,
    touched: {},
    errors: {}
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const errors = validate(values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [values]);

  const handleChange = event => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    setErrMsg(
      event.target.name === "confirm"
        ? values.password !== event.target.value
          ? "两次密码输入不一致"
          : ""
        : ""
    );
    setSuccess(false);
  };
  const handleSave = event => {
    event.preventDefault();
    const { password } = values;
    if (!password || !password.length) {
      setErrMsg("密码不能为空");
      return;
    }
    if (values.password !== values.confirm) {
      setErrMsg("两次密码输入不一致");
      return;
    }
    reqApi
      .post("/User/changePassword", { password })
      .then(function(response) {
        setErrMsg("");
        setSuccess(true);
      })
      .catch(e => {
        console.log(e.response.data.errMsg);
        setErrMsg(e.response.data.errMsg);
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSave}>
        <CardHeader
          // subheader={intl.get("update_password")}
          title={intl.get("field_password")}
        />
        <Divider />
        <CardContent>
          <TextField
            error={hasError("password")}
            fullWidth
            helperText={
              hasError("password") ? formState.errors.password[0] : null
            }
            label={intl.get("field_password")}
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label={intl.get("field_confirm_password")}
            name="confirm"
            error={hasError("confirm")}
            onChange={handleChange}
            style={{ marginTop: "1rem" }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" type="submit" variant="contained">
            {intl.get("update")}
          </Button>
          <Fade in={errMsg && errMsg.length > 0}>
            <Typography className={classes.errCon} color="error">
              {errMsg}
            </Typography>
          </Fade>
          <Fade in={Boolean(success)}>
            <Typography className={classes.errCon} color="primary">
              {intl.get("success")}
            </Typography>
          </Fade>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default connect(null, { updateProfile })(Password);
