import React, { useState,useEffect } from "react";
import Navbar from "../components/navbar"
import Auth2 from "../components/auth2"
import Error from "../components/error"


function Login(){

    const [error, setError] = useState([])

    useEffect(() => {
        fetch("https://todolist-backend-cvwo.herokuapp.com/api/error",{withCredentials: true, credentials: 'include'})
          .then((res) => res.json())
          .then((error) => setError(error.error));
      }, []);

    console.log(error)

    function getMessage(x){
    return(
        <Error 
            message={x}/>
        )
    }

    return(
        <div className="auth-page">
            <Navbar 
                brand="/"
                item1="Login"
                link1="/login"
                item2="Register"
                link2="/register"
                item3="Home"
                link3="/"
                logout="hidden"
            />

            {error.map(getMessage)}

            <div className="auth-content" style={{backgroundImage: "url(/Clean-Desk.jpg)"}}>
                <Auth2
                    route = "https://todolist-backend-cvwo.herokuapp.com/api/login"
                    greetings = "Welcome Back!"
                    google = "Sign In With Google"
                    btn = "Login"
                 />
            </div>
            
        </div>
        
    );
}

export default Login;