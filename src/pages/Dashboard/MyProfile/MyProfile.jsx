import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    // Example: Setting subscription status and amount
    const [isSubscribed, setIsSubscribed] = useState(false);
    const subscriptionAmount = 30;

    const handleSubscribe = () => {
        // Logic to handle subscription
        setIsSubscribed(true);
    };

    return (
        <div className="mt-20">
            <div className="navbar-end flex justify-center mx-auto">
                <div className="flex justify-center items-center ">
                    {user && (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="">
                                <div className="rounded-full relative z-50 flex justify-center">
                                    <img
                                        className="w-40 -mb-20 h-40 rounded-full"
                                        src={user?.photoURL}
                                        alt="User Profile"
                                    />
                                </div>
                                <div className="artboard rounded-2xl artboard-horizontal phone-3 pt-24 text-2xl justify-center flex" style={{ backgroundImage: `url('https://i.ibb.co/k6N86FX/neom-e-OWabm-CNEdg-unsplash.jpg')`, backgroundSize: 'cover' }}>
                                    {user && (
                                        <>
                                            <p>Name: {user?.displayName}</p>
                                            <br />
                                            <div className="ml-4">
                                                <p>Email: {user?.email}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {!isSubscribed && (
                                    <div>
                                        <Link to='/dashboard/payment'>
                                            <button className="btn btn-secondary" onClick={handleSubscribe}>
                                                Subscribe ${subscriptionAmount}
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </label>
                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-4 backdrop-brightness-5 rounded-box w-40 mt-4">
                                {/* Add other menu items or actions */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
