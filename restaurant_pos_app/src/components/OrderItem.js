import React, { useState } from 'react'
import "../styles/OrderItem.css"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../store';

function OrderItem({ name, price, index }) {
  const params = useParams()
    const dispatch = useDispatch();
    const tableId = parseInt(params.tableId)
    const table = useSelector(state => state.table.filter(table => table.tableId === tableId))
    const item = table[0].customerOrders.find(item => item.name === name)
    function handleIncrease(e){
        dispatch(tableActions.addFoodItems({ tableId, foodItem : {name, count : item ?  item.count + 1 : 1, price} }))
    }
    function handleDecrease(e){
        dispatch(tableActions.removeFoodItems({ tableId, foodItem : {name, count : item ? item.count - 1 : 0, price} }))
    }
    function handleDelete(e){
      dispatch(tableActions.deleteFoodItem({tableId, foodItem : {name, count : item.count, price}}))
    }
  return (
    <div className='OrderItem'>
      <div className="OrderItemTop">
        <div className="left">
          <h2>{`${index}. ${name}`}</h2>
        </div>
        <div className="right">
          <h2>{`₹${price * item.count}`}</h2>
        </div>
      </div>
      <div className="OrderItemBottom">
        <div className="counter">
          <span onClick={handleIncrease}><AddIcon sx={{background: "#2c335c", borderRadius: "5px", padding: "5px"}}/></span>
          <span>{item ? item.count : 0}</span>
          <span onClick={handleDecrease}><RemoveIcon sx={{background: "#2c335c", borderRadius: "5px", padding: "5px"}}/></span>
        </div>
        <DeleteIcon onClick={handleDelete}/>
      </div>
    </div>
  )
}

export default OrderItem
