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
  // const [icon, setIcon] = useState("/images/avatars/avatar_11.png");
  // const user = {
  //   name: "Joey",
  //   city: "Hu",
  //   country: "CN",
  //   timezone: "GTM-7",
  //   avatar: "/images/avatars/avatar_11.png"
  // };

  const classes = useStyles();

  const uploadSuccess = fileId => {
    console.log("......", fileId);
    // setIcon(`/api/File/getFile?_id=${fileId}`);
    updateProfile({ icon: `/api/File/getFile?_id=${fileId}` });
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
              {profile.address}
            </Typography>
          </div>
          <div className={classes.avatarCon}>
            <Avatar className={classes.avatar} src={profile.icon} />
            <UploadFile onSuccess={uploadSuccess} />
          </div>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div>
      </CardContent>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps, { updateProfile })(AccountProfile);
