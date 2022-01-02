interface Auth2Props{
    greetings: string;
    btn: string;
}

function Auth2({greetings, btn}: Auth2Props){

    async function authentication(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        await fetch("https://todolist-backend-cvwo.herokuapp.com/api/login",{ 
                method:"POST",
                mode: "cors",
                credentials: "include",
                body:new FormData((document.getElementById("login-form") as HTMLFormElement))})
                .catch(error => {
                    console.log(error);
                });
    }

    function handleLoginForm(event: React.FormEvent<HTMLFormElement>){
        document.getElementById("login-btn")!.click();
    }
    
    return(
        <div className = "card mx-auto">
            <form id = "login-form" onSubmit = {handleLoginForm}>
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
                    <button id = "login-btn" className = "btn btn-primary" onClick = {authentication} type = "submit">{btn}</button>
                </div>
            </form>
        </div>
    );
}

export default Auth2;