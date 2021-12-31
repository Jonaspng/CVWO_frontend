import {Categories, List, emptyList} from "./interface";

interface EditItemProps{
    result: List[];
    categories: Categories[];
    modalName: string;
}

function EditItem({result, categories, modalName}: EditItemProps){

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
            return categories.filter(x => x.id == result[0].category_id)[0].category;
        }
    }

    return (
        <div className = {modalName}>
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
    );
}

export default EditItem;