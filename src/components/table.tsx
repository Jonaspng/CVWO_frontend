import {useState} from "react"
import {List, Categories, emptyList} from "./interface"
import EditIcon from "@material-ui/icons/Edit";
import AddItem from "./addItem";
import EditItem from "./editItem"

interface TableProps{
    categories: Categories[];
    categoryFilterValue: string;
    tableId: string;
}

function Table({categories, categoryFilterValue, tableId}: TableProps){
    
    let number = 1;

    const [search, setSearch] = useState<string>("");

    const [title, setTitle] = useState<string>("All Items");

    const [isInCategory, setIsInCategory] = useState<boolean>(false);

    const [result, setResult] = useState<List[]>(emptyList);

    const [originalListItem, setOriginalListItem] = useState<List[]>([]);

    const [listItem, setListItem] = useState<List[]>([]);

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

    function getSearchValue(event: React.ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
    }

    function handleShowAllClick(){
        setIsInCategory(false);
        updateListItems();
        setTitle("All Items");
    }

    function getCategoriesSidebar(x: List){
        if (categories.filter((y: Categories) => y.id == x.category_id).length !== 0){
            return categories.filter((y: Categories)=> y.id == x.category_id)[0].category
        }
    }

    async function handleItemDeleteClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
        let id = (event.target as HTMLTextAreaElement).value
        await fetch("https://todolist-backend-cvwo.herokuapp.com/list_items/" + id,{ 
            method:"DELETE",
            mode: 'cors',
            credentials: 'include'});
        updateListItems();
    }

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        let id:number = parseInt(event.currentTarget.value);
        setResult(listItem.filter((item: List) => item.id == id));
    }

    function getItems(x: List){
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
                        <input name = "id" value = {x.id!} onClick = {handleItemDeleteClick} className = "form-check-input" type = "checkbox" id = "flexSwitchCheckDefault"/>
                    </div>
                </form>
                    <button onClick = {handleEditClick} value = {x.id!} className = "edit-icon" data-bs-toggle = "modal" data-bs-target = "#staticBackdrop2"><EditIcon /></button>
                </td>
            </tr>
        )
    }
    return (
        <div id = {tableId}>
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
            <AddItem categories = {categories}/>
            <EditItem 
                result = {result}
            />
        </div>
    )
}

export default Table;