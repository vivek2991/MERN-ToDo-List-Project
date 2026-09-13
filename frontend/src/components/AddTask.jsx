import { useState } from 'react'
import '../style/addtask.css'
import { useNavigate } from 'react-router-dom'

export default function AddTask() {
    const [taskData, setTaskData] = useState();
    const navigate = useNavigate();
    
    const handleAddTask = async () => {
        console.log(taskData);
        let result = await fetch('http://localhost:3200/add-task',{
            method: 'Post',
            body: JSON.stringify(taskData),
            credentials: 'include',
            headers: {
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json();
        if(result.success){
            navigate("/")
            console.log("New Task Added");
        } else {
            alert("Try after sometimes!")
        }
    }

    return (
        <>
            <div className="container">
                <h1>Add New Task</h1>

                <label htmlFor="">Title</label>
                <input onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} type="text" name="title" placeholder="Enter Task Title" />
                <label htmlFor="">Description</label>
                <textarea onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} rows={4} name="description" placeholder="Enter Task Description"></textarea>
                <button onClick={handleAddTask} className="submit">Add Task</button>

            </div>
        </>
    )
}