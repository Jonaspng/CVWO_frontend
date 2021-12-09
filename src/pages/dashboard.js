import React, { useState, useEffect } from "react";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pie } from "react-chartjs-2";
import TopProgressBar from "react-topbar-progress-indicator";
import Navbar from "../components/navbar";
import colorScheme from "../components/color"

function Dashboard(){

    let label = [];

    let number = 0;

    let categoryConfirmation = false;

    const [tabStatus, setTabStatus] =  useState(true);

    const [btnName, setBtnName] = useState("Close Categories tab");

    const [toLeft, setToLeft] = useState("list");

    const [btnColor, setBtnColor] = useState("btn btn-danger");

    const [categories, setCategories] = useState([]);

    const [itemCategories, setItemCategories] = useState([]);

    const [data, setData] = useState([]);

    const [listItem, setListItem] = useState([]);

    const [title, setTitle] = useState("All Items");

    const [username, setUsername] = useState("");

    const [result, setResult] = useState({category: "ignore"});

    function appendLabel(){
        for (let i = 0; i < categories.length; i++){
            label.push(categories[i].category)
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
      
      
    function updateCategory(){
         fetch("https://todolist-backend-cvwo.herokuapp.com/categories",{ credentials: 'include'})
            .then((res) => res.json())
            .then((categories) => setCategories(categories.categories));
    }

    function updateData(){
         fetch("https://todolist-backend-cvwo.herokuapp.com/api/chart",{ credentials: 'include'})
            .then((res) =>  res.json())
            .then((data) => setData(data.data));        
    }

    function updateListItems(){
        fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: 'include'})
            .then((res) => res.json())
            .then((listItem) => setListItem(listItem.items));        
    }

    function updateItemCategories(){
        fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: 'include'})
            .then((res) =>  res.json())
            .then((itemCategories) => setItemCategories(itemCategories.categories));
    }
    
    function handleClick(){
        if (tabStatus){
            setTabStatus(false);
            setBtnName("Open Categories tab");
            setToLeft("to-left");
            setBtnColor("btn btn-success");
        }
        else{
            setTabStatus(true);
            setBtnName("Close Categories tab");
            setToLeft("list");
            setBtnColor("btn btn-danger");
        }  
    }


    function HandleAddItemClick(){
        fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ 
        method:"POST",
        mode: 'cors',
        credentials: 'include',
        body:new FormData(document.getElementById("add-form"))});
        document.getElementById("add-form").reset();
        setTimeout(() => {
            updateListItems();
            updateItemCategories();
            updateData();
        },1300);
                
    }

    function HandleAddCategoryClick(){
        fetch("https://todolist-backend-cvwo.herokuapp.com/categories",{ 
        method:"POST",
        mode: 'cors',
        credentials: 'include',
        body:new FormData(document.getElementById("add-cat-form"))});
        document.getElementById("add-cat-form").reset();
        setTimeout(() => {
            updateCategory();
            updateData();
        },1300);         
    }

    function handleItemDeleteClick(event){
        let id = event.target.value
        fetch("https://todolist-backend-cvwo.herokuapp.com/list_items/" + id,{ 
        method:"DELETE",
        mode: 'cors',
        credentials: 'include'
        });
        setTimeout(() => {
            updateListItems();
            updateItemCategories();
            updateData();
        },1500);
      }


    function handleCategoryDeleteClick(event){
        categoryConfirmation = window.confirm("Are you sure you want to delete the category? All list item in the category will also be deleted");
        console.log(categoryConfirmation);
        if (categoryConfirmation == true) {
            let id = event.currentTarget.value
            fetch("https://todolist-backend-cvwo.herokuapp.com/categories/" + id,{
                method:"DELETE",
                mode: 'cors',
                credentials: 'include',
            });
            categoryConfirmation = false;
            setTimeout(() => {
                updateCategory();
                updateData();
                updateListItems();
                updateItemCategories();
            },1300);
        } else {
            event.preventDefault();
        }
    }

    function handleCategoryFilterClick(event){
        let filterValue = event.target.value;
        fetch("https://todolist-backend-cvwo.herokuapp.com/api/filter",{ 
        method:"POST",
        body:JSON.stringify({
            filterValue: filterValue,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        mode: "cors",
        credentials: 'include',
        });      
        setTimeout(() => {
            updateListItems();
            updateItemCategories();
            setTitle(filterValue);
        },1300);
    }

    function handleShowAllClick(){
        fetch("https://todolist-backend-cvwo.herokuapp.com/api/show_all",{ 
        method:"POST",
        mode: "cors",
        credentials: 'include',
        });
        setTimeout(() => {
            updateListItems();
            setTitle("All Items");
        },1000);   
    }

    function handleEditClick(event){
        var id = event.currentTarget.value;
        setResult(listItem.filter(item => item.id == id));   
    }

    function HandleUpdateItemClick(event){
        let id = event.target.value;
        fetch("https://todolist-backend-cvwo.herokuapp.com/list_items/"+id,{ 
        method:"PATCH",
        mode: 'cors',
        credentials: 'include',
        body:new FormData(document.getElementById("edit-form"))});
        document.getElementById("edit-form").reset();
        setTimeout(() => {
            updateListItems();
            updateItemCategories();
            updateData();
        },1300);
    }

    console.log(listItem);
    console.log(categories);
    console.log(categories.filter(x => x.id == result[0].category_id));


    function getItems(x){
        number += 1; 
        return(
            <tr key = {x.id} >
                <td>{number}</td>
                <td>{x.title}</td>
                <td>{categories.filter(y => y.id == x.category_id)[0].category}</td>
                <td>{x.deadline}</td>
                <td>
                <form id = "delete-form">
                    <div className = "form-check form-switch">
                        <input name = "id" value={x.id} onClick = {handleItemDeleteClick} className = "form-check-input" type = "checkbox" id = "flexSwitchCheckDefault"/>
                    </div>
                </form>
                    <button onClick = {handleEditClick} value = {x.id} className = "edit-icon" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop2"><EditIcon /></button>
                </td>
            </tr>
        )
    }

    function getCategories(x){
        return(
            <li className = "category-list" key = {x.id}>
                <button className = "category-btn" onClick = {handleCategoryFilterClick} value = {x.id}>{x.category}</button>
                <button type = "button" value = {x.id} onClick = {handleCategoryDeleteClick} className = "delete-icon"><DeleteIcon /></button>            
            </li>
        );
    }

    function getCategoriesOption(x){
        return(
            <option key = {x.id} value = {x.id}>{x.category}</option>
        );
    }

    function getCategoriesEdit(){
        if (JSON.stringify(result) !== ["0"]){
            return categories.filter(x => x.id == result[0].category_id)[0].category;
        }
    }

    useEffect(() => {
        updateItemCategories();
        updateCategory();
        updateData();
        updateListItems();
        fetch("https://todolist-backend-cvwo.herokuapp.com/users",{ credentials: 'include'})
            .then((res) => res.json())
            .then((username) => setUsername(username.user.username));
        }, []);


    if (username===""){
        return(
            <div>
                <TopProgressBar />;
                 <h1 className = "loading">Loading</h1>
            </div>
           
        );
    } else{
        return(
            <div id = "dashboard">
                <Navbar 
                    brand = "/dashboard"
                    item1 = {username}
                    item2 = "Profile"
                    link2 = "/profile"
                    logout = "logout"
                />
                <div className="chart">
                    {data.reduce((a,b) => a + b,0) == 0?<h1 className="chart-h1">Woo Hoo! You have no item to complete!</h1>:<Pie data={pieData} width = {"100"} height={"100"} options = {options}/>}
                </div>
                <div>
                    <div className = {tabStatus?"offcanvas offcanvas-start show":"offcanvas offcanvas-start"}>
                        <div className ="offcanvas-header">
                            <h5 className ="offcanvas-title" id = "offcanvasScrollingLabel">Categories</h5>
                            <button className = "add-icon" data-bs-toggle = "modal" data-bs-target = "#exampleModalCenter"><AddIcon/></button>
                        </div>
                        <div className = "offcanvas-body">
                            <ul>
                                {categories.filter(x => x.category !== "Null").map(getCategories)}
                            </ul>                      
                        </div>
                    </div>
                    
                    <div id={toLeft}>
                        <button onClick = {handleClick} className = {btnColor}>{btnName}</button>
                        <div className = "div-add">
                            <button onClick = {handleShowAllClick} type = "button" className = "btn btn-dark">Show All Items</button>
                            <button type = "button" className = "btn btn-primary btn-add" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop">+ New Item</button>
                        </div>
                        <div>
                            <h3 className = "title">{title}</h3>
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
                    <div className="modal fade" id = "staticBackdrop" data-bs-backdrop = "static" data-bs-keyboard = "false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className = "modal-dialog">
                            <div className = "modal-content">
                                <div className = "modal-header">
                                    <h5 className = "modal-title" id = "staticBackdropLabel">Add Item</h5>
                                    <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                </div>
                                <div className = "modal-body">
                                    <form id = "add-form">
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
                                    <button onClick = {HandleAddItemClick} type = "button" className =" btn btn-primary" data-bs-dismiss = "modal">Add Item</button>
                                </div>
                            </div>
                        </div>
                    </div>                                    
                    <div className = "modal fade" id = "exampleModalCenter" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = "-1" aria-labelledby = "exampleModalCenterTitle" aria-hidden="true" >
                        <div className = "modal-dialog modal-dialog-centered">
                            <div className = "modal-content">
                                <div className = "modal-header">
                                    <h5 className = "modal-title" id = "staticBackdropLabel">Add Category</h5>
                                    <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                </div>
                                <div className = "modal-body">
                                    <form id = "add-cat-form">
                                        <p className = "add-form-description">Category Name</p>
                                        <input className = "form-control" name = "category" placeholder = "Category Name"/>                           
                                    </form>
                                </div>
                                <div className = "modal-footer">
                                    <button onClick = {HandleAddCategoryClick} type = "button" className = "btn btn-primary" data-bs-dismiss = "modal">Add Category</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id = "staticBackdrop2" data-bs-backdrop = "static" data-bs-keyboard = "false" tabindex = "-1" aria-labelledby = "staticBackdropLabel2" aria-hidden = "true">
                        <div className = "modal-dialog">
                            <div className = "modal-content">
                                <div className = "modal-header">
                                    <h5 className = "modal-title" id = "staticBackdropLabel">Add Item</h5>
                                    <button type =" button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                </div>
                                <div className = "modal-body">
                                    <form id = "edit-form">
                                        <p className = "add-form-description">Title</p>
                                        <input defaultValue = {result[0].title} className = "form-control" name = "item[title]" placeholder = "Title"/>
                                        <p className = "add-form-description">Description</p>
                                        <textarea defaultValue = {result[0].description} name = "item[description]" placeholder = "Description" className = "form-control"></textarea>
                                        <p className = "add-form-description">Deadline</p>
                                        <input defaultValue = {result[0].deadline} className = "form-control" name = "item[deadline]" type = "date"></input>
                                        <p className = "add-form-description">Category</p>
                                        <select  name = "item[category_id]" className = "form-select form-select-sm" aria-label = ".form-select-sm example">
                                            <option value = {result[0].category_id}>{getCategoriesEdit()}</option>
                                            {categories.map(getCategoriesOption)}
                                        </select>                             
                                    </form>
                                </div>
                                <div className = "modal-footer">
                                    <button value = {result[0].id} onClick = {HandleUpdateItemClick} type = "reset" className = "btn btn-primary" data-bs-dismiss = "modal">Edit Item</button>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        );
    }

    
}

export default Dashboard;