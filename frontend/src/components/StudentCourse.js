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
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState();
  const [course, setCourse] = useState();
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    trackPromise(
      axios
        .get("/student", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setStudents(results.data);
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
    trackPromise(
      axios
        .get("/course/all", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          console.log(results.data);
          setCourses(results.data);
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
      s_id: student,
      c_id: course,
    };
    trackPromise(
      axios
        .post("/course/register", body, {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          alert("Student registration for course Successful!");
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
        <Typography variant="h5">Register Student For Course</Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            className={classes.textField}
            select
            required
            fullWidth
            value={student}
            label="Student"
            onChange={(e) => setStudent(e.target.value)}
            variant="outlined"
            helperText="Choose Student"
          >
            {students.map((s) => (
              <MenuItem value={s.s_id}>
                <Typography>{s.name}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            required
            fullWidth
            className={classes.textField}
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            variant="outlined"
            helperText="Choose Course"
          >
            {courses.map((c) => (
              <MenuItem value={c.c_id}>
                <Typography>{c.name}</Typography>
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
