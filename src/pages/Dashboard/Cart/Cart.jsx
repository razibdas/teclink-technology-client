import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import CartEdit from "./CartEdit";

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [selectedCart, setSelectedCart] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    });

    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
    const axiosSecure = useAxiosSecure();

    const openModal = (item) => {
        setSelectedCart(item);
        setIsOpen(true);
    };

    const handleEditCart = (id) => {
        const selectedCartItem = cart.find((item) => item._id === id);
        setSelectedCart(selectedCartItem);
        setIsOpen(true);
    };
    
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    return (
        <div>
            <CartEdit
                refetch={refetch}
                selectedCart={selectedCart}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <div className="flex justify-evenly mt-8">
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: ${totalPrice.toFixed(2)}</h2>
                {cart.length ? (
                    <Link to="/dashboard/payment">
                        <button className="btn btn-outline btn-secondary">Payment</button>
                    </Link>
                ) : (
                    <button disabled className="btn btn-outline btn-secondary">
                        Payment
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>$ {item.price}</td>
                                <td>{item.description}</td>
                                <th>
                                    <Link onClick={() => handleEditCart(item._id)}>
                                        <button className="btn btn-ghost btn-lg">
                                            <IoCreate />
                                        </button>
                                    </Link>
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <RiDeleteBinFill />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
