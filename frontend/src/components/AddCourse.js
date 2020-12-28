import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Typography,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles({
  paper: {
    width: "70%",
    padding: "20px",
    justifyContent: "center",
    margin: "10px",
  },
  textField: {
    width: "80%",
    margin: "10px",
  },
  button: {
    width: "80%",
  },
});

export default function StudentCourse() {
  const [depts, setDepts] = useState([]);
  const [dept, setDept] = useState();
  const [course, setCourse] = useState();
  const [c_code, setC_code] = useState();

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    trackPromise(
      axios
        .get("/department", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setDepts(results.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert("You are not logged in!");
            history.push("/");
          } else {
            alert("Sorry There is something wrong with the server");
          }
        })
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: course,
      c_code: c_code,
      d_id: dept,
    };
    trackPromise(
      axios
        .post("/course/add", body, {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          alert("Course Added Successfully!");
          window.location.reload(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data);
          } else {
            console.log(err);
            alert("Sorry!! There is something wrong with the Server");
          }
        })
    );
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5">Add New Course</Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            className={classes.textField}
            required
            fullWidth
            value={course}
            label="Course Name"
            onChange={(e) => setCourse(e.target.value)}
            variant="outlined"
            helperText="Name of the course"
          />
          <TextField
            className={classes.textField}
            required
            fullWidth
            value={c_code}
            label="Course Code"
            onChange={(e) => setC_code(e.target.value)}
            variant="outlined"
            helperText="Set Course Code"
          />
          <TextField
            select
            required
            fullWidth
            className={classes.textField}
            label="Department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            variant="outlined"
            helperText="Select Department"
          >
            {depts.map((d) => (
              <MenuItem value={d.d_id}>
                <Typography>{d.d_name}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            SUBMIT
          </Button>
        </form>
      </Paper>
    </React.Fragment>
  );
}
