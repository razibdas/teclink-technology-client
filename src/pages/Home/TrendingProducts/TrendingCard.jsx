import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";


const TrendingCard = ({ trending }) => {
    const { _id, name, image, price } = trending;
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="">
            <div className="">
                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img src={image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p>Price: ${price}</p>
                        <div>
                            <button className="btn btn-outline btn-accent">Upvote</button>
                        </div>
                        <div className="card-actions w-full">
                            <button onClick={() => handleAddToCart(trending)}
                                className="btn btn-secondary w-full">Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TrendingCard;