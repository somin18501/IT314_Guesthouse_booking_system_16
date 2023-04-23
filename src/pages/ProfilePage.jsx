import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    const [redirect,setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    async function logout(){
        await axios.post('/logout');
        setRedirect('/'); // if this first then redirect to account page
        setUser(null); // if this first then redircted to login page 
    }

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <AccountNav />
            <div className="max-w-lg mx-auto">
                <div className="bg-gray-200 shadow p-4 rounded-2xl">
                    Name: {user.name}<br/>
                    Email: {user.email}<br/>
                </div>
            </div>
            <div className="text-center">
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        </div>
    );
}
