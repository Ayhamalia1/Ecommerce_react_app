import React from 'react'
import NavbarWeb from '../web/navbar/NavbarWeb'
import Footer from '../web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({user,logout}) {
  return (
    <>
    <NavbarWeb user={user} logout={logout} />
    <Outlet/>
    <Footer/>
    </>
  )
}
