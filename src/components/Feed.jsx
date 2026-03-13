import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Feed = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user);

    const fetchUserData = async ()=>{
        // if(user) return;
        try{
            const user = await axios.get(`${BASE_URL}profile/view`, {
                withCredentials: true,
            });
            dispatch(addUser(user.data.data));
        } catch (err) {
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }

    useEffect(()=>{
        if(!user){
            fetchUserData();
        }
    }, []);
    return (
        <div>Feed</div>
    )
}

export default Feed