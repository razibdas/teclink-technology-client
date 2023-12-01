import { useLoaderData } from "react-router-dom";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";




const Home = () => {
    const featured = useLoaderData();

    return (
        <div>
            <Banner></Banner>
            <p className="flex justify-center mt-12 text-3xl font-bold">Feature</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mx-16 mt-12">
                {
                    featured.map(feature => <Features key={featured.id} feature={feature}></Features>)
                }
            </div>
        </div>
    );
};

export default Home;