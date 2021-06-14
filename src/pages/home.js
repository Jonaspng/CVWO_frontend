import React, { useState,useEffect } from "react";
import Navbar from "../components/navbar"


function Home(){
    return(
        <div className="home-page">
        <Navbar 
            brand="/"
            item1="Login"
            link1="/login"
            item2="Register"
            link2="/register"
            item3="Home"
            link3="/"
            logout="hidden"
        />
        <div className="home-content" style={{backgroundImage: "url(/Clean-Desk.jpg)"}}>
            <div id="home-description" className="mx-auto">
                <h1>Express ToDoList</h1>
                <hr id="home-hr"></hr>
                <p>A quick and easy solution to a digital to do list.</p>
                <a className="btn btn-dark" href="/login">Login</a>
                <a className="btn btn-light" href="/register">Register</a>
            </div>
            
        </div>
        </div>
        
    );
}

export default Home;