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

export const fetchRequestedUser = async (id)=>{
    const fetchedData = await axios.get(`${BASE_URL}user/profile/view/${id}`, {
        withCredentials: true
    });
    return fetchedData?.data?.data;
}

export const fetchLogin = async ({email, password})=>{
    const fetchedData = await axios.post(`${BASE_URL}authProfile/login`,
        {
            email,
            password
        },
        { withCredentials: true }
    );
    return fetchedData?.data?.data;
}

export const fetchLogout = async ()=>{
    await axios.post(`${BASE_URL}authProfile/logout`,{}, {
        withCredentials: true,
    });
}

export const fetchChangePassword = async ({password, newPassword, confirmNewPassword})=>{
    const fetchedData = await axios.patch(`${BASE_URL}profile/changePassword`, {
        password,
        newPassword,
        confirmNewPassword
    }, 
    { withCredentials: true });
    return fetchedData?.data;
}

export const fetchEdit = async (dataToPass)=>{
    const fetchedData = await axios.patch(`${BASE_URL}profile/edit`, 
        dataToPass, 
        { withCredentials: true }
    );
    return fetchedData?.data?.data;
}

export const fetchDeleteProfile = async ()=>{
    await axios.delete(`${BASE_URL}profile/deleteAccount`, {
        withCredentials: true
    });
}

export const fetchAddProfile = async ({firstName, lastName, email, password, age, gender, about, skills})=>{
    const fetchedData = await axios.post(`${BASE_URL}authProfile/signup`, {
        firstName,
        lastName,
        email,
        password,
        skills,
        age,
        gender,
        about
    }, { withCredentials: true });
    return fetchedData?.data;
}