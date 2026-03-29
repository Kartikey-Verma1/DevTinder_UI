import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            const newArray = state.filter((element)=> element._id != action.payload._id);
            return newArray;
        },
        removeAllRequests: ()=>{
            return null;
        }
    }
});

export const {addRequests, removeRequest, removeAllRequests} = requestsSlice.actions;

export default requestsSlice.reducer;