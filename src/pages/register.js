import React, { useState,useEffect } from "react";
import Navbar from "../components/navbar"
import Auth from "../components/auth"
import Error from "../components/error"

function Register(){
    
    const [error,setError] = useState([]);

  
    useEffect(() => {
        fetch("https://todolist-backend-cvwo.herokuapp.com/register/error",{ withCredentials: true, credentials: 'include'})
          .then((res) => res.json())
          .then((error) => setError(error.error));
      }, []);

    function getMessage(x){
        return(
            <Error message={x}/>
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
                <Auth
                    route="https://todolist-backend-cvwo.herokuapp.com/users"
                    greetings="Hello"
                    google="Sign up With Google"
                    name="form-floating"
                    confirmPassword="form-floating"
                    btn="Register"
                 />
            </div>
            
        </div>
        
    );
}

export default Register;