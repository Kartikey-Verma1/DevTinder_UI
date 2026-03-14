import { useDispatch, useSelector } from "react-redux"
import { FaEdit, FaMars, FaVenus, FaGenderless, FaCalendar, FaCheck, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShimmerProfile from "./ShimmerProfile";

const Profile = () => {
    // for edit logic
    // making useState hooks to render the edit field when button clicked
    const [isClickedName, setIsClickedName] = useState(false);
    const [isClickedSkills, setIsClickedSkills] = useState(false);
    const [isClickedGender, setIsClickedGender] = useState(false);
    const [isClickedAge, setIsClickedAge] = useState(false);

    // making useState hooks for getting the value of the fields
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [skillsValue, setSkillsValue] = useState([]);
    const [genderValue, setGenderValue] = useState("");
    const [ageValue, setAgeValue] = useState(NaN);

    const setData = (data)=>{
        setFirstNameValue(data.firstName);
        setLastNameValue(data.lastName || "");
        setSkillsValue(data.skills);
        setGenderValue(data.gender);
        setAgeValue(data.age);
    }

    // onclick function calls
    const handleName = async (e)=>{
        e.preventDefault();
        if(e.currentTarget.value === "cancel"){
            setFirstNameValue(user.firstName);
            setLastNameValue(user.lastName || "");
            setIsClickedName(false);
            return;
        } else {
            if(firstNameValue === user.firstName && lastNameValue === user.lastName){
                setIsClickedName(false);
                return;
            }
            else if(firstNameValue.length < 4 || (lastNameValue.length < 4 && lastNameValue.length > 0)){
                return;
            }
            else{
                try{
                    let lastName = null;
                    if(lastNameValue.length >= 4) lastName = lastNameValue;
                    const changedData = await axios.patch(`${BASE_URL}profile/edit`, 
                    {
                        firstName: firstNameValue,
                        lastName
                    }, 
                    {withCredentials: true});
                    console.log("yes");
                dispatch(addUser(changedData.data.data));
                setData(changedData.data.data);
                setIsClickedName(false);
                } catch (err) {
                    const {status, statusText, data} = err?.response
                    console.log(err.response)
                    if(status === 401){
                        setErrorMessage(data?.message);
                    }
                    else return navigate("/*", {state: {status, statusText, data}});
                }
            }
            
        }
    }

    // logic to fetch data and rendering it, first checking that if it is present than if present than adding it to redux store otherwise fetching data than adding to store.
    const [flagData, setFlagData] = useState(false); // for shimmer.

    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUserData = async ()=>{
        try{
            const fetchedData = await axios.get(`${BASE_URL}profile/view`,{withCredentials: true});
            dispatch(addUser(fetchedData.data.data));
            setData(fetchedData.data.data);
            setFlagData(true);
        } catch (err) {
            const {status, statusText, data} = err?.response;
            if(status === 401) return navigate("/login");
            else return navigate("/*", {state : {status, statusText, data}});
        }
    }

    useEffect(()=>{
        if(!user){
            fetchUserData();
        } else {
            setFlagData(true);
            setData(user);
        }
    }, []);

    return (
        <div>
            {flagData ? <div className="card lg:card-side bg-base-200 shadow-blue-200 shadow-md m-3">

                {/* Photo loading */}
                <figure>
                    <img
                    src={user.photourl}
                    alt="Album" />
                </figure>

                <div className="card-body justify-between">
                    <div className="flex flex-col gap-3">

                        {/* Name */}
                        {!isClickedName ?
                            (<p className="card-title text-2xl my-4">{`${firstNameValue} ${lastNameValue}`} 
                                <button className="cursor-pointer text-xs mx-4" onClick={()=>setIsClickedName(true)}>
                                    <FaEdit />
                                </button>
                            </p>) :
                            (<form className="card-title text-2xl my-4" onSubmit={handleName}>
                                <fieldset>
                                    <input className="input validator outline-0" 
                                        type="text" 
                                        required
                                        value={firstNameValue} 
                                        onChange={(e)=>{setFirstNameValue(e.target.value)}}/>
                                </fieldset>
                                <fieldset>
                                    <input className="input validator outline-0" 
                                        type="text" 
                                        value={lastNameValue} 
                                        onChange={(e)=>{setLastNameValue(e.target.value)}}/>
                                </fieldset>
                                <button className="text-sm cursor-pointer btn btn-ghost" 
                                    value="cancel"
                                    type="button"
                                    onClick={handleName}>
                                    <FaTimes />
                                </button>
                                <button className="text-sm cursor-pointer btn btn-ghost" 
                                    value="save"
                                    type="submit">
                                    <FaCheck />
                                </button>
                            </form>)
                        }

                        {/* About */}
                        <div className="border border-gray-500 rounded-md p-3 bg-base-100">
                            <p className="text-lg font-bold">About</p>
                            <p className="py-2">{user.about}</p>
                        </div>

                        {/* Skills :- used loop to load all skills with design */}
                        <div className="border border-gray-500 rounded-md p-3 bg-base-100 ">
                            <p className="text-lg font-bold">Skills</p>
                            <div className="py-2 flex flex-wrap">{user.skills.map((element, index) => (
                                <p key={index} className="max-w-min mr-6 p-1 px-2 rounded-md bg-base-300">{element}</p>
                            ))}</div>
                        </div>
                        <div className="flex gap-3">

                            {/* Gender:- used nested if else through ternary operators to render between male female other or notdefined */}
                            <div className="border border-gray-500 rounded-md p-3 bg-base-100 min-w-min flex-1/2">
                                <p className="text-lg font-bold">Gender</p>
                                <p className="py-2">{
                                    (user.gender)?
                                        (user.gender === "male"?
                                            <span className="flex items-center gap-2"><FaMars /> Male</span>:
                                            (user.gender === "female" ?
                                                <span className="flex items-center gap-2"><FaVenus /> Female</span>:
                                                <span className="flex items-center gap-2"><FaGenderless />Others</span>)):
                                        <span>N/A</span>
                                }</p>
                            </div>

                            {/* Age */}
                            <div className="border border-gray-500 rounded-md p-3 bg-base-100 flex-1/2">
                                <p className="text-lg font-bold">Age</p>
                                <p className="py-2 flex items-center gap-2"><FaCalendar /> {user.age}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
            <ShimmerProfile />}
            
        </div>
        // <div>profile</div>
    )
}

export default Profile