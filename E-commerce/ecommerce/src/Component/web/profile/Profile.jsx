import React, { useContext } from 'react'
import { UserContext } from '../userContext/UserContext'
import { useQuery } from 'react-query'
import { NavLink } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

export default function Profile() {

  return (
    <>
    <div className="row profile">
      <div className="col-md-3">
         <div className="sidebar ">
            <ul>
                <li>
                <Link className='profileLink' to="">Info</Link>
                </li>
                <li>
                <Link   to='contact' className='profileLink'>Contact</Link>
                </li>
            </ul>
             </div>
        </div>
        <div className="col-md-8">
            <Outlet/>
        </div>
    </div>



    </>
  )
}
