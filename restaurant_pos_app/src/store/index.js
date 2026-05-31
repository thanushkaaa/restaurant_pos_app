import { createSlice, configureStore } from "@reduxjs/toolkit"

const initialState = []
for (let i = 0; i < 10; i++) {
    initialState.push({
        tableId : i + 1,
        isBooked : false,
        customerName : "", 
        customerPhone : "",
        customerOrders : []
    });
    
}
const tableSlice = createSlice({
    name : "Table",
    initialState,
    reducers : {
        editCustomer(state, action){
            const temp = state.find(table => table.tableId === action.payload.tableId)
            temp.customerName = action.payload.name
            temp.customerPhone = action.payload.phone
            temp.isBooked = action.payload.isBooked
        },
        deleteCustomer(state, action){
            const temp = state.find(table => table.tableId === action.payload.tableId)
            temp.customerName = ""
            temp.customerOrders = []
            temp.isBooked = false
            temp.customerPhone = ""
        },
        addFoodItems(state, action){
            const temp = state.find(table => table.tableId === action.payload.tableId)
            const cur = temp.customerOrders
            const check = cur.find(item => item.name === action.payload.foodItem.name)
            if (!check){
                cur.push(action.payload.foodItem)
            }
            else{
                check.count++
            }
        },
        removeFoodItems(state, action){
            const temp = state.find(table => table.tableId === action.payload.tableId)
            const cur = temp.customerOrders
            const check = cur.find(item => item.name === action.payload.foodItem.name)
            if(check){
                if(check.count > 1){
                    check.count--
                }
                else{
                    cur.splice(cur.indexOf(check), 1)
                }
            }
        },
        deleteFoodItem(state, action){
            const temp = state.find(table => table.tableId === action.payload.tableId)
            const cur = temp.customerOrders
            const check = cur.find(item => item.name === action.payload.foodItem.name)
            if(check){
                cur.splice(cur.indexOf(check), 1)
            }
        },
        emptyCart(state, action){
            const temp = state.find(table => table.tableId === action.payload.tableId)
            temp.customerOrders = []
        }
    }
});

const store = configureStore({
    reducer: {
        table: tableSlice.reducer
    }
});

export const tableActions = tableSlice.actions;

export default store