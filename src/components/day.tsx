import { List, Categories } from "./interface";
import EditIcon from "@material-ui/icons/Edit";
import { Dispatch, SetStateAction } from "react";

interface DayProps {
    date: string;
    listItem: List[];
    deadline: string;
    categories: Categories[];
    setListItem: Dispatch<SetStateAction<List[]>>;
    setResult: Dispatch<SetStateAction<List[]>>;
}

function Day({ date, listItem, deadline, categories, setListItem, setResult }: DayProps){

    let number = 0;

    async function updateListItems(){
        return await fetch("https://cvwobackend-production.up.railway.app/list_items",{credentials: "include"})
            .then(res => res.json())
            .then((listItem) => setListItem(listItem.items));
    }

    async function handleItemDeleteClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
        let id = (event.target as HTMLTextAreaElement).value
        await fetch("https://cvwobackend-production.up.railway.app/list_items/" + id,{ 
            method:"DELETE",
            mode: "cors",
            credentials: "include"});
        updateListItems();
    }

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        let id:number = parseInt(event.currentTarget.value);
        setResult(listItem.filter((item: List) => item.id === id));
    }
    
    function getDeadlines(item: List) {
        number += 1;
        return(
            <>
                <tr key = {item.id} >
                    <td>{number}</td>
                    <td>{item.title}</td>
                    <td>{categories.filter((category: Categories) => category.id === item.category_id)[0].category}</td>
                    <td>
                        <form id = "delete-form">
                            <div className = "form-check form-switch">
                                <input name = "id" value = {item.id!} onClick = {handleItemDeleteClick} className = "form-check-input" type = "checkbox" id = "flexSwitchCheckDefault"/>
                            </div>
                        </form>
                            <button onClick = {handleEditClick} value = {item.id!} className = "edit-icon" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop2"><EditIcon /></button>
                    </td>
                </tr>
                
            </>
        );
    }

    return (
        <>
            <div className = "modal fade" id = "day" data-bs-backdrop = "static" data-bs-keyboard = "false" tabIndex = {-1} aria-labelledby = "staticBackdropLabel2" aria-hidden = "true">
                <div className = "modal-dialog">
                    <div className = "modal-content">
                        <div className = "modal-header">
                            <h3 className = "modal-title" id = "staticBackdropLabel">{date}</h3>
                            <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                        </div>
                        <div className = "modal-body">
                            <h5 className = "day-modal-title">Tasks that are due today</h5>
                            <button className = "btn btn-primary add-item" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop">+ New Item</button>
                            <p></p>
                            <table className = "table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {listItem.filter((item:List) => item.deadline === deadline).map(getDeadlines)}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default Day;