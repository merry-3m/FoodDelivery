import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
import axios from "axios"
import {  toast } from 'react-toastify';

const Add = ({url}) => {
  
  // ` to store the image
  const [image, setImage] = useState(false);

  // ` to store the product data
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    // image: null,
  });
  // ` to handle the input change
  const onChangeHandler = (e) => {
    // ` get the name and value from the event object, b/c setData is expecting key-value pair

    const key = e.target.name; //:  Get the input field name (e.g., "name", "description")
    const value = e.target.value; //:Get the input field value
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  // useEffect (()=>{
  //  console.log(data);

  // },[data])

  // ` to handle form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault(); //: To prevent the form from refreshing the page
    // ` form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    // ` call api point by using axios
    const response = await axios.post(`${url}/api/food/add`, formData);
    // ` if the response is ok, show success message
    if (response.data.success) {
      toast.success(response?.data?.message);
      // ` reset the form
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);

    } else {
      // ` show error message if the response status is not 200
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="add">
      <form className="flex_col" onSubmit={onSubmitHandler}>
        <div className="add_img_upload flex_col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {/* URL.createObjectURL() is used to generate a local URL */}
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          {/* input */}
          {/* e.target.files[0] => to select only one file */}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        {/* name */}
        <div className="add_product_name flex_col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            type="text"
            value={data.name}
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        {/* description */}
        <div className="add_product_description flex_col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        {/* price & category */}
        <div className="add_category_price ">
          <div className="add_category flex_col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          {/* price */}
          <div className="add_price flex_col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        {/* submit */}
        <button className="add_btn" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
