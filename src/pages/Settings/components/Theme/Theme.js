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
  Switch
} from "@material-ui/core";
import { connect } from "react-redux";
import { updateSetting } from "../../../../redux/actions";
import intl from "react-intl-universal";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Theme = props => {
  const { className, setting, updateSetting, ...rest } = props;

  const classes = useStyles();
  const { dark } = setting;

  const handleChange = event => {
    updateSetting({ ...setting, dark: !dark });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader title={intl.get("theme")} />
        <Divider />
        <CardContent>
          <Grid className={classes.item} item md={4} sm={6} xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={dark}
                  onChange={handleChange}
                  value="checkedB"
                  color="primary"
                />
              }
              label={
                setting.dark ? intl.get("theme_dark") : intl.get("theme_light")
              }
            />
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

Theme.propTypes = {
  className: PropTypes.string
};

export default connect(state => state, { updateSetting })(Theme);
