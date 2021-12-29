import React, {useState} from "react"

interface ErrorProps{
    message: string;
}

function Error({message}: ErrorProps){
    const [className, setClassName] = useState("error-message")

    function handleClick(){
        setClassName("hidden")
    }
    
    return(
        <div className = {className}>
            {message}
            <button onClick = {handleClick} type = "button" className = "btn-close"></button>
        </div>
    );
}

export default Error;