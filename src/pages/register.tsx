import { useState,useEffect } from "react";
import Navbar from "../components/navbar"
import Auth from "../components/auth"
import Alert from "../components/alert";

function Register(){
    
    const [error,setError] = useState<string[]>([]);

    const [name, setName]  =  useState<string>("");

    const [password, setPassword]  =  useState<string>("");

    const [confirmPassword, setConfirmPassword]  =  useState<string>("");

    const [validation, setValidation]  =  useState<string>("form-control");

    const [validationMessageClass, setValidationMessageClass] = useState<string>("hidden");

    const [click, setClick]  =  useState<boolean>(false);

    function closeAlert(){
        let listOfAlerts = document.getElementsByName("alert-close")!
        for (let i = 0; i < listOfAlerts.length; i++) {
            listOfAlerts[i].click();
        }
    }

    function getAlert(x: string){
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
        try {
            fetch("https://cvwobackend-production.up.railway.app/register/error",{ credentials: "include" })
            .then((res)  => res.json())
            .then((error)  => setError(error.error));
        } catch(error) {
            console.log(error);
        }
        
    }, []);

    
    useEffect(() => {
        try {
            if (password !==  confirmPassword){
                setValidation("form-control validation-fail");
                setValidationMessageClass("password-validation-message");
                setClick(true);
            } else{
                setValidation("form-control");
                setValidationMessageClass("hidden");
                setClick(false);        
            }
        } catch(error) {
            console.log(error);
        }
        
      }, [confirmPassword, password, validationMessageClass]);
 
    return(
        <>
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
                    {error.map(getAlert)}
                </div>
                <div className = "auth-content" style = {{backgroundImage: "url(/Clean-Desk.jpg)"}}>
                    <Auth
                        route = "https://cvwobackend-production.up.railway.app/users"
                        greetings = "Hello"
                        usernameInput = "form-floating"
                        passwordValidation = "form-floating"
                        btn = "Register"
                        setName = {setName}
                        setPassword = {setPassword}
                        setConfirmPassword = {setConfirmPassword}
                        click = {click}
                        name = {name}
                        validation = {validation}
                        emailInputName = "user[email]"
                        passwordInputName  ="user[password]" 
                        validationMessageClass = {validationMessageClass}
                    />
                </div>
            </div>
        </>
    );
}

export default Register;