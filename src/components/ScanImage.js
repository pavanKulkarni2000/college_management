import React, { useState } from "react";
import {
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import FileCopySharpIcon from "@material-ui/icons/FileCopySharp";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  out: {
    marginTop: "20px",
  },
});

export default function ScanImage() {
  const classes = useStyles();
  const [image, setImage] = useState();
  const history = useHistory();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    axios
      .post("http://e932da84cc24.ngrok.io/digitize", image)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
          history.push("/");
        } else {
          alert("Sorry!! There is something wrong with the Server");
        }
      });
    setImage();
  };

  return (
    <div className={classes.out}>
      <Typography variant="h4">Upload Image to be Processed</Typography>
      <form onSubmit={handleSubmit}>
        <input
          accept="image/*"
          required
          onChange={handleChange}
          className={classes.input}
          id="icon-button-photo"
          type="file"
        />
        <label htmlFor="icon-button-photo">
          <Paper>input</Paper>
        </label>
        <Button type="submit" variant="contained" color="primary" size="large">
          Submit
        </Button>
      </form>
    </div>
  );
}
