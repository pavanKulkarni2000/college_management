import React, { useState, useEffect } from "react";
import EditStudent from "./EditStudent";
import Header from "./Header";
import { makeStyles, Switch } from "@material-ui/core";
import EditTeacher from "./EditTeacher";
import StudentCourse from "./StudentCourse";
import AdminNav from "./AdminNav";
import { Route, useHistory } from "react-router-dom";
import AddCourse from "./AddCourse";
import axios from "axios";
import Loading from "./Loading";
import { trackPromise } from "react-promise-tracker";

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
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    trackPromise(
      axios
        .get("/getUser/admin", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setUser(results.data);
          console.log(user);
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
  }, []);

  return (
    <div className={classes.root}>
      <Header user={user} />
      <AdminNav />
      <main className={classes.content}>
        <Route path="/home/admin/" exact component={EditStudent} />
        <Route path="/home/admin/teacher/" exact component={EditTeacher} />
        <Route path="/home/admin/register/" exact component={StudentCourse} />
        <Route path="/home/admin/course/" exact component={AddCourse} />
        <Loading />
      </main>
    </div>
  );
}
