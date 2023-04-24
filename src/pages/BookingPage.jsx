import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";

export default function BookingPage(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    const [showAll,setShowAll] = useState(false);
    const [currDate,setCurrDate] = useState('');
    const [redirect,setRedirect] = useState(false);

    
    const [feedback,setFeedback] = useState('');
    const [addedFeedback,setAddedFeedback] = useState([]);
    const [placeId,setPlaceId] = useState('');

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/bookings/'+id).then(response => {
            setBooking(response.data)
            setAddedFeedback(response.data.place.feedback);
            setPlaceId(response.data.place._id);
        })
        let ts = Date.now();
        let date_time = new Date(ts);
        let date = date_time.getDate();
        let month = date_time.getMonth() + 1;
        let year = date_time.getFullYear();
        setCurrDate(year + "-" + month + "-" + date);
    }, [id]);

    async function cancelBooking(){
        if(confirm("Sure? want to Cancel Booking") == true){
            const response = await axios.delete('/deletebooking/'+id);
            setRedirect(`/account/bookings`);
        }
    }

    async function saveFeedback(ev){
        ev.preventDefault();
        await axios.put('/places/feedback', {placeId, feedback:[...addedFeedback, feedback]});
        setRedirect(`/account/bookings`);
    }

    if(redirect) return <Navigate to={redirect}/>

    // doubt of about this line
    if(!booking) return '';
    
    if(showAll){
        return (
            <div className="absolute inset-0 text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-24">Photos of {booking.place.title}</h2>
                        <button onClick={() => setShowAll(false)} className="fixed right-12 top-8 py-2 px-2 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {booking.place?.photos?.length > 0 && booking.place.photos.map(photo=>(
                        <div>
                            <img src={'https://drive.google.com/uc?id='+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="my-8"> 
            <h1 className="text-3xl">{booking.place.title}</h1>
            <a className="flex gap-1 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+booking.place.title+', '+booking.place.address+', '+booking.place.city+', '+booking.place.state+', '+booking.place.country}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                {booking.place.address+", "+booking.place.city+", "+booking.place.state+", "+booking.place.country}
            </a>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl">
                <h2 className="flex justify-center font-bold text-xl mb-2">Your booking information</h2>
                <div className="flex gap-2 border-t border-gray-300 mt-2 py-2 justify-center text-xl">
                    <b className="font-semibold">From</b> 
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        {format(new Date(booking.checkIn),"yyyy-MM-dd")}
                    </div>
                    <b className="font-semibold">To</b> 
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        {format(new Date(booking.checkOut),"yyyy-MM-dd")}
                    </div>
                </div>
                <div className="flex gap-2 font-semibold bg-primary p-4 text-white rounded-2xl justify-center">
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                        Nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} 
                    </div>
                    |
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Price: Rs {booking.price}
                    </div>
                    |
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        Guests: Rs {booking.numOfGuests}
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[1fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {booking.place.photos?.[0] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+booking.place.photos[0]} alt="" />
                        )}
                    </div>
                    <div>
                        {booking.place.photos?.[1] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+booking.place.photos[1]} alt="" />
                        )}
                    </div>
                    <div>
                        {booking.place.photos?.[2] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+booking.place.photos[2]} alt="" />
                        )}
                    </div>
                    <div>
                        {booking.place.photos?.[3] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+booking.place.photos[3]} alt="" />
                        )}
                    </div>
                </div>
                <button onClick={() => setShowAll(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                    </svg>
                    Show All
                </button>
            </div>
            <div className="mt-6">
                {differenceInCalendarDays(new Date(booking.checkIn), new Date(currDate))>1 && (
                    <button className="primary" onClick={cancelBooking}>Cancel</button>
                )}

                {differenceInCalendarDays(new Date(currDate),new Date(booking.checkOut))<=7 && differenceInCalendarDays(new Date(currDate),new Date(booking.checkOut))>0 && (
                    <form onSubmit={saveFeedback}>
                        <textarea placeholder="Please give your valueable feedback for Guesthouse" value={feedback} onChange={ev => setFeedback(ev.target.value)}/>
                        <button className="primary">Submit Feedback</button>
                    </form>
                )}
            </div>
        </div>
    );
}