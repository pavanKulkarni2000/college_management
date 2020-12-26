import React from "react";
import EditStudent from "./EditStudent";
import Header from "./Header";
import { makeStyles, Switch } from "@material-ui/core";
import EditTeacher from "./EditTeacher";
import StudentCourse from "./StudentCourse";
import AdminNav from "./AdminNav";
import { Route } from "react-router-dom";
import AddCourse from "./AddCourse";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    margin: "20px",
    marginTop: "60px",
    padding: "20px",
  },
}));

export default function TeacherRouter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <AdminNav />
      <main className={classes.content}>
        <Route path="/home/admin/" exact component={EditStudent} />
        <Route path="/home/admin/teacher/" exact component={EditTeacher} />
        <Route path="/home/admin/register/" exact component={StudentCourse} />
        <Route path="/home/admin/course/" exact component={AddCourse} />
      </main>
    </div>
  );
}
