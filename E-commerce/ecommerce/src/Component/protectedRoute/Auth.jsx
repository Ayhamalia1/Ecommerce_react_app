import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Auth({children}) {
let token=localStorage.getItem('token')
let navigate =useNavigate()
if(token){
    return navigate(-1)
}
return <Navigate to='login' />
}
