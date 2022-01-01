import { Dispatch, SetStateAction } from "react";
import { Categories, List, emptyList } from "./interface";

interface EditItemProps{
    result: List[];
    categories: Categories[];
    setData: Dispatch<SetStateAction<number[]>>;
    setListItem: Dispatch<SetStateAction<List[]>>;
    setOriginalListItem: Dispatch<SetStateAction<List[]>>;
    isInCategory: boolean;
    categoryFilterValue: string
}

function EditItem({ result, categories, setData, setListItem, setOriginalListItem, isInCategory, categoryFilterValue }: EditItemProps){

    async function updateData(){
        return await fetch("https://todolist-backend-cvwo.herokuapp.com/api/chart",{credentials: "include"})
            .then(res => res.json())
            .then((data) => setData(data.data));
    }

    async function updateListItems(){
        if (isInCategory) {
            return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: "include" })
                .then(res => res.json())
                .then((listItem) => {
                    setListItem((listItem.items).filter((x: List) => x.category_id === parseInt(categoryFilterValue)));
                    setOriginalListItem((listItem.items).filter((x: List)  => x.category_id === parseInt(categoryFilterValue)));
                });
        } else {
            return await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items",{ credentials: "include" })
            .then(res => res.json())
            .then((listItem) => {
                setListItem(listItem.items);
                setOriginalListItem(listItem.items);
            });
        }
    }

    function HandleUpdateItemForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("edit-item-btn")!.click();
    }

    function getCategoriesOption(x: Categories){
        return(
            <option key = {x.id} value = {x.id!}>{x.category}</option>
        );
    }

    function getCategoriesEdit(){
        if (JSON.stringify(result) !== JSON.stringify(emptyList)){
            return categories.filter(x => x.id === result[0].category_id)[0].category;
        }
    }

    async function HandleUpdateItemClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        let id = (event.target as HTMLTextAreaElement).value;
        await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items/"+id,{ 
            method:"PATCH",
            mode: "cors",
            credentials: "include",
            body:new FormData((document.getElementById("edit-form") as HTMLFormElement))});
        (document.getElementById("edit-form") as HTMLFormElement).reset();
        updateListItems();
        updateData();
    }

    return (
        <div className = "modal fade" id = "staticBackdrop2" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = {-1} aria-labelledby = "staticBackdropLabel2" aria-hidden = "true">
            <div className = "modal-dialog">
                <div className = "modal-content">
                    <div className = "modal-header">
                        <h5 className = "modal-title" id = "staticBackdropLabel">Edit Item</h5>
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
    );
}

export default EditItem;