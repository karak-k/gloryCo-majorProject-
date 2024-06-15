import { createSlice } from "@reduxjs/toolkit";


const createReviewSlice = createSlice({
    name:"createReview",
    initialState:{},
    reducers:{
        createReviewRequest : (state ,action) => {
            state.loading = true
        },
        createReviewSuccess : (state , action) => {
            state.loading = false
            state.success = action.payload
        },
        createReviewFail : (state ,action) => {
            state.loading = false
            state.error =  action.payload;
        },
        createReviewStatusReset : (state , action ) => {
            state.success = false
        }
    }
});

export const {createReviewFail , createReviewRequest , createReviewSuccess , createReviewStatusReset} = createReviewSlice.actions;
export default createReviewSlice.reducer;
