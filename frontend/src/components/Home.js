import React, { useState, useEffect } from "react";
import BigButton from "./BigButton";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiChalkboard } from "react-icons/bi";
import { AiTwotoneNotification, AiOutlineLogout } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { BsPencilSquare } from "react-icons/bs";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "70%",
    width: "70%",
  },
  container: {
    height: "90vh",
  },
  grid: {
    height: "90vh",
  },
});

const lgColumns = 4;

export default function Home({ user }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Container className={classes.container}>
        <Grid
          container
          spacing={5}
          justify="center"
          alignItems="center"
          className={classes.grid}
        >
          <Grid item lg={lgColumns}>
            <BigButton
              component={
                <Icon className={classes.root}>
                  <img src="/assets/department.svg" />
                </Icon>
              }
              title={"Notice Board"}
              link="/home/student/department"
            />
          </Grid>
          <Grid item lg={lgColumns}>
            <BigButton
              component={
                <Icon className={classes.root}>
                  <img src="/assets/classroom.svg" />
                </Icon>
              }
              title={"Class Post"}
              link={"/home/student/class"}
            />
          </Grid>
          <Grid item lg={lgColumns}>
            <BigButton
              component={
                <Icon className={classes.root}>
                  <img src="/assets/placement.svg" />
                </Icon>
              }
              title={"Placement"}
              link={"/home/student/placement"}
            />
          </Grid>
          <Grid item lg={lgColumns}>
            <BigButton
              component={
                <Icon className={classes.root}>
                  <img src="/assets/notes.svg" />
                </Icon>
              }
              title={"Course Notes"}
            />
          </Grid>
          {user && user.is_spc ? (
            <Grid item lg={lgColumns}>
              <BigButton
                component={
                  <Icon className={classes.root}>
                    <img src="/assets/create.svg" />
                  </Icon>
                }
                title={"Add Company"}
                link={"/home/student/creation"}
              />
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      </Container>
    </div>
  );
}
