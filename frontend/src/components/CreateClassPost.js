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
import { useHistory } from "react-router-dom";
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

export default function CreateClassPost() {
  const [courses, setCourses] = useState([]);
  const history = useHistory();
  const [course, setCourse] = useState();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const classes = useStyles();

  useEffect(() => {
    trackPromise(
      axios
        .get("/course", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setCourses(results.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.sqlMessage);
            history.push("/");
          } else {
            alert("Sorry!! There is something wrong with the Server");
          }
        })
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      c_id: course,
      message: message,
      title: title,
    };
    trackPromise(
      axios
        .post("/course/post", data, {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setCourse();
          setTitle("");
          setMessage("");
          alert("This post has been put up in the class feed");
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert("Sorry You are not logged in!");
            history.push("/");
          } else {
            alert("Sorry!! There is something wrong with the Server");
          }
        })
    );
  };

  const items = courses.map((c) => (
    <MenuItem key={c.c_id} value={c.c_id}>
      {c.name}
    </MenuItem>
  ));
  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography variant="h5">Create Class Post</Typography>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <TextField
            variant="outlined"
            fullWidth
            select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            label="Course"
            helperText="Enter the Course for which you want to put the message"
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
}
