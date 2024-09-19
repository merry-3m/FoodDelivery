import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  

  // ` store data
  const [list, setList] = useState([]);

  // ` fetch data from API
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      // console.log(response);

      setList(response.data.data);
    } else {
      toast.error(response?.data?.message);
    }
  };

  // ` delete food item from the API
  const removeFood = async (id) => {
  const response = await axios.post(`${url}/api/food/remove`,{
    id:id
  })
  if (response.data.success) {
    toast.success("Food item deleted successfully");
    
    fetchList();
    } else {
      toast.error(response?.data?.message);
  }
  };

  // ` run this function when the component mounts or when the list changes
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex_col">
      <p>All Foods List</p>
      {/* list table */}
      <div className="list_table">
        <div className="list_table_format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* map through the list and create table rows */}
        {list.map((item, i) => {
          return (
            <div key={i} className="list_table_format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cross" onClick={()=>removeFood(item._id)}>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
