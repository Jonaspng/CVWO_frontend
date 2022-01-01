import { useState,useEffect } from "react";
import Navbar from "../components/navbar"
import Auth from "../components/auth"
import Alert from "../components/alert";

function Register(){
    
    const [error,setError] = useState<string[]>([]);

    function closeAlert(){
        let listOfAlerts = document.getElementsByName("alert-close")!
        for (let i = 0; i < listOfAlerts.length; i++) {
            listOfAlerts[i].click();
        }
    }

    function getMessage(x: string){
        setTimeout(closeAlert, 3000);
        return(
            <Alert 
                alertName = "alert alert-danger alert-dismissible d-flex align-items-center fade show"
                description = {x} 
                iconName = "#exclamation-triangle-fill"
            />
        );
    }

     // use to fetch possible errors from backend
     useEffect(()  => {
        fetch("https://todolist-backend-cvwo.herokuapp.com/register/error",{ credentials: "include" })
          .then((res)  => res.json())
          .then((error)  => setError(error.error));
    }, []);
 
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
            <div className = "alert-bar">
                {error.map(getMessage)}
            </div>
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