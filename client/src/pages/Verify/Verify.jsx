import React, { useContext, useEffect } from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
const Verify = () => {
    // ` to find url parameter. by using useSearchParams we can get the info from the url
   const[searchParams, setSearchParams]= useSearchParams();
   const navigate = useNavigate()
   const success = searchParams.get("success")
   const orderId = searchParams.get("orderId")
    // console.log(success, orderId)
    // ` get backend url from context
    const{url} = useContext(StoreContext)

    // ` verify payment
    const verifyPayment = async()=>{
        const response = await axios.post(`${url}/api/order/verify`,{
            success,
            orderId
        })
        // ` if payment is successful or failed,
        if(response.data.success){
            // `navigate user to my order page
            navigate(`/my-orders`)
        }else{
            // ` navigate to home page
            navigate(`/`)
        }
    }

    // ` run this function when the component mounts
    useEffect(()=>{
        verifyPayment()     
    },[])

  return (
    <div className='verify'>
        {/* create spinner */}
        <div className="spinner"></div>
        
    </div>
  )
}

export default Verify