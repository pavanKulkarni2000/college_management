import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/School";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWrong, setWrong] = useState(false);

  let text = " SIGN IN";
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    if (props.isAdmin) {
      trackPromise(
        axios
          .post(
            "auth/admin",
            { email, password },
            {
              headers: { "x-auth-token": localStorage["x-auth-token"] },
            }
          )
          .then((result) => {
            localStorage.setItem("x-auth-token", result.data.token);
            setWrong(false);
            history.push("/home/admin");
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) setWrong(true);
            else {
              console.log(err);
              alert("Sorry There is something wrong with the server");
            }
          })
      );
    } else if (props.isTeacher) {
      trackPromise(
        axios
          .post(
            "auth/instructor",
            { email, password },
            {
              headers: { "x-auth-token": localStorage["x-auth-token"] },
            }
          )
          .then((result) => {
            localStorage.setItem("x-auth-token", result.data.token);
            setWrong(false);
            history.push("/home/teacher");
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response && err.response.status === 400) setWrong(true);
            else {
              console.log(err);
              alert("Sorry There is something wrong with the server");
            }
          })
      );
    } else {
      trackPromise(
        axios
          .post(
            "auth/student",
            { email, password },
            {
              headers: { "x-auth-token": localStorage["x-auth-token"] },
            }
          )
          .then((result) => {
            localStorage.setItem("x-auth-token", result.data.token);
            setWrong(false);
            history.push("/home/student");
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) setWrong(true);
            else {
              console.log(err);
              alert("Sorry There is something wrong with the server");
            }
          })
      );
    }
  };

  if (props.isAdmin) text = "ADMIN" + text;
  else if (props.isTeacher) text = "TEACHER" + text;
  else text = "STUDENT" + text;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {isWrong ? (
            <Typography color="secondary" variant="subtitle1">
              *Wrong Email or Password
            </Typography>
          ) : (
            <br />
          )}
          <Loading />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/reset">Forgot password?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
