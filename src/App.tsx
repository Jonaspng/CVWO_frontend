import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Overview from "./pages/overview";

function App(){
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/register" element = {<Register />} />
                <Route path = "/dashboard" element = {<Dashboard />} />
                <Route path = "/profile" element = {<Profile />} />
                <Route path = "/overview" element = {<Overview />} />
                <Route
                    path = "*"
                    element = {
                        <main style = {{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </Router>);
}

export default App;