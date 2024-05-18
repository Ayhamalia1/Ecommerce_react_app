import React, { useContext, useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useNavigate,} from "react-router-dom";
import Layout from './Component/layout/Layout';
import Layoutdashboard from './Component/layout/Layoutdashboard';
import Home from './Component/web/home/Home';
import Categories from './Component/web/categories/Categories';
import HomeDashboard from './Component/dashboard/home/Home';
import Register from './Component/web/register/Register';
import Login from './Component/web/login/Login';
import Loader from './Component/loader/Loader';
import CategoryDetails from './Component/web/categories/CategoryDetails';
import Product from './Component/web/categories/Product';
import CartView from './Component/web/cart/CartView';
import ProtectedRoute from './Component/protectedRoute/ProtectedRoute';
import Auth from './Component/protectedRoute/Auth';
import Profile from './Component/web/profile/Profile';
import UserInfo from './Component/web/profile/UserInfo';
import UserContact from './Component/web/profile/UserContact';
import ForgotPassword from './Component/forgotPassword/ForgotPassword';
import SendCode from './Component/forgotPassword/SendCode';
import { CartContext } from './Component/web/cart/Cart';
import { useQuery } from 'react-query';
import Order from './Component/web/order/Order';

export default function App() {



  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout  />,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: `products/category/:id`,
        element:<CategoryDetails/>
        
      },
      {
        path: "product/:id",
        element: <Product />
      }
      ,
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element:<Login />
      },
      {
        path: "/forgotPassword",
        element:<ForgotPassword/>
      },
      {
        path: "/sendCode",
        element:<SendCode/>
      },
      {
        path: "/cart",
        element:<ProtectedRoute><CartView /></ProtectedRoute> 
      },
      
          {
            path:"order",
            element:<Order/>
          },
      {
        path: "/proflie",
        element:<ProtectedRoute><Profile/></ProtectedRoute> ,
        children:[
          {
            path:"",
            element:<UserInfo/>
          },
          {
            path:"contact",
            element:<UserContact/>
          }
        ]
      },
      {
        path: "*",
        element: <h2>Page not found web</h2>
      },

    ]
  },
  {
    path: "/dashboard",
    element: <Layoutdashboard/>,
    children:[
      {
        path: "home",
        element: <HomeDashboard />
      }
      ,
      {
        path: "*",
        element: <h2>Page not found Dashboard</h2>
      }
    ]
  },
]);
const {getCartProductContext,setCount,count}=useContext(CartContext)


useEffect(async()=>{
  const res=await getCartProductContext()
  let c=res.count
  setCount(c)
  
}
,[])


  return (

    <RouterProvider router={router} />





  )
}

