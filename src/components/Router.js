import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import SignIn from "./SignIn";
import Home from "./Home";
import FirstPage from "./FirstPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FirstPage} />
        <Route path="/login/teacher"  exact render={(props)=> <SignIn {...props} isTeacher={true}/>} />
        <Route path="/login/student"  exact render={(props)=><SignIn {...props} isTeacher={false}/>} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
