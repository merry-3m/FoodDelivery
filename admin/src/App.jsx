import React from 'react'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import {Routes,Route} from "react-router-dom"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  // ` backend url
  const url = "https://food-delivery-backend-dpw6.onrender.com";
  return (
    <>
    <ToastContainer />
    
    <NavBar/>
    <hr />
    <div className="app_content">
      <SideBar/>
      <Routes>
        <Route path="/add" element={<Add url={url}/>}/>
        <Route path="/list" element={<List url={url}/>}/>
        <Route path="/order" element={<Orders url={url}/>}/>

      </Routes>
    </div>
    </>
  )
}

export default App
