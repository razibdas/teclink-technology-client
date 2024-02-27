import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const MyProfile = () => {
    const { user, logOut } = useContext(AuthContext);



    return (
        <div className="mt-20">
            <div className="navbar-end flex justify-center mx-auto">

                <div className="flex justify-center items-center ">


                    {user && (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className=""
                            >
                                <div className="rounded-full relative z-50 flex justify-center">

                                    <img
                                        className="w-40  -mb-20 h-40 rounded-full"
                                        src={user?.photoURL}
                                        alt="User Profile"

                                    />
                                </div>
                                {/* <div className="artboard  absolute bg-slate-400 phone-1">320×568</div> */}
                                <div className="artboard rounded-2xl artboard-horizontal phone-3 pt-24 text-2xl justify-center flex" style={{ backgroundImage: `url('https://i.ibb.co/k6N86FX/neom-e-OWabm-CNEdg-unsplash.jpg')` , backgroundSize: 'cover' }}>
                                    {user && <p>{user?.displayName}</p>}
                                </div>


                            </label>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content z-[1] p-4  backdrop-brightness-5 rounded-box w-40 mt-4"
                            >

                                {/* <div className="ml-10 -mt-10 text-center bg-gray-400 px-2 py-2 rounded-lg">
                                    {user && <p>{user?.displayName}</p>}
                                    <>
                                        {showDisplayName && <button className="text-white">{user.displayName}</button>}
                                        <button onClick={handleLogOut} className=" text-primary px-2 pt-2">
                                            Sign Out
                                        </button>
                                        <Link to="/dashboard/cart"> <button>Dashboard</button></Link>
                                    </>

                                </div> */}
                            </ul>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default MyProfile;
