import React from 'react'
import "./navBar.css"
import {assets} from "../../assets/assets"

const NavBar = () => {
  return (
    <div className='nav_bar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default NavBar