
import { Dispatch, SetStateAction } from "react";
import {Categories} from "./interface";


interface AddCategoryProps{
    setCategories: Dispatch<SetStateAction<Categories[]>>;
    setData: Dispatch<SetStateAction<number[]>>;
}

function AddCategory({setCategories, setData}: AddCategoryProps){

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

    function HandleAddCategoryForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("add-cat-btn")!.click();
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

    return (
        <div className = "modal fade" id = "exampleModalCenter" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = {-1} aria-labelledby = "exampleModalCenterTitle" aria-hidden="true">
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
    )

}

export default AddCategory;