import { Link, useParams } from "react-router-dom";

export default function PlacesPage(){
    const {action} = useParams();
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
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your Residence. Should be short & Unique</p>
                        <input type="text" placeholder="title, Eg: My appartment" />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Address to this Residence</p>
                        <input type="text" placeholder="address" />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">Display your eminities</p>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-col-6">
                            <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">+</button>

                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}