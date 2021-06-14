import React, {useState}from "react"

function Success(props){
    const [className, setClassName] = useState("success-message")

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

export default Success;