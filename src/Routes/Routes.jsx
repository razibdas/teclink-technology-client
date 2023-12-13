import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Secret/Secret";
import TrendingProducts from "../pages/Home/TrendingProducts/TrendingProducts";
import Trends from "../pages/Trends/Trends";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddProduct from "../pages/AddProduct/AddProduct";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import UpdateProduct from "../pages/Dashboard/UpdateProduct/UpdateProduct";
import Payment from "../pages/Dashboard/Payment/Payment";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: ({params}) => fetch('http://localhost:5000/feature')
            
        },
        {
          path: '/trending',
          element: <TrendingProducts></TrendingProducts>,
          loader: ({params}) => fetch('http://localhost:5000/trending')
        },
        {
          path: '/trends',
          element: <Trends></Trends>,
          loader: ({params}) => fetch('http://localhost:5000/trendss')
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        },
        {
          path: '/feature/:id',
          element: <PrivateRoute><ProductDetail></ProductDetail></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/feature/${params.id}`)
        },
       
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'addProduct',
          element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
        },
        {
          path: 'updateProduct/:id',
          element: <UpdateProduct></UpdateProduct>,
          loader: ({params}) => fetch(`http://localhost:5000/carts/${params.id}`)
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },

        // admin routes
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
       
      ]
    }
  ]);