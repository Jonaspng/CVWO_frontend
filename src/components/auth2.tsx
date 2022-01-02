interface Auth2Props{
    route: string;
    greetings: string;
    btn: string;
}

function Auth2({route, greetings, btn}: Auth2Props){
    return(
        <div className = "card mx-auto">
            <form action = {route} method = "POST">
                <div className = "card-body">
                    <h3 className = "card-title">{greetings}</h3>
                    <div className = "form-floating">
                        <input name = "email" type = "email" className = "form-control" id = "floatingInput" placeholder = "Email address" autoComplete = "on"/>
                        <label htmlFor = "floatingInput">Email address</label>
                    </div>
                    <div className = "form-floating">
                        <input name = "password" type = "password" className = "form-control" placeholder = "Password" id = "floatingPassword" />
                        <label htmlFor = "floatingPassword">Password</label>
                    </div>
                    <button className = "btn btn-primary" type = "submit" name = "button">{btn}</button>
                </div>
            </form>
        </div>
    );
}

export default Auth2;