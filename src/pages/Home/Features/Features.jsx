import { Link } from "react-router-dom";

const Features = ({ feature }) => {
    const { name, image, price } = feature;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title"><Link to="/details">{name}</Link></h2>
                <p>Price: ${price}</p>
                <div>
                <button className="btn btn-outline btn-accent">Upvote</button>
                </div>
                <div className="card-actions w-full">
                    <button className="btn btn-secondary w-full">Add Product</button>
                </div>
            </div>
        </div>
    );
};

export default Features;