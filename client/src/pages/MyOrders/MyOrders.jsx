import React, { useContext, useEffect, useState } from 'react'
import "./myOrders.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import {assets} from "../../assets/images/assets"

const MyOrders = () => {

    // ` store the fetched data from server
    const [data, setData] = useState([]);
    // ` get url and token from context
    const { url, token } = useContext(StoreContext);

    //` fetch data from server.
    const fetchOrders = async ()=>{
        const response = await axios.post(`${url}/api/order/user-orders`,{},{
            headers: { token }
        })
        setData(response.data.data)
        // console.log(response.data.data);  
    }
     

    // ` call fetchOrders when the component mounts
    useEffect(() => {
        if(token) {
            fetchOrders();
        } 
    }, [token])

  return (
    <div className='my_orders'>
        <h2>My Orders</h2>
        {/* container */}
        <div className="container">
            {
                data.map((order,i)=>(
                    <div key={i} className='my_orders_order'>
                        <img src={assets.parcel_icon} alt="" />
                        {/* map through the item because it's array value inside data array value */}
                        <p>{order.items.map((item,index)=>{
                            // ` access the last item
                            if(index ===order.items.length-1 ){
                                return `${item.name} x ${item.quantity} `

                            }
                            else{
                                 return `${item.name} x ${item.quantity} , `
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        {/* hex code for bullet => &#x25cf;*/}
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        {/* button to track order */}
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>

                ))
            }
        </div>
        
    </div>
  )
}

export default MyOrders