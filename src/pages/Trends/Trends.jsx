
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Banners from "../Home/Banner/Banners";
import Trenders from "./Trenders";


const Trends = () => {
    const allTrendings = useLoaderData();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredTrendings = allTrendings.filter((trend) =>
        trend.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // const trendings = allTrendings.slice(startIndex, endIndex);

    const trendings = filteredTrendings.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        // Step 3: Update state with search text
        setSearchText(searchText);
    };

    return (
        <div>
            <Banners></Banners>
            <form onSubmit={handleSearch} className="mt-10 justify-center flex">
                <input type="text" name="search" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                <input type="submit" value="Search" className="btn  btn-outline join-item rounded-r-full" />
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-96 mt-10">
                {trendings.map(trend => (
                    <Trenders key={trend.id} trend={trend}></Trenders>
                ))}
            </div>
            <div className="pagination flex justify-center">
                <div className="text-center btn bg-orange-400">
                    <button className=""
                        onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>{currentPage}</span>
                </div>
                <div className="text-center ">
                    <button className="btn bg-orange-400"
                        onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                        disabled={endIndex >= allTrendings.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Trends;
