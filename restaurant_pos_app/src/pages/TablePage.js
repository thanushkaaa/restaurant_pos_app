import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import OrderTile from "../components/OrderTile.js"
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../styles/TablePage.css"
import Orders from "../components/Orders.js"
import Payment from "../components/Payment.js"
import FilterTile from "../components/FilterTile.js"
import { tableActions } from "../store/index.js"
import { data } from "./tempData.js"

function TablePage() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableId = parseInt(params.tableId)
    const tables = useSelector(state => state.table.filter(table => table.tableId === tableId)) 
    const foodTypes = Object.keys(data)
    const [curData, setCurData] = useState("")

    function handleClick(){
      dispatch(tableActions.deleteCustomer({tableId}))
      navigate("/")
    }


  return (
    <>
    <div className="table">
      <div className="Tableheader">
        <div className="TableLeft">
            <div className="leftTableBack">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon className='BackIcon'/>
                </IconButton>
            </div>
            <div className='leftTableName'>
                <h3>Table {params.tableId}</h3>
                <h4>{`Customer Name : ${tables[0].customerName}`}</h4>
            </div>
        </div>
        <div className="TableRight">
          <div onClick={handleClick} className='tableButton'><h5>Clear Table</h5></div>
        </div>
      </div>
    <div className="TableBody">
      <div className="menu">
        <div className="menuSelectors">
          {foodTypes.map(item => <FilterTile key={item} name={item} count={data[item].length} background={"orange"} passData={(data) => setCurData(data)}/>)}
        </div>
        <div className={`menuItems`}>
          {curData ? data[curData].map(dataItem => <OrderTile tableId={parseInt(params.tableId)} name={dataItem.name} price={dataItem.price} key={dataItem.name}/>) : <></>}
        </div>

      </div>
      <div className="rightPart">
        <div className="orders">
          <Orders />
        </div>
        <div className="payments">
          <Payment />
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default TablePage
