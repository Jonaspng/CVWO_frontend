import { Dispatch, SetStateAction } from "react";
import {Categories, List} from "./interface";

interface AddItemProps{
    categories: Categories[];
    setData: Dispatch<SetStateAction<number[]>>;
    setListItem: Dispatch<SetStateAction<List[]>>;
    setOriginalListItem: Dispatch<SetStateAction<List[]>>;
    isInCategory: boolean;
    categoryFilterValue: string
}

function AddItem({categories, setData, setListItem, setOriginalListItem, isInCategory, categoryFilterValue}: AddItemProps){

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

    function HandleAddItemForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("add-item-btn")!.click();
    }

    function getCategoriesOption(x: Categories){
        return(
            <option key = {x.id} value = {x.id!}>{x.category}</option>
        );
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

    return (
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
    )
}

export default AddItem;