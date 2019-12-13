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
import { connect } from "react-redux";
import { updateSetting } from "../../../../redux/actions";
import { SUPPOER_LOCALES } from "../../../../locales";
import intl from "react-intl-universal";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Language = props => {
  const { className, setting, updateSetting, ...rest } = props;
  const { language } = setting;
  const classes = useStyles();

  const handleChange = event => {
    updateSetting({ ...setting, language: event.target.value });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader title={intl.get("select_language")} />
        <Divider />
        <CardContent>
          <Grid className={classes.item} item md={4} sm={6} xs={12}>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={language}
              onChange={handleChange}
            >
              {SUPPOER_LOCALES.map(v => (
                <FormControlLabel
                  value={v.value}
                  control={<Radio color="primary" />}
                  label={v.name}
                />
              ))}
            </RadioGroup>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

Language.propTypes = {
  className: PropTypes.string
};
export default connect(state => state, { updateSetting })(Language);
