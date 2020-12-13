import React,{useState,useEffect} from "react";
import { Switch, Route, BrowserRouter, useHistory} from "react-router-dom";
import Home from "./Home";
import DepartmentPost from "./DepartmentPost";
import Header from './Header';
import ClassPost from "./ClassPost";
import axios from 'axios'
import Placement from "./Placement";
import CreatePlacement from './CreatePlacement'

export default function Router() {

  const history = useHistory()

  const [user,setUser] = useState()
  useEffect(() => {
    axios.get('/getUser')
        .then(result=>{
            setUser(result.data)       
        })
        .catch(err=>{
            if(err.response && err.response.status === 400)
                history.push('/')
            else
                alert('There is something wrong with the server')    
        })    
  },[])

  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Switch>
          <Route path="/home/student/" exact render={props=><Home {...props} student={user}/>} />
          <Route path="/home/student/department" exact render={(props)=><DepartmentPost  {...props} student={user}/>}/>
          <Route path="/home/student/class" exact render={props=><ClassPost {...props} student={user} />}/>
          <Route path="/home/student/placement" exact render={props=><Placement {...props} student={user} />}/>
          <Route path="/home/student/creation" exact render={props=><CreatePlacement {...props} student={user} />}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}
