import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href={props.brand}>Express ToDoList</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href={props.link1} aria-current="page">{props.item1}</a>
                </li>
                <li className="nav-item" >
                  <a className="nav-link active" href={props.link2}  aria-current="page">{props.item2}</a>
                </li>
                <li className="nav-item" >
                  <a className="nav-link active" href={props.link3} aria-current="page">{props.item3}</a>
                </li>
                <li className="nav-item">
                  <form className={props.logout} action="http://localhost:5000/api/logout" method="POST">
                    <button name="button" type="submit" className="btn btn-outline-danger">Logout</button>
                  </form>
                </li>
              </ul>

          </div>
        </div>
      </nav>
    )
}

export default Navbar;