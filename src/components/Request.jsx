import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestsSlice";
import { fetchConnectionData, fetchRequestData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionsSlice";

const Request = () => {
    const navigate = useNavigate();
    const requests = useSelector((store)=>store.requests);
    const connections = useSelector((store)=>store.connections);
    const [pendingRequest, setPendingRequests] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!requests){
            (async function () {
                const requests = await fetchRequestData(navigate);
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
            setPendingRequests(newpending);
            dispatch(addRequests(newpending));
        } catch (err) {
            console.log(err);
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }
    const handleAccept = async (index, _id)=>{
        try{
            await axios.post(`${BASE_URL}connectionRequest/review/accepted/${_id}`, {}, {withCredentials: true});
            const newpending = requests.filter((e, i)=>(i !== index));
            setPendingRequests(newpending);
            
            const acceptedUser = requests[index]?.senderId;
            if(!acceptedUser) return;

            dispatch(addRequests(newpending));

            if(connections === null){
                const fetchedConnections = await fetchConnectionData(navigate);
                dispatch(addConnections(fetchedConnections));
            } else {
                const newconnection = [...(connections || []), acceptedUser];
                dispatch(addConnections(newconnection));
            }            
        } catch (err) {
            console.log(err);
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }
    return (
        <div className="drawer-side  backdrop-blur-xs">
            <label className="drawer-overlay"
                htmlFor="my_drawer" 
                aria-label="close sidebar" >
            </label>
            <div className="menu bg-base-200 min-h-full w-90 p-4">
                <label className="drawer-overlay cursor-pointer max-w-min px-2"
                    htmlFor="my_drawer" 
                    aria-label="close sidebar">❮
                </label>
                <h2 className="text-center text-lg font-bold pb-2 border-b border-gray-500/70">Requests</h2>
                <ul>
                    {pendingRequest.length != 0 ?
                        pendingRequest.map((element, index)=>{
                            const {_id, photourl, firstName, lastName} = element?.senderId;
                            return (
                            <li
                              key={_id}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 rounded-full overflow-hidden max-h-fit">
                                            <img
                                                alt="user photo"
                                                src={photourl} />
                                        </div>
                                        <p className="max-h-fit">{`${firstName} ${lastName}`}</p>
                                    </div>
                                    <div className="flex items-center max-h-min max-w-fit gap-x-2">
                                        <button className="max-h-fit btn btn-error" onClick={()=>{handleReject(index, _id)}}>Reject</button>
                                        <button className="max-h-fit btn btn-success" onClick={()=>{handleAccept(index, _id)}}>Accept</button>
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