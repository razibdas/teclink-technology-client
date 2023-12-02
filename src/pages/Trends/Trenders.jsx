

const Trenders = ({ trend }) => {
    const { name, image, price } = trend;
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Price: ${price}</p>
                    <div>
                        <button className="btn btn-outline btn-accent">Upvote</button>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary w-full">Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trenders;