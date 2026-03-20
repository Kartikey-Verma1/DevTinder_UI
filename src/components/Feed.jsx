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
                const user = await fetchUserData(navigate);
                dispatch(addUser(user));
            })();
        }
    }, []);
    return (
        <div>Feed</div>
    )
}

export default Feed