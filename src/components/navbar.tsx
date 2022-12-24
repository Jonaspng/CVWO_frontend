interface NavbarProps{
    brand: string;
    username?: string;
    link1?: string;
    link2?: string;
    link3?: string;
    item1?: string;
    item2?: string;
    item3?: string;
    logout?: string;
}

//Navbar from bootstrap
function Navbar({ brand, username, link1, link2, link3, item1, item2, item3, logout }: NavbarProps) {
    return (
        <>
            <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                <div className = "container-fluid">
                    <a className = "navbar-brand" href = {brand}>Express ToDoList</a>
                    <button className = "navbar-toggler" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navbarNav" aria-controls = "navbarNav" aria-expanded = "false" aria-label = "Toggle navigation">
                        <span className = "navbar-toggler-icon"></span>
                    </button>
                    <div className = "collapse navbar-collapse" id = "navbarNav">
                        <ul className = "navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className = "nav-item">
                                <a className = "nav-link disabled" aria-current = "page">{username}</a>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link active" href = {link1} aria-current = "page">{item1}</a>
                            </li>
                            <li className = "nav-item" >
                                <a className = "nav-link active" href = {link2}    aria-current = "page">{item2}</a>
                            </li>
                            <li className = "nav-item" >
                                <a className = "nav-link active" href = {link3} aria-current = "page">{item3}</a>
                            </li>
                            <li className = "nav-item">
                                <form className = {logout} action = "https://cvwobackend-production.up.railway.app/api/logout" method = "POST">
                                    <button name = "button" type = "submit" className = "btn btn-outline-danger">Logout</button>
                                </form>
                            </li>
                        </ul>
                        </div>
                    </div>
              </nav>
        </>
  )
}

export default Navbar;