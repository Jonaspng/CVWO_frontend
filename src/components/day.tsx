import { List, Categories } from "./interface";

interface DayProps {
    date: string;
    listItems: List[];
    deadline: string;
    categories: Categories[];
}

function Day({date, listItems, deadline, categories}: DayProps){

    let number = 0;
    
    function getDeadlines(item: List) {
        number += 1;
        return(
            <>
                <tr key = {item.id} >
                    <td>{number}</td>
                    <td>{item.title}</td>
                    <td>{categories.filter((category: Categories) => category.id === item.category_id)[0]}</td>
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
                            <h5>Tasks that are due today</h5>
                            <p></p>
                            <table className = "table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {listItems.filter((item:List) => item.deadline === deadline).map(getDeadlines)}
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