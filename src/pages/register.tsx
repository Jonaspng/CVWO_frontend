import React, { useState,useEffect } from "react";
import Navbar from "../components/navbar"
import Auth from "../components/auth"
import Error from "../components/error"

function Register(){
    
    const [error,setError] = useState([]);

    // use to fetch possible errors from backend
    useEffect(()  => {
        fetch("https://todolist-backend-cvwo.herokuapp.com/register/error",{credentials: 'include'})
          .then((res)  => res.json())
          .then((error)  => setError(error.error));
      }, []);

    function getMessage(x: string){
        return(
            <Error message = {x}/>
        )
    }
 
    return(
        <div className = "auth-page">
            <Navbar 
                brand = "/"
                item1 = "Login"
                link1 = "/login"
                item2 = "Register"
                link2 = "/register"
                item3 = "Home"
                link3 = "/"
                logout = "hidden"
            />

            {error.map(getMessage)}
            
            <div className = "auth-content" style = {{backgroundImage: "url(/Clean-Desk.jpg)"}}>
                <Auth
                    route = "https://todolist-backend-cvwo.herokuapp.com/users"
                    greetings = "Hello"
                    usernameInput = "form-floating"
                    passwordValidation = "form-floating"
                    btn = "Register"
                 />
            </div>
            
        </div>
        
    );
}

export default Register;