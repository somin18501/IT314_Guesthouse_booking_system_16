import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            if(email.length === 0 || password.length === 0){
                alert('Incorrect Password or Username');
            } else{
                const {data} = await axios.post('/login', {email,password});
                if(data === "not found"){
                    alert('Incorrect Password or Username');
                } else{
                    setUser(data);
                    alert('Login successfull!');
                }
            }
            setRedirect(true);
        }catch(e){
            alert('Login failed!!');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" 
                           placeholder="your_id@email.com"
                           value={email}
                           onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" 
                           placeholder="password"
                           value={password}
                           onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account? <Link className="underline text-bn" to={'/register'}>Register Now</Link>    
                    </div>
                </form>
            </div>
        </div>
    );
}