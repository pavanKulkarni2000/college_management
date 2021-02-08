import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Button,
  Icon,
} from "@material-ui/core";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  out: {
    marginTop: "20px",
  },
  typo: {
    margin: "10px",
    padding: "10px",
  },
  icon: {
    height: "70%",
    width: "70%",
  },
  img: {
    height: "100%",
    width: "100%",
  },
});

const baseStyle = {
  flex: 1,
  display: "flex",
  height: "40vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 4,
  borderRadius: 2,
  borderColor: "#32a877",
  borderStyle: "dashed",
  backgroundColor: "#e6e6e6",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function ScanImage({ user }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*,.pdf" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const files = acceptedFiles.map((file) => (
    <Typography variant="subtitle1" key={file.path}>
      {file.name}
    </Typography>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", acceptedFiles[0]);
    fd.append("id", user.i_id);
    console.log("trying to post");
    trackPromise(
      axios
        .post("http://3a0e5ae9a3fa.ngrok.io/digitize", fd, {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          console.log(results.data);
          alert("digitization successfull!!")
          
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data);
            history.push("/");
          } else {
            alert("Sorry!! There is something wrong with the Server");
          }
        })
    );
  };

  if (!user) {
    return <Redirect to="/home/teacher" />;
  }
  return (
    <div className={classes.out}>
      <Typography className={classes.typo} variant="h4">
        Upload Image to be Processed
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div {...getRootProps({ className: "dropzone", style })}>
            <input {...getInputProps()} required />
            <Icon className={classes.icon}>
              <img className={classes.img} src="/assets/upload.svg" />
            </Icon>
            <p>Drag or click to select file -( image or pdf )</p>
          </div>
          <aside>
            <Typography variant="h6">File</Typography>
            {files}
          </aside>
        </div>
        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" size="large">
          Submit
        </Button>
      </form>
    </div>
  );
}
