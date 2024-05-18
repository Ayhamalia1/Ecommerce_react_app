import React from 'react'
import Navbar from '../dashboard/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../dashboard/footer/Footer'

export default function Layoutdashboard() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
