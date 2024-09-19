import React from "react";
import "./order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const Orders = ({ url }) => {
  // ` create state to store the data from server
  const [orders, setOrders] = useState([]);

  // ` fetch orders data from server
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
      console.log("Orders:", orders);
      toast.success(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  // ` update the order status
  const statusHandler = async (event , orderId)=>{
    // console.log(event , orderId);
    // ` when  we change the option from admin it will changed in server to

    const response = await axios.post(`${url}/api/order/status`,{
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      toast.success("Order status updated successfully");
      // ` fetch data again after update
       await fetchAllOrders();
    }
    

  }

  // ` call the function when the component mounts
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      {/* map the order */}
      <div className="order_list">
        {orders.map((order, i) => (
          <div className="order_item" key={i}>
            <img src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              {/* order item food */}
              <p className="order_item_food">
                {order.items.map((item, index) => {
                  // ` the last item won't have coma
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              {/* order item name */}
              <p className="order_item_name">
                {` ${order.address.firstName} ${order.address.lastName}`}
              </p>
              {/* user address */}
              <div className="order_item_address">
                <p>{`${order.address.street}, `}</p>
                <p>{` ${order.address.city}, ${order.address.state}, ${order.address.country} - ${order.address.zipCode}`}</p>
              </div>

              {/* user phone  */}
              <p className="order_item_phone">{order.address.phone}</p>
            </div>

            {/* number of items */}
            <p>Items: {order.items.length}</p>
            {/* order amount(price) */}
            <p>${order.amount}</p>
            {/* order status */}
            <select onChange={()=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
