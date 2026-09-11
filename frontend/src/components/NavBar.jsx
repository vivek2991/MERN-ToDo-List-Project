import { Link } from "react-router-dom";
import '../style/navbar.css'

function NavBar(){
    return(
        <>
            <nav className="navbar">
                <div className="logo">To Do App</div>
                <ul className="nav-links">
                    <li><Link to="/">Task List</Link></li>
                    <li><Link to="/add">Add Task</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;