import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchUserData = async ()=>{
    const user = await axios.get(`${BASE_URL}profile/view`, {
        withCredentials: true,
    });
    return user.data?.data;
}

export const fetchRequestData = async () => {
    const requests = await axios.get(`${BASE_URL}user/requests/pending`, {
        withCredentials: true
    });
    return requests.data?.data;

}

export const fetchConnectionData = async (navigate) => {
    const connections = await axios.get(`${BASE_URL}user/connections`, {
        withCredentials: true
    });
    return connections.data?.data;
}

export const fetchReject = async (_id)=>{
    await axios.post(`${BASE_URL}connectionRequest/review/rejected/${_id}`, {}, {
        withCredentials: true
    });
}

export const fetchAccept = async (_id)=>{
    await axios.post(`${BASE_URL}connectionRequest/review/accepted/${_id}`, {}, {
        withCredentials: true
    });
}