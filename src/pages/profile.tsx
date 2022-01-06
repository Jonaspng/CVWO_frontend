import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Alert from "../components/alert";
import TopProgressBar from "react-topbar-progress-indicator";
import { UserDetails, emptyUserDetails } from "../components/interface";
import EditUser from "../components/editUser";


function Profile(){

    let navigate = useNavigate();
    
    // React hooks
    
    const [userDetails, setUserDetails] = useState<UserDetails>(emptyUserDetails);

    const [error,setError] = useState<string[]>([]);

    const [success,setSuccess] = useState<string[]>([])

    const [password,setPassword] = useState<string>("");

    const [confirmPassword,setConfirmPassword] = useState<string>("");

    const [validation, setValidation] = useState<string>("form-control");

    const [validationMessageClass, setValidationMessageClass] = useState<string>("hidden");

    const [click, setClick] = useState<boolean>(false);

    const [auth, setAuth] = useState<string>("");

    async function getAuth(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/auth", {credentials: "include" })
                    .then((res) => res.json())
                    .then((auth) => setAuth(auth.auth))
    }

    async function updateUserDetails(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/users",{ credentials: "include" })
                        .then((res) => res.json())
                        .then((userDetails) => setUserDetails(userDetails.user));
    }

    async function updateErrors(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/register/error",{ credentials: "include" })
                        .then((res) => res.json())
                        .then((error) => setError(error.error));
    }

    async function updateSuccess(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/register/success",{ credentials: "include" })
                        .then((res) => res.json())
                        .then((success) => setSuccess(success.success));
    }

    function closeAlert(){
        let listOfAlerts = document.getElementsByName("alert-close")!
        for (let i = 0; i < listOfAlerts.length; i++) {
            listOfAlerts[i].click();
        }
    }

    function getError(x: string){
        setTimeout(closeAlert, 3000);
        return(
            <Alert 
                alertName = "alert alert-danger alert-dismissible d-flex align-items-center fade show"
                description = {x} 
                iconName = "#exclamation-triangle-fill"
            />
        );
    }

    function getSuccess(x: string){
        setTimeout(closeAlert, 3000);
        return(
            <Alert 
                alertName = "alert alert-success alert-dismissible d-flex align-items-center fade show"
                description = {x} 
                iconName = "#check-circle-fill"
            />
        );
    }

    useEffect(() => {
        updateUserDetails();
        updateErrors();
        updateSuccess();
        getAuth();
    }, []);

    useEffect(() => {
        if (password !== confirmPassword){
            setValidation("form-control validation-fail");
            setValidationMessageClass("password-validation-message");
            setClick(true);
        } else{
            setValidation("form-control");
            setValidationMessageClass("hidden");
            setClick(false);        
        }
    }, [confirmPassword, password]);

    if (auth === "false"){
        return (
            <>
                {navigate("/")}
            </>
        );
    } else if (auth === "true") {
        return(
            <div className = "profile-page">
                <Navbar 
                    brand = "/dashboard"
                    item1 = {userDetails.username!}
                    item2 = "Dashboard"
                    link2 = "/dashboard"
                    logout = "logout"
                />
                <div className = "alert-bar">
                    {error.map(getError)}
                    {success.map(getSuccess)}
                </div>
                <EditUser 
                    setPassword = {setPassword}
                    setConfirmPassword = {setConfirmPassword}
                    userDetails = {userDetails} 
                    validation = {validation} 
                    click = {click}
                    setUserDetails = {setUserDetails}
                    setError = {setError}
                    setSuccess = {setSuccess}
                    validationMessageClass = {validationMessageClass}
                />          
            </div>
        );
    } else{
        return(
            <div>
                <TopProgressBar />
                <h1 className = "loading">Loading User Information</h1>
            </div>
        );
    }
}

export default Profile;