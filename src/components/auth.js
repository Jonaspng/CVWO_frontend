import React, {useState, useEffect} from "react";

function Auth(props){

    const [name, setName]  =  useState("");

    const [password, setPassword]  =  useState("");

    const [confirmPassword, setConfirmPassword]  =  useState("");

    const [validation, setValidation]  =  useState("form-control");

    const [click, setClick]  =  useState(false);

    function getName(event){
        setName(event.target.value);
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
        <div className = "auth-card">
            <div className = "card mx-auto">
                <form action = {props.route} method = "POST">
                    <div className = "card-body">
                        <h3 className = "card-title">{props.greetings} {name}</h3>
                        <div className = {props.name}>
                            <input value = {name} onChange = {getName} name = "user[username]" type = "text" className = "form-control" id = "floatingInput" placeholder = "Username" autoComplete = "off" />
                            <label htmlFor = "floatingInput">Username</label>
                        </div>
                        <div className = "form-floating">
                            <input name = "user[email]" type = "email" className = "form-control" id = "floatingInput" placeholder = "Email address" autoComplete = "off"/>
                            <label hmtlFor = "floatingInput">Email address</label>
                        </div>
                        <div className = "form-floating">
                            <input name = "user[password]"  onChange = {getPassword} type = "password" className = {validation} placeholder = "Password" id = "floatingPassword" />
                            <label hmtlFor = "floatingPassword">Password</label>
                        </div>
                        <div className = {props.confirmPassword}>
                            <input name = "user[password2]" onChange = {getConfirmPassword} type = "password" className = {validation} placeholder = "Confirm Password" id = "floatingPassword" />
                            <label hmtlFor = "floatingPassword">Confirm Password</label>
                        </div>
                        <button onClick = {handleClick} className = "btn btn-primary" type = "submit" name = "button">{props.btn}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth;