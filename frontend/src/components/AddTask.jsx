import '../style/addtask.css'

export default function AddTask(){
    return(
        <>
            <div className="container">
                <h1>Add New Task</h1>
                <form action="" method="post">
                    <label htmlFor="">Title</label>
                    <input type="text" name="title" placeholder="Enter Task Title"/>
                    <label htmlFor="">Description</label>
                    <textarea rows={4} name="description" placeholder="Enter Task Description"></textarea>
                    <button className="submit">Add Task</button>
                </form>
            </div>
        </>
    )
}