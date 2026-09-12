import { useState } from 'react'
import '../style/addtask.css'
import { Link } from 'react-router-dom';

export default function Signup() {

    const [userData, setUserData] = useState();

    
    return (
        <>
            <div className="container">
                <h1>Sign Up</h1>

                <label htmlFor="">Name</label>
                <input onChange={(event)=>setUserData({...userData,name:event.target.value})} type="text" name="name" placeholder="Enter User Name" />

                <label htmlFor="">Email</label>
                <input onChange={(event)=>setUserData({...userData,email:event.target.value})} type="text" name="email" placeholder="Enter User Email" />

                <label htmlFor="">Password</label>
                <input onChange={(event)=>setUserData({...userData,password:event.target.value})} type="password" name="password" placeholder="Enter Password" />

                <button onClick={()=>console.log(userData)
                } className="submit">Sign Up</button>

                <Link className='link' to="/login">Login</Link>
            </div>
        </>
    )
}