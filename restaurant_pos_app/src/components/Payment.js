import React from 'react'
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "../styles/Payment.css"

function Payment() {
  const params = useParams();
  const tableId = parseInt(params.tableId)
  const table = useSelector(state => state.table.filter(table => table.tableId === tableId))
  const allItems = table[0].customerOrders
  const total = allItems.reduce((res, item) => res + (item.price * item.count), 0)
  const gst = total * 0.05
  const success = 0
  return (
    <>
        <div className="orderPayment">
          <div className="orderPaymentHeader">
            <button type="submit">Cash</button>
            <button type="submit">UPI</button>
          </div>
          <div className="orderPaymentBody">
            <div className="SubTotal">
              <p>SubTotal</p>
              <p>₹{total}</p>
            </div>
            <div className="gst">
              <p>GST 5%</p>
              <p>₹{gst}</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>₹{total + gst}</p>
            </div>
            <p className={success == 1 ? "success" : "normal"}>Payment Succesful, You can Proceed</p>
            <p className={success == 2 ? "fail" : "normal"}>Payment Failed, Please Try again</p>
          </div>
          <div className="orderPaymentFooter">
            <button type="submit">Place Order</button>  
          </div>
        </div>
    </>
  )
}

export default Payment
