import React, { useState,useEffect } from "react";
import {BrowserRouter as Router, Route, Redirect,Switch} from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";




function App(){

    const [auth, setAuth] = useState(false);
    
    const updateAuth = async () => {
                        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/auth",{ credentials: 'include'})
                            .then((res) => res.json())
                            .then((auth) => setAuth(auth.auth))};   

    useEffect(() => {updateAuth()}, []);
    
    console.log(auth);

    function routes(){
        if (auth){
            return (
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
                        <Route path = "/dashboard" exact>
                            <Dashboard />
                        </Route>
                        <Route path = "/profile" exact>
                            <Profile />
                        </Route>
                    </Switch>
                </Router>);
        } else {
            return (
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
                    </Switch>
           </Router>)
        }
    }

      

    return(
        // router paths
        routes()
       
    );
}

export default App;