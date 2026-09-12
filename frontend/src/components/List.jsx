import { useEffect, useState } from "react"
import '../style/list.css'

export default function List() {

    const [taskData, setTaskData] = useState();

    useEffect(() => {
        getListData();
    })

    const getListData = async () => {
        let list = await fetch('http://localhost:3200/tasks');
        list = await list.json();

        if (list.success) {
            setTaskData(list.result)
        }
    }

    return (
        <>
            <div>
                <h1>To Do List</h1>
                <ul className="task-list">
                    <li className="list-header">S.No</li>
                    <li className="list-header">Title</li>
                    <li className="list-header">Description</li>

                    {
                         taskData && taskData.map((item, index) => (
                            <>
                                <li className="list-item">{index+1}</li>
                                <li className="list-item">{item.title}</li>
                                <li className="list-item">{item.description}</li>
                            </>
                         ))
                    }
                </ul>
            </div>
        </>
    )
}