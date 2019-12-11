import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  form: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.01
  },
  fileInput: {
    width: "100%",
    height: "100%",
    cursor: "pointer"
  }
}));
const FormUpload = props => {
  const { onSuccess } = props;
  const classes = useStyles();
  let submit = e => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("file", file);
    fetch("/api/File/uploadFiles", {
      method: "POST",
      body: formData //自动将input:file的name属性与文件对象组合成键值对
    })
      .then(res => res.json())
      .then(json => {
        if (onSuccess) {
          onSuccess(json.fileId);
        }
      });
  };

  return (
    <form onSubmit={submit} className={classes.form}>
      <input
        type="file"
        name="file"
        onChange={submit}
        className={classes.fileInput}
      />
    </form>
  );
};

export default FormUpload;
