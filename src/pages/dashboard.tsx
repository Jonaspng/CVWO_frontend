import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopProgressBar from "react-topbar-progress-indicator";
import Navbar from "../components/navbar";
import { Categories, emptyCategory, List, emptyList } from "../components/interface"
import Chart from "../components/chart";
import Sidebar from "../components/sidebar";
import Table from "../components/table";
import AddItem from "../components/addItem";
import EditItem from "../components/editItem";
import AddCategory from "../components/addCategory";
import Alert from "../components/alert";


function Dashboard(){

    // used to redirect users

    let navigate = useNavigate();

    // react hooks
    const [search, setSearch] = useState<string>("");

    const [isInCategory, setIsInCategory] = useState<boolean>(false);

    const [categoryFilterValue, setCategoryFilterValue] = useState<string>("");

    const [toLeft, setToLeft] = useState<string>("list");

    const [categories, setCategories] = useState<Categories[]>(emptyCategory);

    const [data, setData] = useState<number[]>([]);

    const [originalListItem, setOriginalListItem] = useState<List[]>([]);

    const [listItem, setListItem] = useState<List[]>([]);

    const [title, setTitle] = useState<string>("All Items");

    const [username, setUsername] = useState<string>("");

    const [result, setResult] = useState<List[]>(emptyList);

    const [auth, setAuth] = useState<string>("");

    const [hasAddedItem, setHasAddedItem] = useState<boolean>(false);

    const [hasAddedCategory, setHasAddedCategory] = useState<boolean>(false);

    const [hasCategoryError, setHasCategoryError] = useState<boolean>(false);

    // fetch is used here to parse data to backend and fetch data from backend
    // async functions with await helps make sure it finishes fetching information before moving on

    async function getAuth(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/api/auth", {credentials: "include" })
                    .then((res) => res.json())
                    .then((auth) => setAuth(auth.auth))
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


    async function updateCategory(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/categories",{ credentials: "include" })
            .then(res => res.json())
            .then((categories) => setCategories(categories.categories));
        } catch(error) {
            console.log(error);
        }
    }

    async function updateData(){
        try {
            return await fetch("https://cvwobackend-production.up.railway.app/api/chart",{ credentials: "include" })
            .then(res => res.json())
            .then((data) => setData(data.data));
        } catch(error) {
            console.log(error);
        }
        
    }

    async function updateListItems(){
        try {
            if (isInCategory) {
                return await fetch("https://cvwobackend-production.up.railway.app/list_items",{ credentials: "include" })
                    .then(res => res.json())
                    .then((listItem) => {
                        setListItem((listItem.items).filter((x: List) => x.category_id === parseInt(categoryFilterValue)));
                        setOriginalListItem((listItem.items).filter((x: List)  => x.category_id === parseInt(categoryFilterValue)));
                    });
            } else {
                return await fetch("https://cvwobackend-production.up.railway.app/list_items",{ credentials: "include" })
                .then(res => res.json())
                .then((listItem) => {
                    setListItem(listItem.items);
                    setOriginalListItem(listItem.items);
                });
            }
        } catch(error) {
            console.log(error);
        }
        
    }

    function closeAlert(){
        let listOfAlerts = document.getElementsByName("alert-close")!
        for (let i = 0; i < listOfAlerts.length; i++) {
            listOfAlerts[i].click();
        }
        setHasAddedItem(false);
        setHasCategoryError(false);
        setHasAddedCategory(false);
    }

    function addAlert(alertName: string, title: string, description: string, iconName: string){
        setTimeout(closeAlert, 2000);
        return (
            <Alert 
                alertName = {alertName}
                title = {title}
                description = {description}
                iconName = {iconName}
            />
        );
    }

    // updates auth, category, data and list items
    useEffect(() => {
        try {
            getAuth();
            updateCategory();
            updateData();
            updateListItems();
            updateUsername();
        } catch(error) {
            console.log(error);
        }
        
    }, [isInCategory, categoryFilterValue]);
    
    // helps to filter list based on input in search bar
    useEffect(() => {
        try {
            if (search === ""){
                updateListItems()
            } else{
                const filtered = originalListItem.filter((item: List)=> item.title!.toLowerCase().includes(search.toLowerCase()));
                setListItem(filtered);
            }
        } catch(error) {
            console.log(error);
        }
        
    }, [search]);
    
    // It checks with backend to see whether the user is logged in 
    // If auth == "false" the user will be redirected to the home page as this means the user is not logged in
    // checking if username !== "",makes sure that the dashboard page finishes fetching all information before rendering
    if (auth === "true" && username !== ""){
        setTimeout(closeAlert, 2000);
        return(
            <>
                <div id = "dashboard">
                    <Navbar 
                        brand = "/dashboard"
                        username = {username}
                        item1 = "Calendar"
                        link1 = "/calendar"
                        item2 = "Profile"
                        link2 = "/profile"
                        logout = "logout"
                    />
                    <div className="alert-bar">
                        <Alert 
                            alertName = "alert alert-success d-flex align-items-center alert-dismissible fade show"
                            description = {"Logged in as " + username}
                            iconName = "#check-circle-fill"
                        />
                        {hasAddedItem ? addAlert("alert alert-success d-flex align-items-center alert-dismissible fade show", 
                                            "Item Added Successfully!",
                                            "Check the table below for the new list Item",
                                            "#check-circle-fill") : null}
                        {hasAddedCategory ? addAlert("alert alert-success d-flex align-items-center alert-dismissible fade show", 
                                            "Category Added Successfully!",
                                            "Check the sidebar below for the new category",
                                            "#check-circle-fill") : null}
                        {hasCategoryError ? addAlert("alert alert-danger d-flex align-items-center alert-dismissible fade show",
                                            "Category Already Exist!",
                                            "Check the sidebar to see which categories have already been added",
                                            "#exclamation-triangle-fill") : null}
                    </div>
                    <Chart 
                        categories = {categories} 
                        data = {data}
                    />
                    <div className = "below-chart">
                        <Sidebar 
                            categories = {categories}
                            setToLeft = {setToLeft}
                            setCategoryFilterValue = {setCategoryFilterValue}
                            isInCategory = {isInCategory}
                            setTitle = {setTitle}
                            setListItem = {setListItem}
                            setData = {setData}
                            setCategories = {setCategories}
                            setOriginalListItem = {setOriginalListItem}
                            categoryFilterValue = {categoryFilterValue} 
                            setIsInCategory = {setIsInCategory}              
                        />
                        <Table 
                            categories = {categories} 
                            categoryFilterValue = {categoryFilterValue} 
                            isInCategory = {isInCategory} 
                            tableId = {toLeft} 
                            setListItem = {setListItem} 
                            setOriginalListItem = {setOriginalListItem} 
                            setIsInCategory = {setIsInCategory} 
                            setTitle = {setTitle} 
                            setResult = {setResult} 
                            setData = {setData} 
                            setSearch = {setSearch} 
                            listItem = {listItem} 
                            title = {title} 
                            search = {search}                    
                        />
                    </div>
                    <AddItem 
                        categories = {categories} 
                        setData = {setData} 
                        setListItem = {setListItem} 
                        setOriginalListItem = {setOriginalListItem} 
                        isInCategory = {isInCategory} 
                        categoryFilterValue = {categoryFilterValue}
                        setHasAdded = {setHasAddedItem} 
                    />
                    <EditItem 
                        result = {result} 
                        categories = {categories} 
                        setData = {setData} 
                        setListItem = {setListItem} 
                        setOriginalListItem = {setOriginalListItem} 
                        isInCategory = {isInCategory} 
                        categoryFilterValue = {categoryFilterValue}
                    />
                    <AddCategory 
                        setCategories = {setCategories}
                        setData = {setData} 
                        categories = {categories} 
                        setHasAddedCategory = {setHasAddedCategory}
                        setHasCategoryError = {setHasCategoryError}
                    />
                </div>
            </>                
        );
    } else if (auth === "false"){
        return (
            <>
                {navigate("/")}
            </>
        );
    } else {
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

export default Dashboard;