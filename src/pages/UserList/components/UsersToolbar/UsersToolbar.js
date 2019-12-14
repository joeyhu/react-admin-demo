import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, Fade, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import intl from "react-intl-universal";

import { reqApi } from "../../../../api";

// import { SearchInput } from "components";

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, selectIds, setSelectIds, getUserList, ...rest } = props;
  const [success, setSuccess] = useState(false);

  const classes = useStyles();
  const delUser = () => {
    reqApi
      .post("/User/delMore", { ids: selectIds.join(",") })
      .then(function(response) {
        getUserList();
        setSelectIds([]);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Button
          color="primary"
          component={RouterLink}
          className={classes.importButton}
          to="/save-user"
          variant="contained"
        >
          {intl.get("field_add_user")}
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          disabled={selectIds.length === 0}
          className={classes.importButton}
          onClick={delUser}
        >
          {intl.get("delete")}
        </Button>
        <Fade
          className={classes.importButton}
          in={selectIds && selectIds.length > 0}
        >
          <Typography className={classes.errCon} color="primary">
            选择 {selectIds && selectIds.length} 条数据
          </Typography>
        </Fade>
        <Fade className={classes.importButton} in={success}>
          <Typography color="primary">{intl.get("success")}</Typography>
        </Fade>

        <span className={classes.spacer} />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
