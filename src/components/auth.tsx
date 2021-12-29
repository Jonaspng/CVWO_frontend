import React, {useState, useEffect} from "react";

interface AuthProps{
    route: string;
    greetings: string;
    usernameInput: string;
    passwordValidation: string;
    btn: string;
}

function Auth({route, greetings, usernameInput, passwordValidation, btn}: AuthProps){

    const [name, setName]  =  useState("");

    const [password, setPassword]  =  useState("");

    const [confirmPassword, setConfirmPassword]  =  useState("");

    const [validation, setValidation]  =  useState("form-control");

    const [click, setClick]  =  useState<boolean>(false);

    function getName(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value);
    }

    function getPassword(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function getConfirmPassword(event: React.ChangeEvent<HTMLInputElement>){
        setConfirmPassword(event.target.value);
    }
    
    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if (click){
            event.preventDefault();
        }
    }

    useEffect(() => {
        if (password !==  confirmPassword){
            setValidation("form-control validation-fail");
            setClick(true);
        } else{
            setValidation("form-control"); 
            setClick(false);        
        }
      }, [confirmPassword, password]);
   
    return(
        <div className = "card mx-auto">
            <form action = {route} method = "POST">
                <div className = "card-body">
                    <h3 className = "card-title">{greetings} {name}</h3>
                    <div className = {usernameInput}>
                        <input value = {name} onChange = {getName} name = "user[username]" type = "text" className = "form-control" id = "floatingInput" placeholder = "Username" autoComplete = "off" />
                        <label htmlFor = "floatingInput">Username</label>
                    </div>
                    <div className = "form-floating">
                        <input name = "user[email]" type = "email" className = "form-control" id = "floatingInput" placeholder = "Email address" autoComplete = "off"/>
                        <label htmlFor = "floatingInput">Email address</label>
                    </div>
                    <div className = "form-floating">
                        <input name = "user[password]"  onChange = {getPassword} type = "password" className = {validation} placeholder = "Password" id = "floatingPassword" />
                        <label htmlFor = "floatingPassword">Password</label>
                    </div>
                    <div className = {passwordValidation}>
                        <input name = "user[password2]" onChange = {getConfirmPassword} type = "password" className = {validation} placeholder = "Confirm Password" id = "floatingPassword" />
                        <label htmlFor = "floatingPassword">Confirm Password</label>
                    </div>
                    <button onClick = {handleClick} className = "btn btn-primary" type = "submit" name = "button">{btn}</button>
                </div>
            </form>
        </div>
    );
}

export default Auth;