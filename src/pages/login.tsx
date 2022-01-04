import { useState,useEffect } from "react";
import Navbar from "../components/navbar"
import Alert from "../components/alert";
import Auth from "../components/auth";


function Login(){
    
    //react hooks

    // the below password hook is just to make sure the console does not have any error
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string[]>([])

    useEffect(() => {
        fetch("https://todolist-backend-cvwo.herokuapp.com/api/error",{credentials: "include"})
          .then((res) => res.json())
          .then((error) => setError(error.error));
      }, []);

    
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

    return(
        <div className="auth-page">
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
                    route = "https://todolist-backend-cvwo.herokuapp.com/api/login"
                    greetings= "Welcome Back!"
                    btn = "Login"
                    usernameInput = "hidden"
                    passwordValidation = "hidden"
                    click = {false}
                    validation = "form-control" 
                    emailInputName = "email"
                    passwordInputName = "password"
                    validationMessageClass = "hidden"
                    setPassword = {setPassword}           
                />
            </div>
        </div>
    );
}

export default Login;