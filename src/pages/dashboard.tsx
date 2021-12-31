import React, {useState, useEffect} from "react";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Pie} from "react-chartjs-2";
import TopProgressBar from "react-topbar-progress-indicator";
import Navbar from "../components/navbar";
import colorScheme from "../components/color";


function Dashboard(){
    
    // Used to store category label for pie chart
    let label:string[] = [];
    
    // number variable helps in labeling of table
    let number = 0;

    let categoryConfirmation = false;

    interface Categories {
        id: number | null;
        category: string | null;
        user_id: string | null;
        created_at: string | null;
        updated_at: string | null;
    }

    const emptyCategory:Categories[] = [{
        id: null,
        category: null,
        user_id: null,
        created_at: null,
        updated_at: null
    }];


    interface List{
        id: number | null;
        title: string | null;
        deadline: string | null;
        description: string | null;
        user_id: number | null;
        category_id: number | null;
        created_at: string | null;
        updated_at: string | null;
    }

    const emptyList:List[] = [{
        id: null,
        title: null,
        deadline: null,
        description: null,
        user_id: null,
        category_id: null,
        created_at: null,
        updated_at: null
    }];

    

    // react hooks
    const [tabStatus, setTabStatus] =  useState(true);

    const [search, setSearch] = useState("");

    const [isInCategory, setIsInCategory] = useState(false);

    const [CategoryFilterValue, setCategoryFilterValue] = useState("");

    const [btnsymbol, setBtnSymbol] = useState("fas fa-chevron-left");

    const [toLeft, setToLeft] = useState("list");

    const [categories, setCategories] = useState<Categories[]>(emptyCategory);

    const [data, setData] = useState([]);

    const [originalListItem, setOriginalListItem] = useState([]);

    const [listItem, setListItem] = useState([]);

    const [title, setTitle] = useState("All Items");

    const [username, setUsername] = useState("");

    const [result, setResult] = useState<List[]>(emptyList);

    const [auth, setAuth] = useState("");

    async function getAuth(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/auth",{credentials: 'include'})
                    .then((res) => res.json())
                    .then((auth) => setAuth(auth.auth))
    }

    function appendLabel(){
        for (let i = 0; i < categories.length; i++){
            label.push(categories[i].category!)
        }
        return label;
    }

    var pieData = {
        labels: appendLabel(),
        datasets: [{
            data: data,
            backgroundColor: colorScheme
        }],
    };
  
    var options = {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10
          }
        },
        animation:{
            duration:0
        },
        maintainAspectRatio: false,
      };
    
    // fetch is used here to parse data to backend and fetch data from backend
    // async functions below with await help make sure it finish fetching information before moving on
    async function updateCategory(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/categories",{ credentials: 'include'})
            .then(res => res.json())
            .then((categories) => setCategories(categories.categories));

    }

    async function updateData(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/chart",{ credentials: 'include'})
            .then(res => res.json())
            .then((data) => setData(data.data));
    }

    async function updateListItems(){
        if (isInCategory) {
            return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: 'include'})
            .then(res => res.json())
            .then((listItem) => {
                setListItem((listItem.items).filter((x: any) => x.category_id == parseInt(CategoryFilterValue)));
                setOriginalListItem((listItem.items).filter((x: any)  => x.category_id == parseInt(CategoryFilterValue)));
            });
        } else {
            return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: 'include'})
            .then(res => res.json())
            .then((listItem) => {
                setListItem(listItem.items);
                setOriginalListItem(listItem.items);
            });
        }
    }
    
    // this function settles the category side bar movements                                                                                                                                      
    function handleSidebarClick(){
        if (tabStatus){
            setTabStatus(false);
            setToLeft("to-left")
            setBtnSymbol("fas fa-chevron-right");
        }
        else{
            setTabStatus(true);
            setToLeft("list")
            setBtnSymbol("fas fa-chevron-left");
        }  
    }

    function getSearchValue(event: React.ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
    }

    async function HandleAddItemClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        // prevent page from reloading after clicking the button
        event.preventDefault();
        // post new item to database which then save it 
        await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ 
            method:"POST",
            mode: 'cors',
            credentials: 'include',
            body:new FormData((document.getElementById("add-form") as HTMLFormElement))});
        // resets the form for next use
        (document.getElementById("add-form") as HTMLFormElement).reset();
        updateListItems();
        updateData();
    }

    function HandleAddItemForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("add-item-btn")!.click();
    }

    async function HandleAddCategoryClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        // prevent page from reloading after clicking the button
        event.preventDefault();
        // post new category to database which then save it 
        await fetch("https://todolist-backend-cvwo.herokuapp.com/categories",{ 
            method:"POST",
            mode: 'cors',
            credentials: 'include',
            body:new FormData((document.getElementById("add-cat-form") as HTMLFormElement))});
        // resets the form for next use
        (document.getElementById("add-cat-form") as HTMLFormElement).reset();
        updateCategory();
        updateData();
    }

    function HandleAddCategoryForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("add-cat-btn")!.click();
    }

    async function handleItemDeleteClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
        let id = (event.target as HTMLTextAreaElement).value
        await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items/" + id,{ 
            method:"DELETE",
            mode: 'cors',
            credentials: 'include'});
        updateListItems();
        updateData();
      }

    async function handleCategoryDeleteClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        categoryConfirmation = window.confirm("Are you sure you want to delete the category? All list item in the category will also be deleted");
        if (categoryConfirmation) {
            let id = event.currentTarget.value
            await fetch("https://todolist-backend-cvwo.herokuapp.com/categories/" + id,{
                method:"DELETE",
                mode: 'cors',
                credentials: 'include',
            });
            categoryConfirmation = false;
            updateCategory();
            updateData();
            updateListItems();
        } else {
            event.preventDefault();
        }
    }

    function handleCategoryFilterClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        setCategoryFilterValue((event.target as HTMLTextAreaElement).value);
        setIsInCategory(true);
        updateListItems();
        setTitle((event.target as HTMLTextAreaElement).name);
    }

    function handleShowAllClick(){
        setIsInCategory(false);
        updateListItems();
        setTitle("All Items");
    }

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        var id = event.currentTarget.value;
        setResult(listItem.filter((item: any) => item.id == id));
    }

    async function HandleUpdateItemClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        let id = (event.target as HTMLTextAreaElement).value;
        await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items/"+id,{ 
            method:"PATCH",
            mode: 'cors',
            credentials: 'include',
            body:new FormData((document.getElementById("edit-form") as HTMLFormElement))});
        (document.getElementById("edit-form") as HTMLFormElement).reset();
        updateListItems();
        updateData();
    }

    function HandleUpdateItemForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("edit-item-btn")!.click();
    }
    
    function getCategoriesSidebar(x: any){
        if (categories.filter(y => y.id == x.category_id).length !== 0){
            return categories.filter(y => y.id == x.category_id)[0].category
        }
    }

    function getItems(x: any){
        number += 1; 
        return(
            <tr key = {x.id} >
                <td>{number}</td>
                <td>{x.title}</td>
                <td>{getCategoriesSidebar(x)}</td>
                <td>{x.deadline}</td>
                <td>
                <form id = "delete-form">
                    <div className = "form-check form-switch">
                        <input name = "id" value = {x.id} onClick = {handleItemDeleteClick} className = "form-check-input" type = "checkbox" id = "flexSwitchCheckDefault"/>
                    </div>
                </form>
                    <button onClick = {handleEditClick} value = {x.id} className = "edit-icon" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop2"><EditIcon /></button>
                </td>
            </tr>
        )
    }

    function getCategories(x: any){
        return(
            <li className = "category-list" key = {x.id}>
                <button name = {x.category} className = "category-btn" onClick = {handleCategoryFilterClick} value = {x.id}>{x.category}</button>
                <button type = "button" value = {x.id} onClick = {handleCategoryDeleteClick} className = "delete-icon"><DeleteIcon /></button>            
            </li>
        );
    }

    function getCategoriesOption(x: Categories){
        return(
            <option key = {x.id} value = {x.id!}>{x.category}</option>
        );
    }

    function getCategoriesEdit(){
        if (JSON.stringify(result) !== JSON.stringify(emptyList)){
            return categories.filter(x => x.id == result[0].category_id)[0].category;
        }
    }

    // updates auth, category, data and list items
    useEffect(() => {
        getAuth();
        updateCategory();
        updateData();
        updateListItems();
        
        console.log(listItem);
        fetch("https://todolist-backend-cvwo.herokuapp.com/users",{ credentials: 'include'})
            .then((res) => res.json())
            .then((username) => setUsername(username.user.username));
    }, [isInCategory, CategoryFilterValue]);

    useEffect(() => {
        if (search == ""){
            updateListItems()
        } else{
            const filtered = originalListItem.filter((item: List)=> item.title!.toLowerCase().includes(search.toLowerCase()));
            setListItem(filtered);
        }
    }, [search]);
    
    // It checks with backend to see whether the user is logged in 
    // If auth == "false" the user will be redirected to the home page
    // checking if username !== "",makes sure that the dashboard page finishes fetching all information before rendering
    if (auth == "true" && username != ""){
        return(
            <div id = "dashboard">
                <Navbar 
                    brand = "/dashboard"
                    item1 = {username}
                    item2 = "Profile"
                    link2 = "/profile"
                    logout = "logout"
                />
                <div className = "chart">
                    {data.reduce((a, b) => a + b, 0) == 0 ? <h1 className="chart-h1">Woo Hoo! You have no item to complete!</h1>:<Pie data={pieData} width = {"100"} height={"100"} options = {options}/>}
                </div>
                <div className = "below-chart">
                    <div className = {tabStatus ? "offcanvas1 offcanvas-start1 show" : "offcanvas1 offcanvas-start1"}>
                        <button className = "sidebar-btn" onClick = {handleSidebarClick}><i className = {btnsymbol}></i></button>
                        <div className ="offcanvas1-header">
                            <h5 className="offcanvas1-title">Categories</h5>
                            <button className = "add-icon" data-bs-toggle = "modal" data-bs-target = "#exampleModalCenter"><AddIcon/></button>
                        </div>
                        <div className = "offcanvas1-body">
                            <ul>
                                {categories.filter(x => x.category !== "Null").map(getCategories)}
                            </ul>                      
                        </div>
                    </div>
                    
                    <div id = {toLeft}>
                        <div>
                            <div className="row">
                                <div className="col-3">
                                    <h3 className = "title">{title}</h3>
                                </div>
                                <div className="col-sm-5 above-table">
                                    <input value = {search} onChange = {getSearchValue} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                </div>
                                <div className="col-sm-2 above-table">
                                    <button onClick = {handleShowAllClick} type = "button" className = "btn btn-dark">Show All</button>
                                </div>
                                <div className="col-sm-2 above-table">
                                    <button type = "button" className = "btn btn-primary btn-add" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop">+ New Item</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            
                            <table className = "table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listItem.map(getItems)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className = "modal fade" id = "staticBackdrop" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = {-1} aria-labelledby = "staticBackdropLabel" aria-hidden = "true">
                        <div className = "modal-dialog">
                            <div className = "modal-content">
                                <div className = "modal-header">
                                    <h5 className = "modal-title" id = "staticBackdropLabel">Add Item</h5>
                                    <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                </div>
                                <div className = "modal-body">
                                    <form id = "add-form" onSubmit = {HandleAddItemForm}>
                                        <p className = "add-form-description">Title</p>
                                        <input className = "form-control" name = "item[title]" placeholder = "Title"/>
                                        <p className = "add-form-description">Description</p>
                                        <textarea name = "item[description]" placeholder = "Description" className = "form-control"></textarea>
                                        <p className = "add-form-description">Deadline</p>
                                        <input className = "form-control" name = "item[deadline]" type = "date"></input>
                                        <p className = "add-form-description">Category</p>
                                        <select name = "item[category_id]" className = "form-select form-select-sm" aria-label = ".form-select-sm example">
                                            {categories.map(getCategoriesOption)}
                                        </select>                             
                                    </form>
                                </div>
                                <div className = "modal-footer">
                                    <button id = "add-item-btn" onClick = {HandleAddItemClick} type = "submit" className = "btn btn-primary" data-bs-dismiss = "modal">Add Item</button>
                                </div>
                            </div>
                        </div>
                    </div>                                    
                    <div className = "modal fade" id = "exampleModalCenter" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = {-1} aria-labelledby = "exampleModalCenterTitle" aria-hidden="true" >
                        <div className = "modal-dialog modal-dialog-centered">
                            <div className = "modal-content">
                                <div className = "modal-header">
                                    <h5 className = "modal-title" id = "staticBackdropLabel">Add Category</h5>
                                    <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                </div>
                                <div className = "modal-body">
                                    <form id = "add-cat-form" onSubmit = {HandleAddCategoryForm}>
                                        <p className = "add-form-description">Category Name</p>
                                        <input className = "form-control" name = "category" placeholder = "Category Name"/>                           
                                    </form>
                                </div>
                                <div className = "modal-footer">
                                    <button id = "add-cat-btn"onClick = {HandleAddCategoryClick}     type = "submit" className = "btn btn-primary" data-bs-dismiss = "modal">Add Category</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "modal fade" id = "staticBackdrop2" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = {-1} aria-labelledby = "staticBackdropLabel2" aria-hidden = "true">
                        <div className = "modal-dialog">
                            <div className = "modal-content">
                                <div className = "modal-header">
                                    <h5 className = "modal-title" id = "staticBackdropLabel">Add Item</h5>
                                    <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                </div>
                                <div className = "modal-body">
                                    <form id = "edit-form" onSubmit = {HandleUpdateItemForm} >
                                        <p className = "add-form-description">Title</p>
                                        <input defaultValue = {result[0].title!} className = "form-control" name = "item[title]" placeholder = "Title"/>
                                        <p className = "add-form-description">Description</p>
                                        <textarea defaultValue = {result[0].description!} name = "item[description]" placeholder = "Description" className = "form-control"></textarea>
                                        <p className = "add-form-description">Deadline</p>
                                        <input defaultValue = {result[0].deadline!} className = "form-control" name = "item[deadline]" type = "date"></input>
                                        <p className = "add-form-description">Category</p>
                                        <select  name = "item[category_id]" className = "form-select form-select-sm" aria-label = ".form-select-sm example">
                                            <option value = {result[0].category_id!}>{getCategoriesEdit()}</option>
                                            {categories.map(getCategoriesOption)}
                                        </select>                             
                                    </form>
                                </div>
                                <div className = "modal-footer">
                                    <button id = "edit-item-btn" value = {result[0].id!} onClick = {HandleUpdateItemClick} type = "submit" className = "btn btn-primary" data-bs-dismiss = "modal">Edit Item</button>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        );
    } else if (auth == "false"){
        return <>{
            window.location.replace("https://todolist-cvwo.herokuapp.com/")
        }</>;
    } else {
        return(
            <div>
                <TopProgressBar />
                <h1 className = "loading">Loading User Information</h1>
            </div>
        );
    }
}

export default Dashboard;