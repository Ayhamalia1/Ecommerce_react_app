import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { UserContext } from '../userContext/UserContext'

function UserInfo() {
    const {UserData}=useContext(UserContext)
    let {data}=useQuery("userData",UserData)
  return (
    <div className="main-content">
    <img src={data&&data.user.image.secure_url}/>
    <h2>{data&&data.user.userName}</h2>
    </div>
      )
}

export default UserInfo