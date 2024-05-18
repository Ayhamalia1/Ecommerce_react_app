import { createContext, useEffect, useState } from "react";
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";


export const UserContext=createContext(null)
export  function UserContextProvider({children}){
const [user,setUser]=useState(null);
const token=localStorage.getItem('token')
const DecodeUserToken=()=>{
  let decode=jwtDecode(localStorage.getItem('token'));
  setUser(decode)
}
const UserData=async()=>{
    try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
        {headers:{authorization:`Tariq__${token}`}}
        )
         return data;
    }
    catch(e){

    }
}
    return <UserContext.Provider value={{DecodeUserToken,user,setUser,UserData}}>
        {children}
    </UserContext.Provider>
}


