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
        <div className="min-w-full min-h-fit">
            <div className="shadow-[0_0_12px_rgba(147,197,253,0.3)] mx-auto my-20 w-84 rounded-lg">
                <div className="card bg-base-100 w-84">
                    <figure>
                        <img className="w-84 aspect-16/15 object-cover"
                        src="https://i.pinimg.com/474x/30/81/11/308111056142497974b0a6d43ab5efaf.jpg"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                        Card Title
                        <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed