import React from 'react'
import { useSelector } from "react-redux";
import "../styles/Homepage.css"
import TableTile from "../components/TableTile"


function HomePage({ restaurantName }) {
  const tables = useSelector(state => state.table);
  
  return (
    <>
    <div className="Tableheader">
        <div className="TableLeft">
            <div className='leftTableName'>
                <h3>{`Welcome to, ${restaurantName}`}</h3>
            </div>
        </div>
        <div className="TableRight">
            <div className='TableRightOrders' type="submit">Orders</div>
            <div className='TableRightCustomers' type="submit">Customers</div>
        </div>
      </div>

      <div className="body">
        <div className="grid">
          {tables.map((table) => (
              <TableTile key={table.tableId} number={table.tableId} status={table.isBooked ? "Booked" : "Vacent"} background={table.isBooked ? "orange" : "green"}/>
          ))}
        </div>
      </div>
    </>
  )
};

export default HomePage
