import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import requestReducer from "./requestsSlice.js";
import connectionReducer from "./connectionsSlice.js";
import feedReducer from "./feedSlice.js";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        requests: requestReducer,
        connections: connectionReducer,
        feed: feedReducer
    }
});

export default appStore;