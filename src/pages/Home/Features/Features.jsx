import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Features = ({ feature }) => {
    const { _id, name, image, price } = feature;
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
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
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                     
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
                    // Swal.fire({
                    //     title: "deleted",
                    //     text: 'your file has been deleted',
                    //     icon: 'success'
                    // })
                    navigate('/login', {state: {from: location}})
                }
            });
        }
    }
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <Link to={`/feature/${_id}`}>
                    <h2 className="card-title">{name}</h2>
                    <p>Price: ${price}</p>
                </Link>
                <div>
                    <button className="btn btn-outline btn-accent">Upvote</button>
                </div>
                <div className="card-actions w-full">
                    <button onClick={() => handleAddToCart(feature)}
                        className="btn btn-secondary w-full">Add Product</button>
                </div>
            </div>
        </div>
    );
};

export default Features;