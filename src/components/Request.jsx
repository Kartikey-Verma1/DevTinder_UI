import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { fetchReview, fetchConnectionData,fetchRequestData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionsSlice";

const Request = () => {
    const navigate = useNavigate();
    const requests = useSelector((store)=>store.requests);
    const connections = useSelector((store)=>store.connections);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!requests){
            (async function () {
                try{
                    const requests = await fetchRequestData();
                    dispatch(addRequests(requests));
                } catch (err){
                    const {status, statusText, data} = err?.response
                    if(status === 401) return navigate("/login");
                    else return navigate("/*", {state: {status, statusText, data}});
                }
            })();
        }
    },[requests]);

    const handleReject = async (_id, elementId)=>{
        try{
            await fetchReview({status: "rejected", _id});
            dispatch(removeRequest({_id: elementId}));
        } catch (err) {
            console.log(err);
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }
    const handleAccept = async (element)=>{
        try{
            const acceptedUser = element?.senderId;
            if(!acceptedUser) return;

            await fetchReview({status: "accepted",_id: element?.senderId?._id});

            dispatch(removeRequest({_id: element?._id}));

            if(connections === null){
                try{
                    const fetchedConnections = await fetchConnectionData();
                    dispatch(addConnections(fetchedConnections));
                } catch (err){
                    const {status, statusText, data} = err?.response
                    if(status === 401) return navigate("/login");
                    else return navigate("/*", {state: {status, statusText, data}});
                }
            } else {
                const newconnection = [...(connections || []), acceptedUser];
                dispatch(addConnections(newconnection));
            }            
        } catch (err) {
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
                    {requests && requests.length > 0 ?
                        requests.map((element)=>{
                            const elementId = element?._id;
                            const {_id, photourl, firstName, lastName} = element?.senderId;
                            return (
                            <li key={_id}>
                                <div className="flex items-center justify-between">
                                    <label className="drawer-overlay cursor-pointer"
                                        htmlFor="my_drawer" 
                                        aria-label="close sidebar" >
                                        <div className="flex items-center gap-2" onClick={()=>{navigate(`/requested/profile/view/${_id}`)}}>
                                            <div className="w-10 rounded-full overflow-hidden max-h-fit">
                                                <img
                                                    alt="user photo"
                                                    src={photourl} />
                                            </div>
                                            <p className="max-h-fit">{`${firstName} ${lastName}`}</p>
                                        </div>
                                    </label>
                                    <div className="flex items-center max-h-min max-w-fit gap-x-2">
                                        <button className="max-h-fit btn btn-error" onClick={(e)=>{
                                            handleReject(_id, elementId)}}>
                                                Reject
                                        </button>
                                        <button className="max-h-fit btn btn-success" onClick={(e)=>{
                                            handleAccept(element)}}>
                                                Accept
                                        </button>
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