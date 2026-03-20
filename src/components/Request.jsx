import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestsSlice";
import { fetchRequestData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Request = () => {
    const navigate = useNavigate();
    const requests = useSelector((store)=>store.requests);
    const [pendingRequest, setPendingRequests] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!requests){
            (async function () {
                const requests = await fetchRequestData();
                dispatch(addRequests(requests));
                setPendingRequests(requests);
            })();
        } else {
            setPendingRequests(requests);
        }
    });

    const handleReject = async (index, _id)=>{
        try{
            await axios.post(`${BASE_URL}connectionRequest/review/rejected/${_id}`, {}, {withCredentials: true});
            const newpending = requests.filter((e, i)=>(i != index));
            dispatch(addRequests(newpending));
            setPendingRequests(newpending);
        } catch (err) {
            console.log(err);
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }
    const handleAccept = ()=>{

    }
    return (
        <div className="drawer-side">
            <label htmlFor="my_drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-base-200 min-h-full w-100 p-4">
                <h2 className="text-center text-lg font-bold pb-2 border-b border-gray-500/70">Requests</h2>
                <ul>
                    {pendingRequest.length != 0 ?
                        pendingRequest.map((element, index)=>{
                            const {_id, photourl, firstName, lastName} = element?.senderId;
                            return (
                            <li
                              key={index}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 rounded-full overflow-hidden max-h-fit">
                                            <img
                                                alt="user photo"
                                                src={photourl} />
                                        </div>
                                        <p className="max-h-fit">{`${firstName} ${lastName}`}</p>
                                    </div>
                                    <div className="flex items-center max-h-min max-w-fit gap-x-2">
                                        <button className="max-h-fit btn btn-error" onClick={()=>{handleReject(index, _id)}}>Reject</button>
                                        <button className="max-h-fit btn btn-success" onClick={handleAccept}>Accept</button>
                                    </div>
                                </div>
                            </li>)
                        }) :
                        <div className="min-h-full min-w-full text-center">
                            <p>No request found!☹️</p>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Request