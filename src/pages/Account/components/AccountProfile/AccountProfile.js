import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { UploadFile } from "../../../../components";
import { updateProfile } from "../../../../redux/actions";
import { reqApi } from "../../../../api";
import { getInitials } from "../../../../helpers";
import intl from "react-intl-universal";

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: "flex"
  },
  avatarCon: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    position: "relative"
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));
const mapStateToProps = state => {
  // const { visibilityFilter } = state;
  // let profile = { name: "joey" };
  return state;
};
const AccountProfile = props => {
  const { className, profile, updateProfile, ...rest } = props;

  const classes = useStyles();

  const uploadSuccess = fileId => {
    reqApi
      .post("/User/setProfile", { avatar: `/api/File/getFile?_id=${fileId}` })
      .then(function(response) {
        updateProfile(response.data);
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {profile.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {profile.email}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {profile.phone}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {profile.address}
            </Typography>
          </div>
          <div className={classes.avatarCon}>
            <Avatar className={classes.avatar} src={profile.avatar}>
              {getInitials(profile.name)}
            </Avatar>
            <UploadFile onSuccess={uploadSuccess} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps, { updateProfile })(AccountProfile);
