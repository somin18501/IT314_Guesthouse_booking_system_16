import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "./UserContext";
import StripeContainer from "./pages/StripeContainer";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numOfGuests,setNoOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [book,setbook] = useState(null);
    const {user} = useContext(UserContext);
    
    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    }, [user]);
    
    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    } 

    async function bookThisPlace(){
        if(user !== null){
            if(checkIn.length == 0 || checkOut.length == 0 || numOfGuests.length == 0 || name.length == 0 || phone.length <10 || phone.length > 10 || !/^\d+$/.test(phone)){
                alert('please enter all the details correctly')
            }
            else{
                const response = await axios.post('/bookings',{checkIn,checkOut,numOfGuests,name,phone,place:place._id,
                    price:(numberOfNights * place.price * Math.ceil(numOfGuests/place.maxGuests))
                });
                // console.log(response.data);
                setbook(response.data);
                setRedirect(true);
            }
        }
        else{
            alert('Please Login!');
            setRedirect(`/`);
        }
    }

    if(redirect){
        return (
            <div className="bg-white shadow p-4 rounded-2xl">
                <StripeContainer book={book} pid={place._id} onChange={setRedirect}/>
            </div>
        );
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: Rs {place.price} per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of Guests:</label>
                    <input type="number" value={numOfGuests} onChange={ev=>setNoOfGuests(ev.target.value)}/>
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Name:</label>
                        <input type="text" placeholder="your full name please" value={name} onChange={ev=>setName(ev.target.value)}/>
                        <label>Phone No. :</label>
                        <input type="tel" placeholder="enter with country code" value={phone} onChange={ev=>setPhone(ev.target.value)}/>
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Book Now
                {numberOfNights > 0 && (
                    <span> Rs {numberOfNights * place.price * Math.ceil(numOfGuests/place.maxGuests)}</span>
                )}
            </button>
        </div>
    );
}