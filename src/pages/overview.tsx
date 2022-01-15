import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Calendar, { CalendarTileProperties } from 'react-calendar';
import TopProgressBar from "react-topbar-progress-indicator";
import Navbar from '../components/navbar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import Day from '../components/day';
import { format } from "date-fns";
import { Categories, emptyCategory, List } from "../components/interface";


function Overview(){

    let navigate = useNavigate();

    const [auth, setAuth] = useState<string>("");

    const [username, setUsername] = useState<string>("");

    const [dateChosen, setDateChosen] = useState<string>("");

    const [dateChosenForComparison, setDatechosenForComparison] = useState<string>("");

    const [listItem, setListItem] = useState<List[]>([]);

    const [categories, setCategories] = useState<Categories[]>(emptyCategory);
    
    async function getAuth(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/auth", {credentials: "include" })
                    .then((res) => res.json())
                    .then((auth) => setAuth(auth.auth))
    }

    async function updateCategory(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/categories",{ credentials: "include" })
            .then(res => res.json())
            .then((categories) => setCategories(categories.categories));

    }

    async function updateUsername(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/users",{ credentials: "include"})
                .then((res) => res.json())
                .then((username) => setUsername(username.user.username));
    }

    async function updateListItems(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: "include" })
                    .then(res => res.json())
                    .then((listItem) => setListItem(listItem.items));
    }

    function handleDayClick(value: Date, event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        document.getElementById("day-show")?.click();
        setDateChosen(format(value, "dd-MMMM-yyyy"));
        setDatechosenForComparison(format(value, "yyyy-MM-dd"));
        console.log(dateChosenForComparison);
    }

    function checkForDeadlines({activeStartDate, date, view}: CalendarTileProperties){
        if (listItem.filter((item: List) => item.deadline === format(date, "yyyy-MM-dd")).length !== 0) {
            return (
                <hr className = 'date-underline'></hr>
            );            
        } else {
            return null;
        }
    }

    useEffect(() => {
        getAuth();
        updateUsername();
        updateListItems();
        updateCategory();
    }, [dateChosen, dateChosenForComparison]);

    if (auth === "false") {
        return (
            <>
                {navigate("/")}
            </>
        );
    } else if (auth === "true") {
        return(
            <>
                 <Navbar 
                    brand = "/dashboard"
                    item1 = {username}
                    item2 = "Dashboard"
                    link2 = "/dashboard"
                    item3 = "Profile"
                    link3 = "/dashboard"
                    logout = "logout"
                />
                <button id = "day-show" type = "button" className = "hidden" data-bs-toggle = "modal" data-bs-target = "#day"></button>
                 <div className = 'card calendar-card mx-auto ms-auto'>
                    <Calendar
                        className = {"calendar"}
                        onClickDay = {handleDayClick}
                        tileContent = {checkForDeadlines}
                    />
                </div>
                <Day 
                    date = {dateChosen}
                    listItems = {listItem}
                    deadline = {dateChosenForComparison}
                    categories = {categories}
                />      
            </>
        );
    } else{
        return(
            <>
                <div>
                    <TopProgressBar />
                    <h1 className = "loading">Loading User Information</h1>
                </div>
            </>
        );
    }
}

export default Overview;