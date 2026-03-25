import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaGenderless, FaMars, FaVenus } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestedUser, fetchUserData } from "../utils/fetchData";
import { addUser } from "../utils/userSlice";
const RequestedProfileView = () => {
    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [requestedData, setRequestedData] = useState({});

    const requestedUser = async ()=>{
        try{
            const fetchedData = await fetchRequestedUser(id);
            setRequestedData(fetchedData);
        } catch (err) {
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    };

    const userData = async ()=>{
        try{
            const fetchedData = await fetchUserData();
            dispatch(addUser(fetchedData));
        } catch (err) {
            const {status, statusText, data} = err?.response
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }

    useEffect(()=>{
        requestedUser();
        if(!user){
            userData();
        }
    },[id]);
    return (
        <div>
            {requestedData.firstName ? 
            <div className="card lg:card-side bg-base-200 shadow-[0_0_12px_rgba(147,197,253,0.3)] m-10 mx-20">
                <figure>
                    <img className="max-w-96"
                    src={requestedData.photourl}
                    alt="image" />
                </figure>
                <div className="card-body flex flex-col gap-3">
                    <h2 className="card-title text-2xl">{`${requestedData.firstName} ${requestedData.lastName}`}</h2>
                    <div className="border border-gray-500 rounded-md p-3 bg-base-100">
                        <p className="text-lg font-bold">About</p>
                        <p className="pt-2">{requestedData.about}</p>
                    </div>
                    <div className="border border-gray-500 rounded-md p-3 bg-base-100">
                        <p className="text-lg font-bold">Skills</p>
                        { 
                            requestedData.skills.length > 0 ?
                            (requestedData.skills.map((element, index)=>(
                                <p key={index}  className="max-w-min mr-5 mt-2 p-1 px-3 rounded-md bg-base-300 relative">{element}</p>
                            ))) :
                            <p className="py-2">N/A</p>
                        }
                    </div>
                    <div className="flex gap-2">
                        <div className="border border-gray-500 rounded-md p-3 bg-base-100 flex-1/2">
                            <p className="text-lg font-bold">Gender</p>
                            <p className="pt-2">{
                                (requestedData.gender)?
                                    (requestedData.gender === "male"?
                                        <span className="flex items-center gap-2"><FaMars /> Male</span>:
                                        (requestedData.gender === "female" ?
                                            <span className="flex items-center gap-2"><FaVenus /> Female</span>:
                                            <span className="flex items-center gap-2"><FaGenderless />Others</span>)):
                                    <span>N/A</span>
                            }</p>
                        </div>
                        <div className="border border-gray-500 rounded-md p-3 bg-base-100 flex-1/2">
                            <p className="text-lg font-bold">Age</p>
                            <p className="pt-2 flex items-center gap-2"><FaCakeCandles /> {requestedData.age}</p>
                        </div>
                        
                    </div>
                </div>
            </div> : <></>}
        </div>
    )
}

export default RequestedProfileView;