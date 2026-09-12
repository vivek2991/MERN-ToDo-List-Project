import { useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';

export default function UpdateTask() {
    const [taskData, setTaskData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getTask(id)
    }, [1000])

    const getTask = async(id) =>{
        let task = await fetch('http://localhost:3200/task/'+id);
        task = await task.json();
        if(task.result){
            setTaskData(task.result);
        }
    }

    const UpdateTask= async()=>{
        let task = await fetch('http://localhost:3200/update-task',{
            method: 'put',
            body: JSON.stringify(taskData),
            headers:{
                'Content-Type': 'Application/Json'
            }
        });

        task = await task.json();
        if(task){
            navigate("/")
        }
    }

    return (
        <>
            <div className="container">
                <h1>Update Task</h1>

                <label htmlFor="">Title</label>
                <input value={taskData?.title} onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} type="text" name="title" placeholder="Enter Task Title" />
                <label htmlFor="">Description</label>
                <textarea value={taskData?.description} onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} rows={4} name="description" placeholder="Enter Task Description"></textarea>
                <button onClick={UpdateTask} className="submit">Update Task</button>

            </div>
        </>
    )
}