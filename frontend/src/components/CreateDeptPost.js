import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  makeStyles,
  Paper,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "30px",
    padding: "20px",
    display: "inline-block",
    width: "60%",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CreateClassPost({ user }) {
  const years = [1, 2, 3, 4];
  const [year, setYear] = useState();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      year,
      message: message,
      title: title,
    };
    trackPromise(
      axios
        .post("/department/post", data, {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setTitle("");
          setMessage("");
          setYear();
          alert("This post has been put up in the department feed");
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

  const items = years.map((c) => (
    <MenuItem key={c} value={c}>
      {c}
    </MenuItem>
  ));

  if (user && user.is_hod) {
    return (
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h5">
          Create Department Post - {user.d_name}
        </Typography>
        <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <TextField
              variant="outlined"
              fullWidth
              select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              label="Year"
              helperText="Enter the year from 1 to 4"
              required
            >
              {items}
            </TextField>
          </div>
          <div>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText="Enter the title for the post"
              required
            />
          </div>
          <div>
            <TextField
              fullWidth
              multiline
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              label="Message"
              helperText="Enter the message"
              required
              rows={5}
            />
          </div>
          <br />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            POST
          </Button>
          <br />
        </form>
      </Paper>
    );
  } else {
    return <Redirect to="/home/teacher" />;
  }
}
