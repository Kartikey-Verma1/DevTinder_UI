import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchUserData = async ()=>{
    const user = await axios.get(`${BASE_URL}profile/view`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
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

export const fetchConnectionData = async () => {
    const connections = await axios.get(`${BASE_URL}user/connections`, {
        withCredentials: true
    });
    return connections.data?.data;
}

export const fetchInterestData = async () => {
    const fetchedData = await axios.get(`${BASE_URL}user/requests/sent`, {
        withCredentials: true
    });
    return fetchedData.data?.data;
}

export const fetchReview = async ({status, _id})=>{
    await axios.post(`${BASE_URL}connectionRequest/review/${status}/${_id}`, {}, {
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

export const fetchFeed = async (Id)=>{
    let url = `${BASE_URL}user/feed?limit=3`;
    if(Id){
        url = url + `&Id=${Id}`;
    }
    const fetchedData = await axios.get(`${url}`, {
        withCredentials: true
    });
    return fetchedData?.data?.data;
}

export const fetchRequest = async ({status, _id})=>{
    const fetchedData = await axios.post(`${BASE_URL}connectionRequest/send/${status}/${_id}`, {}, {
        withCredentials: true,
    });
    return fetchedData?.data.data;
}

export const fetchWithdraw = async (id)=>{
    await axios.post(`${BASE_URL}connectionRequest/withdraw/interaction/${id}`, {}, {
        withCredentials: true
    });
}