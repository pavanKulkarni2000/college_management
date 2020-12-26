import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  typo: {
    margin: "10px",
    padding: "20px",
    color: "#523e02",
  },
});

export default function DepartmentPost({ user }) {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/department/post/all")
      .then((result) => {
        console.log(result.data);
        setPosts(result.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          history.push("/");
        } else {
          console.log(err);
          alert("Sorry!! There is something wrong with the Server");
        }
      });
  }, []);

  const feed = posts.map((post) => (
    <Grid item xs={12} justify="center">
      <Post
        year={post.year}
        key={post.p_id}
        title={post.title}
        message={post.message}
      />
    </Grid>
  ));
  return (
    <Container>
      <Typography variant="h4" align="left" className={classes.typo}>
        {user.d_name} Notice Board
      </Typography>

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {feed}
      </Grid>
    </Container>
  );
}
