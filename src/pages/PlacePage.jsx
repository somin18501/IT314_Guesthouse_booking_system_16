import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage(){
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    const [showAll,setShowAll] = useState(false);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            setPlace(response.data)
        })
    }, [id]);
    
    // doubt of about this line
    if(!place) return '';

    if(showAll){
        return (
            <div className="absolute inset-0 text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-24">Photos of {place.title}</h2>
                        <button onClick={() => setShowAll(false)} className="fixed right-12 top-8 py-2 px-2 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        {place?.photos?.length > 0 && place.photos.map(photo=>(
                            <div className="my-2 flex justify-around">
                                <img src={'https://drive.google.com/uc?id='+photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-3 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.title+', '+place.address+', '+place.city+', '+place.state+', '+place.country}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                {place.address+", "+place.city+", "+place.state+", "+place.country}
            </a>

            <div className="relative">
                <div className="grid gap-2 grid-cols-[1fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+place.photos[0]} alt="" />
                        )}
                    </div>
                    <div>
                        {place.photos?.[1] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+place.photos[1]} alt="" />
                        )}
                    </div>
                    <div>
                        {place.photos?.[2] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+place.photos[2]} alt="" />
                        )}
                    </div>
                    <div>
                        {place.photos?.[3] && (
                            <img className="aspect-square object-cover" src={'https://drive.google.com/uc?id='+place.photos[3]} alt="" />
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

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>

                    <div className="mt-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    
                    <div className="flex justify-between">
                        <div className="my-4">
                            <h2 className="font-semibold text-2xl">Perks</h2>
                            {place?.perks?.length > 0 && place.perks.map(perk=>(
                                <div>
                                    {perk === "wifi" && (
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                            </svg>
                                            <span>Free Wifi</span>
                                        </div>
                                    )} 
                                    {perk === "parking" && (
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                            </svg>
                                            <span>Parking Spot</span>
                                        </div>
                                    )} 
                                    {perk === "pets" && (
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                            <span>Pets Prohibited</span>
                                        </div>
                                    )} 
                                    {perk === "tv" && (
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                            <span>TV/AC Rooms</span>
                                        </div>
                                    )} 
                                    {perk === "laundary" && (
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                                            </svg>
                                            <span>Laundry Spot</span>
                                        </div>
                                    )} 
                                    {perk === "club" && (
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                                            </svg>
                                            <span>Club House</span>
                                        </div>
                                    )} 
                                </div>
                            ))}
                        </div>

                        <div className="my-4 md:mr-4 lg:mr-20">
                            <h2 className="font-semibold text-2xl">Lodge Details</h2>
                            Check-In Time: {place.checkIn} <br />
                            Check-Out Time: {place.checkOut} <br />
                            Max no. of Guests/room: {place.maxGuests}
                        </div>
                    </div>
                </div>
                
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>

            <div className="my-4">
                <h2 className="font-semibold text-2xl mb-2">Reviews</h2>
                {place?.feedback?.length > 0 && place.feedback.map(feed=>(
                    <div className="flex gap-1 item-center">
                        <li>{feed}</li>
                    </div>
                ))}
            </div>

            <div className="bg-white -mx-8 px-8 py-6 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-4">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    );
}