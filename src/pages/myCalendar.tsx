import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Calendar, { CalendarTileProperties } from 'react-calendar';
import TopProgressBar from "react-topbar-progress-indicator";
import Navbar from '../components/navbar';
import Day from '../components/day';
import { format } from "date-fns";
import { Categories, emptyCategory, emptyList, List } from "../components/interface";
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import EditItem from '../components/editItem';
import AddItem from '../components/addItem';


function MyCalendar(){

    // used to redirect users

    let navigate = useNavigate();

    //react hooks

    const [auth, setAuth] = useState<string>("");

    const [username, setUsername] = useState<string>("");

    const [dateChosen, setDateChosen] = useState<string>("");

    const [dateChosenForComparison, setDatechosenForComparison] = useState<string>("");

    const [listItem, setListItem] = useState<List[]>([]);

    const [categories, setCategories] = useState<Categories[]>(emptyCategory);

    const [result, setResult] = useState<List[]>(emptyList);
    
    // the below hooks are just to make sure there are no errors
    // this is because i am reusing some components and some functions are not need in calendar
    const [originalListItem, setOriginalListItem] = useState<List[]>([]);

    const [data, setData] = useState<number[]>([]);

    const [hasAddedItem, setHasAddedItem] = useState<boolean>(false);

    async function getAuth(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/api/auth", {credentials: "include" })
                    .then((res) => res.json())
                    .then((auth) => setAuth(auth.auth))
        } catch(error) {
            console.log(error);        
        }
    }

    async function updateCategory(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/categories",{ credentials: "include" })
            .then(res => res.json())
            .then((categories) => setCategories(categories.categories));
        } catch(error) {
            console.log(error);
        }
    }

    async function updateUsername(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/users",{ credentials: "include"})
                .then((res) => res.json())
                .then((username) => setUsername(username.user.username));
        } catch(error) {
            console.log(error);
        }
    }

    async function updateListItems(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/list_items",{ credentials: "include" })
                    .then(res => res.json())
                    .then((listItem) => setListItem(listItem.items));
        } catch(error) {
            console.log(error);
        }
    }

    function handleDayClick(value: Date, event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setDateChosen(format(value, "dd-MMMM-yyyy"));
        setDatechosenForComparison(format(value, "yyyy-MM-dd"));
        document.getElementById("day-show")?.click();
        console.log(dateChosenForComparison);
    }

    function checkForDeadlines({activeStartDate, date, view}: CalendarTileProperties){
        let numberOfDeadline:number = listItem.filter((item: List) => item.deadline === format(date, "yyyy-MM-dd")).length;
        if (numberOfDeadline !== 0) {
            return (
                <div className = 'calendar-deadline-tile'>
                    <p className = 'deadline-tag'>{numberOfDeadline === 1 ? "1 Task Due" : numberOfDeadline + " Task due"}</p>
                </div>
            );            
        } else {
            return null;
        }
    }

    useEffect(() => {
        try {
            getAuth();
            updateUsername();
            updateListItems();
            updateCategory();
        } catch(error) {
            console.log(error);
        }
        
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
                    username = {username}
                    item1 = "Dashboard"
                    link1 = "/dashboard"
                    item2 = "Profile"
                    link2 = "/profile"
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
                    listItem = {listItem}
                    deadline = {dateChosenForComparison}
                    categories = {categories}
                    setListItem = {setListItem}
                    setResult = {setResult}
                />
                <EditItem 
                    result = {result} 
                    categories = {categories} 
                    setData = {setData}
                    setListItem = {setListItem}
                    setOriginalListItem= {setOriginalListItem}
                    isInCategory = {false} 
                    categoryFilterValue = {''}                
                />
                <AddItem 
                    categories = {categories} 
                    setData = {setData}
                    setListItem = {setListItem}
                    setOriginalListItem = {setOriginalListItem}
                    isInCategory = {false}
                    categoryFilterValue = {''}
                    setHasAdded = {setHasAddedItem}
                    dateValue = {dateChosenForComparison}
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

export default MyCalendar;