import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import requestReducer from "./requestsSlice.js"
import connectionReducer from "./connectionsSlice.js"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        requests: requestReducer,
        connections: connectionReducer
    }
});

export default appStore