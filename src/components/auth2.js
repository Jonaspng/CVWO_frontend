import React from "react";

function Auth2(props){
   
    return(
        <div className = "auth-card ">
            <div className = "card mx-auto">
                <form action = {props.route} method = "POST">
                    <div className = "card-body">
                        <h3 className = "card-title">{props.greetings}</h3>
                        <div className = "form-floating">
                            <input name = "email" type = "email" className = "form-control" id = "floatingInput" placeholder = "Email address" autoComplete = "on"/>
                            <label hmtlFor = "floatingInput">Email address</label>
                        </div>
                        <div className = "form-floating">
                            <input name = "password" type = "password" className = "form-control" placeholder = "Password" id = "floatingPassword" />
                            <label hmtlFor = "floatingPassword">Password</label>
                        </div>
                        <button className = "btn btn-primary" type = "submit" name = "button">{props.btn}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth2;