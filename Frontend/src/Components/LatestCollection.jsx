import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'

const LatestCollection = () => {
    const {products}=useContext(ShopContext);
    console.log(products);  
  return (
    <div>LatestCollection</div>
  )
}

export default LatestCollection