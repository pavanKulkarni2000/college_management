import React from "react";
import { Switch, Route, BrowserRouter, withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import FirstPage from "./FirstPage";
import StudentRouter from "./StudentRouter";
import TeacherRouter from "./TeacherRouter";
import AdminRouter from "./AdminRouter";

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={FirstPage} />
      <Route path="/home/admin" component={AdminRouter} />
      <Route path="/home/student" component={StudentRouter} />
      <Route path="/home/teacher" component={TeacherRouter} />
      <Route
        path="/login/teacher"
        exact
        render={(props) => (
          <SignIn {...props} isTeacher={true} isAdmin={false} />
        )}
      />
      <Route
        path="/login/student"
        exact
        render={(props) => (
          <SignIn {...props} isTeacher={false} isAdmin={false} />
        )}
      />
      <Route
        path="/login/admin"
        exact
        render={(props) => (
          <SignIn {...props} isTeacher={false} isAdmin={true} />
        )}
      />
    </Switch>
  );
}

export default withRouter(Router);
