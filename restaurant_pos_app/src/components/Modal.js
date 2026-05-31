import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import { tableActions } from "../store/index"
import "../styles/Modal.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Modal({ tableId, open, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [nameFocused, setNameFocused] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);
    const isBooked = true;
    if(!open) return null
    
    

    function formHandler(e){
        e.preventDefault()
        dispatch(tableActions.editCustomer( {tableId, name, phone, isBooked}))
        setName("")
        setPhone("")
        setNameFocused(false)
        setPhoneFocused(false)
        navigate(`/${tableId}`)
    }

    function handleClose(e){
        setName("")
        setPhone("")
        setNameFocused(false)
        setPhoneFocused(false)
        onClose()
    }


  return (
    <>
    <div className="modalOverlay" onClick={handleClose}>
    </div>
        <form onSubmit={formHandler}>
            <div className="modal">
                <AccountCircleIcon style={{background: "rgba(0, 255, 0, 0.1)", color: "rgba(0, 200, 0, 0.8)", fontSize: "50px", borderRadius: "50%", margin: "10px"}}/>
                <h2 className='modalHeader'>Customer Details <br /><p>of Table</p>{` ${tableId}`}</h2>
                <input required autoComplete='false' placeholder='Full Name' type="text" value={name} className='name' onChange={(e) => setName(e.target.value)} pattern='^[A-Za-z.\s]{3,30}$' onBlur={(e) => setNameFocused(true)} focused={nameFocused.toString()}  />
                <span className='errorNameText'>* Enter Name including Only Upper, Lower and spaces</span>
                <input required autoComplete='false' placeholder='Phone' type="text" value={phone} className="phone" onChange={(e) => setPhone(e.target.value)} pattern='\d{10}' onBlur={(e) => setPhoneFocused(true)} focused={phoneFocused.toString()}/>
                <span className="errorPhoneText">* Enter valid Phone Number</span>
                <button className='button'>Next</button>
            </div>
        </form>
    </>
  )
}

export default Modal
