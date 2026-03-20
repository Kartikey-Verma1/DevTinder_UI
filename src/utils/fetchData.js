import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchUserData = async (navigate)=>{
    try{
        const user = await axios.get(`${BASE_URL}profile/view`, {
            withCredentials: true,
        });
        return user.data?.data;
    } catch (err) {
        const {status, statusText, data} = err?.response
        if(status === 401) return navigate("/login");
        else return navigate("/*", {state: {status, statusText, data}});
    }
}

export const fetchRequestData = async (navigate) => {
    try{
        const requests = await axios.get(`${BASE_URL}user/requests/pending`, {withCredentials: true});
        return requests.data?.data;
    } catch (err) {
        const {status, statusText, data} = err?.response
        if(status === 401) return navigate("/login");
        else return navigate("/*", {state: {status, statusText, data}});
    }
}

export const fetchConnectionData = async (navigate) => {
    try{
        const connections = await axios.get(`${BASE_URL}user/connections`, {withCredentials: true});
        return connections.data?.data;
    } catch (err) {
        const {status, statusText, data} = err?.response
        if(status === 401) return navigate("/login");
        else return navigate("/*", {state: {status, statusText, data}});
    }
}