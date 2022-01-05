import Typewriter from "typewriter-effect";
import Navbar from "../components/navbar";
import Carousel from "../components/carousel";

function Home(){

    let year =  new Date().getFullYear();

    return(
        <div className = "home-page">
            <Navbar 
                brand = "/"
                item1 = "Login"
                link1 = "/login"
                item2 = "Register"
                link2 = "/register"
                item3 = "Home"
                link3 = "/"
                logout = "hidden"
            />
            <div className = "home-content" style = {{backgroundImage: "url(/Clean-Desk.jpg)"}}>
                <div id = "home-description" className = "mx-auto">
                    <h1>Express ToDoList</h1>
                    <hr id = "home-hr"></hr>
                    <p>
                        <Typewriter
                            options = {{
                                cursor: "",
                                autoStart: true,
                                loop: true,
                            }}
                            onInit = {(typewriter) => {
                                typewriter.changeDelay(80).typeString("Quick and easy solution to a digital ToDoList.").start().pauseFor(3500);
                            }}
                        />
                    </p>
                    <a className = "btn btn-dark" href = "/login">Login</a>
                    <a className = "btn btn-light" href = "/register">Register</a>
                </div>          
            </div>
            <section className = "carousel-section">
                <h1>How do I use Express ToDoList?</h1>
                <Carousel />
            </section>
            
            <footer>
                <p>© Jonas Png, {year}</p>
                <p>Background Photo by <a href = "https://unsplash.com/@jessbaileydesigns?utm_source = unsplash&utm_medium = referral&utm_content = creditCopyText">Jess Bailey</a> on <a href = "https://unsplash.com/s/photos/office-desk?utm_source = unsplash&utm_medium = referral&utm_content = creditCopyText">Unsplash</a></p>
                <a target="_blank" href="https://icons8.com/icon/JWpT8cAn8G0V/memo" rel="noopener noreferrer">Memo</a> icon by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a>
            </footer>
        </div>
    );
}

export default Home;