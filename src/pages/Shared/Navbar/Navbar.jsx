// import { useContext, useState } from "react";

// import { AuthContext } from "../../../provider/AuthProvider";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {

//     const { user, logOut } = useContext(AuthContext);
//     const [showDisplayName, setShowDisplayName] = useState(false);

//     const handleLogOut = () => {
//         logOut()
//             .then(() => { })
//             .catch(error => console.log(error))
//     }

//     const navlinks = <>
//         <li><NavLink to="/">Home</NavLink></li>
//         <li><NavLink to="/dd">Products</NavLink></li>
//         <li><NavLink to="/secret">Secret</NavLink></li>
//         {user?.email ? <>
//             <li className="text-white"><button onClick={handleLogOut}>Log Out</button></li>
//         </>
//             : <li className="text-white"><Link to='/login'>Login</Link></li>
//         }

//     </>
//     return (
//         <>
//             <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//                         </label>
//                         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//                             {navlinks}
//                         </ul>
//                     </div>
//                     <a className="btn btn-ghost text-xl">TECLINK</a>
//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1">
//                         {navlinks}
//                     </ul>
//                 </div>
//                 <div className="navbar-end ">

//                     <div className="flex justify-center items-center ">

//                         {user && (
//                             <div className="dropdown dropdown-end">
//                                 <label
//                                     tabIndex={0}
//                                     className="btn btn-ghost btn-circle avatar ml-12"
//                                 >
//                                     <div className="w-10 rounded-full">
//                                         {/* {user && <img src={user?.photoURL} />} */}
//                                         <img
//                                             className="w-10 rounded-full"
//                                             src={user?.photoURL}
//                                             alt="User Profile"
//                                             onError={(e) => {
//                                                 e.target.src = defaultUserPhoto;
//                                             }}
//                                         />
//                                     </div>
//                                 </label>
//                                 <ul
//                                     tabIndex={0}
//                                     className="menu dropdown-content z-[1] p-4  backdrop-brightness-5 rounded-box w-40 mt-4"
//                                 >

//                                     <div className="ml-10 -mt-10 text-center bg-gray-400 px-2 py-2 rounded-lg">
//                                         {user && <p>{user?.displayName}</p>}
//                                         <>
//                                             {showDisplayName && <button className="text-white">{user.displayName}</button>}
//                                             <button onClick={handleLogOut} className=" text-primary px-2 pt-2">
//                                                 Sign Out
//                                             </button>
//                                         </>

//                                     </div>
//                                 </ul>
//                             </div>
//                         )}

//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };

// export default Navbar;



import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// import { FaShoppingCart } from "react-icons/fa";

// import useAdmin from "../../../../hooks/useAdmin";
import { AuthContext } from "../../../provider/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [showDisplayName, setShowDisplayName] = useState(false);
    // const [cart] = useCart();
    // const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOpitons = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Products</Link></li>
        <li><Link to="/trending">Trending</Link></li>
        <li><Link to="">Add Products</Link></li>
        {/* {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        } */}
        {/* <li>
            <Link to="/dashboard/cart">
                <button className="btn">
                <FaShoppingCart className="mr-2"/>
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li> */}

        {
            user ? <>
                <button onClick={handleLogOut} className="">LogOut</button>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>
    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl  bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOpitons}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">TECLINK</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOpitons}
                    </ul>
                </div>
                <div className="navbar-end ">

                    <div className="flex justify-center items-center ">

                        {user && (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar ml-12"
                                >
                                    <div className="w-10 rounded-full">
                                        {/* {user && <img src={user?.photoURL} />} */}
                                        <img
                                            className="w-10 rounded-full"
                                            src={user?.photoURL}
                                            alt="User Profile"
                                            onError={(e) => {
                                                e.target.src = defaultUserPhoto;
                                            }}
                                        />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content z-[1] p-4  backdrop-brightness-5 rounded-box w-40 mt-4"
                                >

                                    <div className="ml-10 -mt-10 text-center bg-gray-400 px-2 py-2 rounded-lg">
                                        {user && <p>{user?.displayName}</p>}
                                        <>
                                            {showDisplayName && <button className="text-white">{user.displayName}</button>}
                                            <button onClick={handleLogOut} className=" text-primary px-2 pt-2">
                                                Sign Out
                                            </button>
                                            <button>Dashboard</button>
                                        </>

                                    </div>
                                </ul>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;