import React, { useState,useEffect } from "react";
import {BrowserRouter as Router, Route, Redirect,Switch} from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";




function App(){

    const [auth, setAuth] = useState(false);
    
    useEffect(() => {
        fetch("https://todolist-backend-cvwo.herokuapp.com/api/auth",{ credentials: 'include'})
            .then((res) => res.json())
            .then((auth) => setAuth(auth.auth));   
      }, []);

      

    return(
        // router paths
       <Router>
            <Switch>
                <Route path = "/" exact>
                    <Home />
                </Route>
                <Route path = "/login" exact>
                    <Login />
                </Route>
                <Route path = "/register" exact>
                    <Register />
                </Route>
                {auth && <Route path = "/dashboard" exact>
                    <Dashboard />
                </Route>}
                {auth && <Route path = "/profile" exact>
                    <Profile />
                </Route>}
            </Switch>
       </Router>
    );
}

export default App;