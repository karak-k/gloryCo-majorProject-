import { createSlice } from "@reduxjs/toolkit";

const clearErrorsSlice = createSlice({
    name: "clearErrors",
    initialState: {
    },
    reducers: {
        clearErrors: (state,action) => {
            console.log("Clearing error");
            state.error = null
        }
    }
})

export const {clearErrors} = clearErrorsSlice.actions;
export default clearErrorsSlice.reducer;