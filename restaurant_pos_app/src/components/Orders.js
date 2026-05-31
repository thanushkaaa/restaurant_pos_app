import React from 'react'
import "../styles/Orders.css"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OrderItem from "../components/OrderItem"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { tableActions } from '../store';

function Orders() {
  const params = useParams();
  const dispatch = useDispatch();
  const tableId = parseInt(params.tableId)
  const arr = useSelector(state => state.table.filter(table => table.tableId === tableId))
  const items = arr[0].customerOrders

  function handleDeleteAll(){
    dispatch(tableActions.emptyCart({tableId}))
  }
  return (
    <>
        <div className="orderContents">
          <div className="orderContentsHeader">
              <div className="leftOrderContents">
                <h3>Table {tableId}</h3>
                <p>{arr[0].customerName}</p>
              </div>
              <div className="rightOrderContents">
                <DeleteIcon onClick = {handleDeleteAll}/>
              </div>
          </div>
            <div className={`${items.length === 0 ? "empty" : "orderContentsBody"}`}>
            {items.length !== 0 ? items.map((item, index) => <OrderItem key={item.name} name={item.name} price={item.price} index={index + 1} actualCount={item.count}/>)  : 
              <><ShoppingCartIcon /><p>No Items</p></>}
            </div>
        </div>
    </>
  )
}

export default Orders
