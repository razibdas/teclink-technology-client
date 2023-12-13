import { FaShoppingCart, FaCartArrowDown, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-gray-200">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/userProfile"> <CgProfile />Statistics Page</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users"> <FaShoppingCart></FaShoppingCart>Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addProduct"> <FaCartArrowDown />Manage Coupons</NavLink>
                            </li>
                        </>
                            : isModerator ? <> <li>
                                <NavLink to="/dashboard/userProfile"> <CgProfile />Product Review Queue</NavLink>
                            </li>
                                <li>
                                    <NavLink to="/dashboard/cart"> <FaShoppingCart></FaShoppingCart>Reported Contents</NavLink>
                                </li>
                                
                                </> :
                                <>
                                    <li>
                                        <NavLink to="/dashboard/userProfile"> <CgProfile />My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/cart"> <FaShoppingCart></FaShoppingCart>My Product</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addProduct"> <FaCartArrowDown />Add Products</NavLink>
                                    </li>
                                </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;