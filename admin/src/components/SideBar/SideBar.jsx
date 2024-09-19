import React from 'react'
import "./sideBar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar_option">
        <NavLink to="/add" className="side_bar_options">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="side_bar_options">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/order" className="side_bar_options">
          <img src={assets.order_icon} alt="" />
          <p>Order Items</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default SideBar