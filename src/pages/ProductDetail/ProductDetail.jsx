import { useLoaderData } from "react-router-dom";

const ProductDetail = () => {
    const { name, image, price } = useLoaderData();

    return (
        <div className="pt-24 flex justify-center">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Price: ${price}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary w-full">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;