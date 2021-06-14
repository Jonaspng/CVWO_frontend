import React, {useEffect, useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Navbar from "../components/navbar";
import Error from "../components/error"
import Success from "../components/success"

function Profile(){

    const [userDetails, setUserDetails] = useState("")

    const [error,setError] = useState([]);

    const [success,setSuccess] = useState([])

    const [password,setPassword] = useState("");

    const [confirmPassword,setConfirmPassword] = useState("");

    const [validation, setValidation] = useState("form-control");

    const [click, setClick] = useState(false);

  
    useEffect(() => {
        fetch("http://localhost:5000/register/error",{  credentials: 'include'})
          .then((res) => res.json())
          .then((error) => setError(error.error));
      }, []);

      useEffect(() => {
        fetch("http://localhost:5000/register/success",{  credentials: 'include'})
          .then((res) => res.json())
          .then((success) => setSuccess(success.success));
      }, []);


    useEffect(() => {
        fetch("http://localhost:5000/users",{ credentials: 'include'})
            .then((res) => res.json())
            .then((userDetails) => setUserDetails(userDetails.user));
        }, []);

    useEffect(() => {
        if (password !== confirmPassword){
            setValidation("form-control validation-fail");
            setClick(true);
        }else{
            setValidation("form-control"); 
            setClick(false);        
        }
        }, [confirmPassword,password]);

    function getError(x){
        return(
            <Error message={x}/>
        )
    }

    function getSuccess(x){
        return(
            <Success message={x}/>
        )
    }

    function getPassword(event){
        setPassword(event.target.value);
    }

    function getConfirmPassword(event){
        setConfirmPassword(event.target.value);
    }
    
    function handleClick(event){
        if (click){
            event.preventDefault();
        }else{
            fetch("http://localhost:5000/users/"+userDetails.id,{ 
            method:"PATCH",
            mode: 'cors',
            credentials: 'include',
            body:new FormData(document.getElementById("edit-details-form"))});
            setTimeout(()=>{
                fetch("http://localhost:5000/register/error",{credentials: 'include'})
                    .then((res) => res.json())
                    .then((error) => setError(error.error));
                fetch("http://localhost:5000/register/success",{credentials: 'include'})
                    .then((res) => res.json())
                    .then((success) => setSuccess(success.success));
                fetch("http://localhost:5000/users",{ credentials: 'include'})
                    .then((res) => res.json())
                    .then((userDetails) => setUserDetails(userDetails.user));
            },1000);
            document.getElementById("edit-details-form").reset();
        }
    }

    return(
        <div className="profile-page">
            <Navbar 
            brand="/dashboard"
            item1={userDetails.username}
            item2="Dashboard"
            link2="/dashboard"
            logout="logout"
        />
            {error.map(getError)}
            {success.map(getSuccess)}

            <div className="account-details">
                <AccountCircleIcon style={{ fontSize: 150 }} className="account-icon"/>
                <h1>Edit Account Details</h1>
                <form id="edit-details-form" >
                    <div className="form-floating">
                        <input name="user[username]" type="text" defaultValue={userDetails.username} className="form-control" id="floatingInput" placeholder="Username" autoComplete="on"/>
                        <label hmtlFor="floatingInput">Username</label>
                    </div> 
                    <div className="form-floating">
                        <input name="user[email]" type="email" defaultValue={userDetails.email} className="form-control" id="floatingInput" placeholder="Email address" autoComplete="on"/>
                        <label hmtlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input name="user[password]"  onChange={getPassword} type="password" className={validation} placeholder="New Password" id="floatingPassword" />
                        <label hmtlFor="floatingPassword">New Password</label>
                    </div>
                    <div className="form-floating">
                        <input name="user[password2]" onChange={getConfirmPassword} type="password" className={validation} placeholder="Confirm New Password" id="floatingPassword" />
                        <label hmtlFor="floatingPassword">Confirm New Password</label>
                    </div>
                </form>
                <button type="button" onClick={handleClick} className="btn btn-primary">Change Account details</button>                              
            </div>
        </div>
    );
}

export default Profile;