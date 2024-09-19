import React, { useState } from 'react'
import "./home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {

  // TODO: Implement the logic to fetch the latest food items from the API and display them on the Home page.

  const [category, setCategory] = useState("All")

  return (
    <div>
       <Header/> 
       <ExploreMenu category={category} setCategory={setCategory}/>
       <FoodDisplay category={category} setCategory={setCategory}/>
       <AppDownload/>
    </div>
  )

}

export default Home