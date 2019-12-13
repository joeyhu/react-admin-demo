import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { UsersToolbar, UsersTable } from "./components";
// import mockData from "./data";
import { reqApi } from "../../api";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [selectIds, setSelectIds] = useState([]);

  const getUserList = () => {
    reqApi.get("/User/query").then(function(response) {
      setUsers(response.data);
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar
        selectIds={selectIds}
        getUserList={getUserList}
        setSelectIds={setSelectIds}
      />
      <div className={classes.content}>
        <UsersTable users={users} setSelectIds={setSelectIds} />
      </div>
    </div>
  );
};

export default UserList;
