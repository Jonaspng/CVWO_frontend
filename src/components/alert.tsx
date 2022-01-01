interface AlertProps{
    alertName: string;
    description: string;
    title?: string;
}

// Alert from bootstrap
function Alert({ alertName, description, title }: AlertProps){
    return (
        <div className = {alertName} role = "alert">
            <strong>{title}</strong> {description}
            <button id = "alert-close" type = "button" className = "btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    );
}

export default Alert;

//"alert alert- alert-dismissible fade show"