import React, {useState,useEffect} from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

function App(){

    const [auth, setAuth] = useState();
    
    async function updateAuth(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/auth",{credentials: 'include'})
                    .then((res) => res.json())
                    .then((auth) => setAuth(auth.auth))}; 
                    
    function routes(){
        // with new version of react-router-dom
        // below is the new syntax
        // <BrowserRouter>
        //         <Routes>
        //         <Route path="/" element={<App />} />
        //         <Route path="/expenses" element={<Expenses />} />
        //         <Route path="/invoices" element={<Invoices />} />
        //     </Routes>
        // </BrowserRouter>
        useEffect(() => {updateAuth()}, []);
        console.log(auth)
        if (auth == "true"){
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
                        <Redirect to ="/dashboard"/>
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
                        <Redirect to ="/" />
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