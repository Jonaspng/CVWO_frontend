import React, {useEffect, useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Navbar from "../components/navbar";
import Error from "../components/error"
import Success from "../components/success"

function Profile(){

    interface UserDetails{
        id: number;
        username: string;
        email: string;
    }

    const emptyUserDetails: UserDetails = {
        id: null,
        username: null,
        email:null
    }

    const [userDetails, setUserDetails] = useState<UserDetails>(emptyUserDetails);

    const [error,setError] = useState([]);

    const [success,setSuccess] = useState([])

    const [password,setPassword] = useState("");

    const [confirmPassword,setConfirmPassword] = useState("");

    const [validation, setValidation] = useState("form-control");

    const [click, setClick] = useState(false);

    async function updateUserDetails(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/users",{credentials: 'include'})
                        .then((res) => res.json())
                        .then((userDetails) => setUserDetails(userDetails.user));
    }

    async function updateErrors(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/register/error",{credentials: 'include'})
                        .then((res) => res.json())
                        .then((error) => setError(error.error));
    }

    async function updateSuccess(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/register/success",{credentials: 'include'})
                        .then((res) => res.json())
                        .then((success) => setSuccess(success.success));
        }

    function getError(x: string){
        return(
            <Error message = {x}/>
        )
    }

    function getSuccess(x: string){
        return(
            <Success message = {x}/>
        )
    }

    function getPassword(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function getConfirmPassword(event: React.ChangeEvent<HTMLInputElement>){
        setConfirmPassword(event.target.value);
    }
    
    async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if (click){
            event.preventDefault();
        } else{
            await fetch("https://todolist-backend-cvwo.herokuapp.com/users/" + userDetails.id,{ 
                method:"PATCH",
                mode: 'cors',
                credentials: 'include',
                body:new FormData((document.getElementById("edit-details-form") as HTMLFormElement))});
            updateUserDetails();
            updateErrors();
            updateSuccess();
            (document.getElementById("edit-details-form") as HTMLFormElement).reset();
        }
    }

    useEffect(() => {
        updateUserDetails();
        updateErrors();
        updateSuccess();
    }, []);

    useEffect(() => {
        if (password !== confirmPassword){
            setValidation("form-control validation-fail");
            setClick(true);
        }else{
            setValidation("form-control"); 
            setClick(false);        
        }
        }, [confirmPassword, password]);

    return(
        <div className = "profile-page">
            <Navbar 
            brand = "/dashboard"
            item1 = {userDetails.username}
            item2 = "Dashboard"
            link2 = "/dashboard"
            logout = "logout"
        />
            {error.map(getError)}
            {success.map(getSuccess)}

            <div className = "account-details">
                <AccountCircleIcon style = {{ fontSize: 150 }} className="account-icon"/>
                <h1>Edit Account Details</h1>
                <form id = "edit-details-form" >
                    <div className = "form-floating">
                        <input name = "user[username]" type = "text" defaultValue = {userDetails.username} className = "form-control" id = "floatingInput" placeholder = "Username" autoComplete = "on"/>
                        <label htmlFor = "floatingInput">Username</label>
                    </div> 
                    <div className = "form-floating">
                        <input name = "user[email]" type = "email" defaultValue = {userDetails.email} className = "form-control" id = "floatingInput" placeholder = "Email address" autoComplete = "on"/>
                        <label htmlFor = "floatingInput">Email address</label>
                    </div>
                    <div className = "form-floating">
                        <input name = "user[password]" onChange = {getPassword} type = "password" className = {validation} placeholder = "New Password" id = "floatingPassword" />
                        <label htmlFor = "floatingPassword">New Password</label>
                    </div>
                    <div className="form-floating">
                        <input name = "user[password2]" onChange = {getConfirmPassword} type="password" className = {validation} placeholder = "Confirm New Password" id = "floatingPassword" />
                        <label htmlFor = "floatingPassword">Confirm New Password</label>
                    </div>
                </form>
                <button type = "button" onClick = {handleClick} className = "btn btn-primary">Change Account details</button>                              
            </div>
        </div>
    );
}

export default Profile;