import { Link, useLoaderData } from "react-router-dom";
import TrendingCard from "./TrendingCard";
import Banners from "../Banner/Banners";




const TrendingProducts = () => {
    const trendings = useLoaderData()
    return (
        <div className="">
            <Banners></Banners>
            <div className="mt-12">
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-96">
                    {
                        trendings.map(trending => <TrendingCard key={trending.id} trending={trending}></TrendingCard>)
                    }
                </div>
            </div>
            <div className="text-center mt-10">
               <Link to="/trends"> <button className="btn btn-primary">Show All</button></Link>
            </div>
        </div>
    );
};

export default TrendingProducts;