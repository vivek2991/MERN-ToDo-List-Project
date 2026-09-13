import { Link } from "react-router-dom";
import '../style/navbar.css'
import { useState } from "react";

function NavBar() {

    const [login, setLogin] = useState(localStorage.getItem('login'))

    return (
        <>
            <nav className="navbar">
                <div className="logo">To Do App</div>
                <ul className="nav-links">
                    {
                        login ?
                            <>
                                <li><Link to="/">Task List</Link></li>
                                <li><Link to="/add">Add Task</Link></li>
                                <li><Link to="/login">Logout</Link></li>
                            </> : null
                    }
                </ul>
            </nav>
        </>
    )
}

export default NavBar;