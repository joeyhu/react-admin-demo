import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState("female");

  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader title="选择语言" />
        <Divider />
        <CardContent>
          <Grid className={classes.item} item md={4} sm={6} xs={12}>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="简体中文"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="English"
              />
            </RadioGroup>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
