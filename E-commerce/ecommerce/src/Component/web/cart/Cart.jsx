import axios from "axios";
import { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export const CartContext=createContext(null)
export function CartContextProvider({children}){
    let token=localStorage.getItem("token")
    let [count,setCount]=useState(0)

    const addToCartContext=async(productId)=>{
        try{
            const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
                if(data.message=="success"){
                    toast.success('Product added successfully', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });   
                        setCount(++count);
                         }
            
             return data;
        }
        catch(e){
            toast.error(`${e.response.data.message}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            

        }

        
    }
    const getCartProductContext=async()=>{
        try{
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}}
            )
            return data
        }
        catch(e){
            toast.error(`${e.response.data.message}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

    }
    const deleteCartProductContext=async(productId)=>{
        try{
            const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            setCount(0)
            return data
        }
        catch(e){
            toast.error(`${e.response.data.message}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
    const clearAll=async()=>{
        try{
            const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            setCount(0)
            return data
        }
        catch(e){
            toast.error(`${e.response.data.message}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

    }
    return <CartContext.Provider value={{addToCartContext,getCartProductContext,deleteCartProductContext,count,setCount,clearAll}}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
}