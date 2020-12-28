import React, { useState, useEffect } from "react";
import CreateClassPost from "./CreateClassPost";
import Header from "./Header";
import { makeStyles, useFormControl, Switch } from "@material-ui/core";
import CreateDeptPost from "./CreateDeptPost";
import axios from "axios";
import { useHistory, Route, withRouter } from "react-router-dom";
import TeacherNav from "./TeacherNav";
import TeacherPost from "./TeacherPost";
import ScanImage from "./ScanImage";
import GetObjects from "./GetObjects";
import Loading from "./Loading";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    margin: "30px",
    marginTop: "50px",
    padding: "20px",
  },
}));

function TeacherRouter() {
  const classes = useStyles();
  const history = useHistory();
  const [teacher, setTeacher] = useState();

  useEffect(() => {
    trackPromise(
      axios
        .get("/getUser/teacher/", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setTeacher(results.data);
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
      <Header user={teacher} />
      <TeacherNav user={teacher} />
      <main className={classes.content}>
        <Route
          path="/home/teacher/department"
          exact
          render={(props) => <CreateDeptPost user={teacher} />}
        />
        <Route
          path="/home/teacher/post"
          exact
          render={(props) => <TeacherPost {...props} user={teacher} />}
        />
        <Route path="/home/teacher" exact component={CreateClassPost} />
        <Route
          path="/home/teacher/scan"
          exact
          render={(props) => <ScanImage {...props} user={teacher} />}
        />
        <Route
          path="/home/teacher/getObjects"
          exact
          render={(props) => <GetObjects {...props} user={teacher} />}
        />
        <Loading />
      </main>
    </div>
  );
}

export default TeacherRouter;
