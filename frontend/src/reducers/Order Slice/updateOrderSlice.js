import { createSlice } from "@reduxjs/toolkit";


const updateOrderSlice = createSlice({
    name : 'updateProduct',
    initialState:{
    },

    reducers:{
        updateOrderRequest : (state , action) => {
            state.loading = true
        },

        updateOrderSuccess : (state , action) => {
            state.loading = false
            state.isUpdated = action.payload
        },

        updateOrderFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        updateOrderStatusReset : (state , action) => {
            state.isUpdated = false
        },
        
    }
});




export const {updateOrderFail,updateOrderRequest,updateOrderSuccess,updateOrderStatusReset} = updateOrderSlice.actions;
export default updateOrderSlice.reducer;