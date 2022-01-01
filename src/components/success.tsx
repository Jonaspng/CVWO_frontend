import { useState } from "react"

interface SuccessProps{
    message: string;
}

function Success({message}: SuccessProps){
    
    const [className, setClassName] = useState("success-message")

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

export default Success;