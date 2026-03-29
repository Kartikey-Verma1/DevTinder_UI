import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaGenderless, FaMars, FaVenus } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestedUser, fetchUserData } from "../utils/fetchData";
import { addUser } from "../utils/userSlice";
import ShimmerProfile from "./ShimmerProfile";
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
            console.log(fetchedData);
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
        <div className="min-w-full max-h-fit p-5 pt-10">
            {requestedData?.firstName ? 
            <div className="card lg:card-side bg-base-200 shadow-[0_0_12px_rgba(147,197,253,0.3)] max-w-3xl mx-auto flex flex-col">
                <div className="card-body flex flex-col gap-3">
                    <div className="flex gap-3 items-center mb-3">
                        <label className="avatar"
                            htmlFor="my_modal_photo">
                            <figure className="max-w-30 min-w-11 rounded-full cursor-pointer">
                                <img className="max-w-96"
                                src={requestedData.photourl}
                                alt="image" />
                            </figure>
                        </label>
                        <input type="checkbox" id="my_modal_photo" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box p-6 max-w-fit max-h-fit">
                                <div className=" max-w-sm">
                                    <img className="aspect-16/18 object-cover"
                                        src={user.photourl}
                                        alt="profile photo" />
                                </div>
                                <div className="modal-action">
                                    <label htmlFor="my_modal_photo" className="p-1 px-2 rounded-full cursor-pointer hover:bg-base-200 absolute right-1 top-1">✕</label>
                                </div>
                            </div>
                        </div>
                        <h2 className="card-title text-2xl">{`${requestedData.firstName} ${requestedData.lastName}`}</h2>
                    </div>
                
                
                    <div className="border border-gray-500 rounded-md p-3 bg-base-100">
                        <p className="text-lg font-bold">About</p>
                        <p className="pt-2">{requestedData.about}</p>
                    </div>
                    <div className="border border-gray-500 rounded-md p-3 bg-base-100">
                        <p className="text-lg font-bold">Skills</p>
                        <div className="flex flex-wrap">
                            { 
                                requestedData.skills.length > 0 ?
                                (requestedData.skills.map((element, index)=>(
                                    <p key={index}  className="max-w-min mr-3 mt-2 p-1 px-3 rounded-md bg-base-300 relative">{element}</p>
                                ))) :
                                <p className="py-2">N/A</p>
                            }
                        </div>
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
            </div> : 
            <ShimmerProfile />}
        </div>
    )
}

export default RequestedProfileView;