import {Categories} from "./interface";

interface AddItemProps{
    categories: Categories[];
}

function AddItem({categories}: AddItemProps){

    function HandleAddItemForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById("add-item-btn")!.click();
    }

    function getCategoriesOption(x: Categories){
        return(
            <option key = {x.id} value = {x.id!}>{x.category}</option>
        );
    }

    return (
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
    )
}

export default AddItem;