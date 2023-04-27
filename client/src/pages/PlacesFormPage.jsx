import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(1000);
    const [status,setStatus] = useState(true);
    const [redirect,setRedirect] = useState(false);
    
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setCity(data.city);
            setState(data.state);
            setCountry(data.country);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
            setStatus(data.status);
        });
    },[id]);

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

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, city, state, country,
            addedPhotos, description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price, status,
        };
        if(title.length != 0 && address.length !=0 && city.length !=0 && state.length != 0 && country.length != 0 && addedPhotos.length >0 && checkIn.length !=0 && checkOut.length !=0 && maxGuests > 0 && price > 0){
            if(id){ 
                // update place with given id
                // here to add id at begenning we are adding placedata in such way 
                await axios.put('/places', {id, ...placeData});
                setRedirect(true);
                alert('Changes have been Saved');
            }else{
                // new place place
                await axios.post('/places', placeData);
                setRedirect(true);
                alert('Your Guesthouse is Registered');
            }
        }
        else{
            alert('Please enter all details properly');
        }
    }

    async function removeHouse(){
        if(confirm("Sure? want to Remove Guest House") == true){
            const response = await axios.delete('/deleteplace/'+id);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>
            <div className="bg-gray-200 -mx-8 px-8 pt-8">
                <form onSubmit={savePlace}>
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

                    {preInput('City','City to your Residence')}
                    <input type="text" 
                            value={city}
                            onChange={ev => setCity(ev.target.value)}
                            placeholder="city" />
                    
                    {preInput('State','State to your Residence')}
                    <input type="text" 
                            value={state}
                            onChange={ev => setState(ev.target.value)}
                            placeholder="state" />

                    {preInput('Country','Country to your Residence')}
                    <input type="text" 
                            value={country}
                            onChange={ev => setCountry(ev.target.value)}
                            placeholder="country" />

                    {preInput('Photos','Display your eminities')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                    {preInput('Description','Details about Residence')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                    {preInput('Perks','Select Perks that your Residence Offers')}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>

                    {preInput('Extra Info','Other Rules & Regulations')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

                    {preInput('Availability Status','Tick mark if Booking Open')}
                    <input type="checkbox" 
                            checked={status}
                            onChange={ev => setStatus(ev.target.checked)}
                            placeholder="Available" />
                    
                    {preInput('Check In & Check Out Times','Add check in & check out timings(24-hour clock format) keeping window for cleaning/maintenance between guests in-mind')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
                        <div>
                            <h3 className="mt-2 -mb-1">Price per night</h3>
                            <input type="number"
                                    value={price}
                                    onChange={ev => setPrice(ev.target.value)}
                                    placeholder="per night"/>
                        </div>
                    </div>

                    <button className="primary my-4">Save</button>
                </form>
            </div>
            {id && (
                <button className="primary mt-4" onClick={removeHouse}>Remove</button>
            )}
        </div>
    );
}