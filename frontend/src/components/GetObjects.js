import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles({
  typo: {
    margin: "10px",
    padding: "20px",
    color: "#523e02",
  },
  item: {
    margin: "20px",
    padding: "20px",
  },
});

export default function GetObjects({ user }) {
  const classes = useStyles();

  const history = useHistory();

  const [records, setRecords] = useState([]);
  useEffect(() => {
    if (!user) return;
    const url = `http://db569d1cea9d.ngrok.io/digitize/${user.i_id}`;
    trackPromise(
      axios
        .get(url, {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setRecords(results.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data);
            history("/");
          } else {
            alert("Sorry!! There is something wrong with the Server");
          }
        })
    );
  }, []);
  const open = "{";
  const close = "}";
  const elements = records.map((c) => {
    if (typeof c === "string") {
      return (
        <Grid item xs={12}>
          <Paper className={classes.item} variant="outlined">
            <Typography>{c}</Typography>
          </Paper>
        </Grid>
      );
    }
    return (
      <Grid item xs={12}>
        <Paper className={classes.item} variant="outlined">
          <Typography align="left">{open}</Typography>
          {Object.keys(c).map((key) => (
            <Typography>
              {key} : {c[key]}
            </Typography>
          ))}
          <Typography align="left">{close}</Typography>
        </Paper>
      </Grid>
    );
  });

  if (!user) {
    <Redirect to="/home/teacher/" />;
  }
  return (
    <Container>
      <Typography variant="h4" align="left" className={classes.typo}>
        See Information Stored
      </Typography>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {elements}
      </Grid>
    </Container>
  );
}
