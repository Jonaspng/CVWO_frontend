import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Dispatch, SetStateAction } from "react";
import { UserDetails } from "./interface";

interface EditUserProps{
    setPassword: Dispatch<SetStateAction<string>>;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    userDetails: UserDetails;
    validation: string;
    click: boolean;
    setUserDetails: Dispatch<SetStateAction<UserDetails>>;
    setError: Dispatch<SetStateAction<string[]>>;
    setSuccess: Dispatch<SetStateAction<string[]>>;
    validationMessageClass: string;
}

function EditUser({ setPassword, setConfirmPassword, userDetails, validation, click, setUserDetails, setError, setSuccess,validationMessageClass }: EditUserProps){

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
                mode: "cors",
                credentials: "include",
                body:new FormData((document.getElementById("edit-details-form") as HTMLFormElement))});
            updateUserDetails();
            updateErrors();
            updateSuccess();
            (document.getElementById("edit-details-form") as HTMLFormElement).reset();
        }
    }
    
    return (
        <div className = "account-details">
            <AccountCircleIcon style = {{ fontSize: 150 }} className="account-icon"/>
            <h1>Edit Account Details</h1>
            <form id = "edit-details-form" >
                <div className = "form-floating">
                    <input name = "user[username]" type = "text" defaultValue = {userDetails.username!} className = "form-control" id = "floatingInput" placeholder = "Username" autoComplete = "on"/>
                    <label htmlFor = "floatingInput">Username</label>
                </div> 
                <div className = "form-floating">
                    <input name = "user[email]" type = "email" defaultValue = {userDetails.email!} className = "form-control" id = "floatingInput" placeholder = "Email address" autoComplete = "on"/>
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
                <p className = {validationMessageClass}>Passwords do not match!</p>
            </form>
            <button type = "button" onClick = {handleClick} className = "btn btn-primary">Change Account details</button>                              
        </div>
    );
}

export default EditUser;