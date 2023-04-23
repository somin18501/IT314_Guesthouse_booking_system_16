import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function FilteredPage(){
    const {str} = useParams();
    const [sortState, setSortState] = useState('price');
    const [places,setPlaces] = useState([]);
    const [places2,setPlaces2] = useState([]);
    const [places3,setPlaces3] = useState([]);
    const [redirect1,setRedirect1] = useState(false);
    const [redirect2,setRedirect2] = useState(false);
    const [redirect3,setRedirect3] = useState(false);

    function doSort(a,b){
        if(sortState == 'price'){
            let x = a.price;
            let y = b.price;
            if(x<y){return 1;}   // currently descending order
            if(x>y){return -1;}
            return 0;
        }
        if(sortState == 'title'){
            let x = a.title;
            let y = b.title;
            if(x>y){return 1;}  // currently ascending order
            if(x<y){return -1;}
            return 0;
        }
    }

    useEffect(()=>{
        axios.get('/places?city='+str).then(response=>{
            setPlaces([...response.data]);
            if(response.data.length === 0) setRedirect1(true);    
        });
        axios.get('/places?state='+str).then(response=>{
            setPlaces2([...response.data]);
            if(response.data.length === 0) setRedirect2(true);
        });
        axios.get('/places?country='+str).then(response=>{
            setPlaces3([...response.data]);
            if(response.data.length === 0) setRedirect3(true);
        });
    }, [str]);

    if(redirect1 && redirect2 && redirect3){
        return <Navigate to={'/'} />;
    }

    return (
        <div>
            <div className="flex justify-around my-8">
                <select className="border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300" defaultValue={'price'} onChange={(ev) => setSortState(ev.target.value)}>
                    <option value='price'>Price</option>
                    <option value='title'>Title</option>
                </select>
            </div>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.length>0 && places.sort(doSort).map(place=>(
                    <Link to={'/place/'+place._id}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                            )}
                        </div>
                        <h2 className="font-bold">{place.city+", "+place.state+", "+place.country}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">Rs {place.price}/night</span> 
                        </div>
                    </Link>
                ))}
                {places2.length>0 && places2.sort(doSort).map(place=>(
                    <Link to={'/place/'+place._id}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                            )}
                        </div>
                        <h2 className="font-bold">{place.city+", "+place.state+", "+place.country}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">Rs {place.price}/night</span> 
                        </div>
                    </Link>
                ))}
                {places3.length>0 && places3.sort(doSort).map(place=>(
                    <Link to={'/place/'+place._id}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                            )}
                        </div>
                        <h2 className="font-bold">{place.city+", "+place.state+", "+place.country}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">Rs {place.price}/night</span> 
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}