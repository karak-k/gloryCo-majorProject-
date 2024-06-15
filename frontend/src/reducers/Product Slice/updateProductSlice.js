import { createSlice } from "@reduxjs/toolkit";


const updateProductSlice = createSlice({
    name : 'updateProduct',
    initialState:{
    },

    reducers:{
        updateProductRequest : (state , action) => {
            state.loading = true
        },

        updateProductSuccess : (state , action) => {
            state.loading = false
            state.isUpdated = action.payload
        },

        updateProductFail : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        updateProductStatusReset : (state , action) => {
            state.isUpdated = false
        },
        
    }
});




export const {updateProductFail,updateProductRequest,updateProductStatusReset,updateProductSuccess} = updateProductSlice.actions;
export default updateProductSlice.reducer;