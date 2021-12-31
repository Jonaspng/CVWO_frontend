import {Dispatch, SetStateAction, useState} from "react";
import {Categories, List} from "./interface"
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

interface SidebarProps{
    categories: Categories[];
    setToLeft: Dispatch<SetStateAction<string>>; 
    setCategoryFilterValue: Dispatch<SetStateAction<string>>;
    isInCategory: boolean; 
    setIsInCategory: Dispatch<SetStateAction<boolean>>; 
    setTitle: Dispatch<SetStateAction<string>>;
    setListItem: Dispatch<SetStateAction<List[]>>; 
    setData: Dispatch<SetStateAction<number[]>>; 
    setCategories: Dispatch<SetStateAction<Categories[]>>;
    setOriginalListItem: Dispatch<SetStateAction<List[]>>;
    categoryFilterValue: string;
}

function Sidebar({categories, setToLeft, setCategoryFilterValue, setIsInCategory, setTitle, isInCategory, setListItem, setData, setCategories, setOriginalListItem, categoryFilterValue}: SidebarProps){

    const [tabStatus, setTabStatus] =  useState<boolean>(true);

    const [btnsymbol, setBtnSymbol] = useState<string>("fas fa-chevron-left");

    let categoryConfirmation:boolean = false;

    async function updateCategory(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/categories",{credentials: 'include'})
            .then(res => res.json())
            .then((categories) => setCategories(categories.categories));

    }
    async function updateData(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/chart",{credentials: 'include'})
            .then(res => res.json())
            .then((data) => setData(data.data));
    }

    async function updateListItems(){
        if (isInCategory) {
            return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{credentials: 'include'})
                .then(res => res.json())
                .then((listItem) => {
                    setListItem((listItem.items).filter((x: List) => x.category_id == parseInt(categoryFilterValue)));
                    setOriginalListItem((listItem.items).filter((x: List)  => x.category_id == parseInt(categoryFilterValue)));
                });
        } else {
            return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{credentials: 'include'})
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

    function handleCategoryFilterClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        setCategoryFilterValue((event.target as HTMLTextAreaElement).value);
        setIsInCategory(true);
        updateListItems();
        setTitle((event.target as HTMLTextAreaElement).name);
    }

    async function handleCategoryDeleteClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        categoryConfirmation = window.confirm("Are you sure you want to delete the category? All list items in the category will also be deleted");
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


    function getCategories(x: Categories){
        return(
            <li className = "category-list" key = {x.id}>
                <button name = {x.category!} className = "category-btn" onClick = {handleCategoryFilterClick} value = {x.id!}>{x.category}</button>
                <button type = "button" value = {x.id!} onClick = {handleCategoryDeleteClick} className = "delete-icon"><DeleteIcon /></button>            
            </li>
        );
    }

    return(
        <div className = {tabStatus ? "offcanvas1 offcanvas-start1 show" : "offcanvas1 offcanvas-start1"}>
            <button className = "sidebar-btn" onClick = {handleSidebarClick}><i className = {btnsymbol}></i></button>
            <div className ="offcanvas1-header">
                <h5 className="offcanvas1-title">Categories</h5>
                <button className = "add-icon" data-bs-toggle = "modal" data-bs-target = "#exampleModalCenter"><AddIcon/></button>
            </div>
            <div className = "offcanvas1-body">
                <ul>
                    {categories.filter((x: Categories) => x.category !== "Null").map(getCategories)}
                </ul>                      
            </div>
        </div>

    );
}

export default Sidebar;