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
          path: '/details',
          element: <ProductDetail></ProductDetail>
        }
      ]
    },
  ]);