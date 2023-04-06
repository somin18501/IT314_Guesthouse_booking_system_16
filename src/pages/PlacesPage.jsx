import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage(){
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header,description){
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title','Title for your Residence. Should be short & Unique')}
                        <input type="text" 
                               value={title}
                               onChange={ev => setTitle(ev.target.value)}
                               placeholder="title, Eg: The Better Inn" />
                        
                        {preInput('Address','Address to your Residence')}
                        <input type="text" 
                               value={address}
                               onChange={ev => setAddress(ev.target.value)}
                               placeholder="address" />
                        
                        {preInput('Photos','Display your eminities')}
                        <div className="flex gap-2"> 
                            <input type="text" 
                                   value={photoLink}
                                   onChange={ev => setPhotoLink(ev.target.value)}
                                   placeholder="Add Images using link (.jpg/.png)"/>
                            <button onClick={addPhotoByLink} className="bg-blue-600 text-white px-4 rounded-2xl">Add</button>
                        </div>
                        
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-col-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link =>(
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div> 
                            ))}
                            <button className="flex items-center flex-col gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            Upload</button>
                        </div>

                        {preInput('Description','Details about Residence')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                        {preInput('Perks','Select Perks that your Residence Offers')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>

                        {preInput('Extra Info','Other Rules & Regulations')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        
                        {preInput('Check In & Check Out Times','Add check in & check out timings(24-hour clock format) keeping window for cleaning/maintenance between guests in-mind')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="time" 
                                       value={checkIn} 
                                       onChange={ev => setCheckIn(ev.target.value)}
                                       placeholder="18:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="time" 
                                       value={checkOut}
                                       onChange={ev => setCheckOut(ev.target.value)}
                                       placeholder="09:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Guest Capacity</h3>
                                <input type="number"
                                       value={maxGuests}
                                       onChange={ev => setMaxGuests(ev.target.value)}
                                       placeholder="per room"/>
                            </div>
                        </div>

                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}