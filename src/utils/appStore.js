import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import requestReducer from "./requestsSlice.js"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        requests: requestReducer
    }
});

export default appStore