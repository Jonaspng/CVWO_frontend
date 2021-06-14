import React, {useState} from "react"

function Error(props){
    const [className, setClassName] = useState("error-message")

    function handleClick(){
        setClassName("hidden")
    }
    
    return(
        <div className={className}>
            {props.message}
            <button onClick={handleClick} type="btn" className="btn-close"></button>
        </div>
    );
}

export default Error;