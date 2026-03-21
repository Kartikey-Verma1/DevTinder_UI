import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { fetchUserData } from "../utils/fetchData.js";

const Feed = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user);

    useEffect(()=>{
        if(!user){
            (async () => {
                try{
                    const user = await fetchUserData();
                    dispatch(addUser(user));
                } catch (err){
                    const {status, statusText, data} = err?.response
                    if(status === 401) return navigate("/login");
                    else return navigate("/*", {state: {status, statusText, data}});
                }
            })();
        }
    }, []);
    return (
        <div>Feed</div>
    )
}

export default Feed