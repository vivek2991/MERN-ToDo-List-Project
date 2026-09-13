import { useState } from 'react'
import '../style/addtask.css'
import { Link } from 'react-router-dom';

export default function Login() {

    const [userData, setUserData] = useState();

    const handleLogin = async () => {
        console.log(userData);
        
        let result = await fetch('http://localhost:3200/login',{
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json();
        if(result){
            //navigate("/")
            console.log(result);
            document.cookie = "token="+result.token;
        }
    }
    
    return (
        <>
            <div className="container">
                <h1>Login</h1>

                <label htmlFor="">Email</label>
                <input onChange={(event)=>setUserData({...userData,email:event.target.value})} type="text" name="email" placeholder="Enter User Email" />

                <label htmlFor="">Password</label>
                <input onChange={(event)=>setUserData({...userData,password:event.target.value})} type="password" name="password" placeholder="Enter Password" />

                <button onClick={handleLogin} className="submit">Login</button>

                <Link className='link' to="/signup">Sign Up</Link>

            </div>
        </>
    )
}