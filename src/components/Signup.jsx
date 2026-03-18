import axios from "axios";
import { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash, FaPlus, FaTimes} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
    const [isClickedSkills, setIsClickedSkills] = useState(false);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [errorMessageSkill, setErrorMessageSkill] = useState("");
    const [aboutError, setAboutError] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [newSkill, setNewSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [about, setAbout] = useState("Hey there! I am on DevTinder.");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const navigate = useNavigate();

    const firstPageNextHandler = (e)=>{
        setFirstNameError("");
        setLastNameError("");
        setAgeError("");
        if(firstName === ""){
            e.preventDefault();
            setFirstNameError("This field is required!");
        } 
        if(firstName.length < 4 || firstName.length > 15){
            e.preventDefault();
            setFirstNameError("Length can be only 4 to 15 characters");
        }
        if(lastName.length > 0 && (lastName.length < 4 || lastName.length > 15)){
            e.preventDefault();
            setLastNameError("Length can be only 4 to 15 characters");
        }
        if(age > 70 || age < 16){
            if(age > 70) setAgeError("You are too aged to work!");
            else if(age < 16) setAgeError("You are too young to work!");
            e.preventDefault();
        }
        return;
    }
    const handleSkillsRemove = (index)=>{
        const updatedList = skills.filter((element, i)=> i != index);
        setSkills(updatedList);
    }
    const handleSkillsAdd = (e)=>{
        e.preventDefault();
        if(newSkill.length <= 0) return;
        if(newSkill.length > 20){
            setErrorMessageSkill("Size of skill should be less than 20");
            return;
        }
        setSkills([...skills, newSkill]);
        setIsClickedSkills(false);
        setNewSkill("");
        setErrorMessageSkill("");
    }
    const swapPasswordType = ()=>{
        if(passwordType === "password") setPasswordType("text");
        else setPasswordType("password");
    }
    const handleSubmit = async ()=>{
        if(password !== confirmPassword){
            setPasswordMatchError("Both passwords must match!");
            return;
        }
        try{
            const responseData = await axios.post(`${BASE_URL}authProfile/signup`, {
                firstName,
                lastName,
                email,
                password,
                skills,
                age,
                gender,
                about
            }, {withCredentials: true});

            alert(responseData.data.message);
            return navigate("/login");
        } catch (err) {
            const {status, statusText, data} = err?.response
            if(status === 423 || status === 409){
                alert(data?.message);
                return;
            }
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }
    return (
        <div className="min-h-min min-w-full">
            <div className="mx-auto my-10 max-w-fit bg-base-200 border border-base-300 rounded-box pt-3 shadow-[0_0_10px_rgba(147,197,253,0.3)]">
                <p className="text-xl font-bold mx-auto text-center">Signup</p>
                <div className="carousel flex max-w-xs overflow-hidden">
                    <form className="fieldset flex flex-col justify-between bg-base-200 rounded-box w-2xs p-4 carousel-item" id="slide1">
                        <div>
                            <p className="text-lg font-bold">Personal Information:</p>
                            <fieldset className="fieldset">
                                <label className="label">First Name</label>
                                <input className="input validator outline-0" 
                                    type="text" 
                                    placeholder="First Name" 
                                    required 
                                    value={firstName}
                                    onChange={(e)=>{setFirstName(e.target.value)}}/>
                                <p className="text-rose-400">{firstNameError}</p>
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label">Last Name</label>
                                <input className="input validator outline-0" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={lastName}
                                    onChange={(e)=>{setLastName(e.target.value)}}/>
                                <p className="text-rose-400">{lastNameError}</p>
                            </fieldset>

                            <fieldset className="fieldset">
                                <span className="label">Gender</span>
                                <label className="select validator outline-0">
                                    <select>
                                        <option onClick={()=>{setGender("male")}}>Male</option>
                                        <option onClick={()=>{setGender("female")}}>Female</option>
                                        <option onClick={()=>{setGender("others")}}>Others</option>
                                        <option onClick={()=>{setGender(null)}}>Prefer not to say</option>
                                    </select>
                                </label>
                            </fieldset>
                            
                            <label className="fieldset">
                                <span className="label">Age</span>
                                <input className="input validator outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                    type="number"
                                    placeholder="Age"
                                    value={age}
                                    required 
                                    min="16"
                                    max="70"
                                    onChange={(e)=>{setAge(e.target.value)}}/>
                                <p className="text-rose-400">{ageError}</p>
                            </label>

                        </div>

                        <a  className="btn btn-info mt-4" href="#slide2" onClick={firstPageNextHandler}>Next</a>
                    </form>
                    <form className="fieldset bg-base-200 rounded-box w-2xs p-4 max-h-full carousel-item flex flex-col justify-between" id="slide2">
                        <div>
                            <p className="text-lg font-bold">Professional Information:</p>
                            <fieldset className="fieldset">
                                <label className="label">About</label>
                                <textarea className="validator input min-h-28 rounded-md outline-0 resize-none whitespace-pre-wrap p-2"
                                    placeholder="Hey there! I am on DevTinder." 
                                    defaultValue={about || "Hey there! I am on DevTinder."}
                                    wrap="soft"
                                    maxLength="200"
                                    onChange={(e)=>{
                                        if(e.target.value.length >= 200)setAboutError("Maximum number of characters allowed is 200");
                                        else setAboutError("");
                                        setAbout(e.target.value);
                                    }}>
                                </textarea>
                                <p className="text-rose-400">{aboutError}</p>

                            </fieldset>

                            <label className="label mt-3">Your Skills</label>
                            <div className="flex flex-wrap gap-2 border border-gray-500/60 rounded-md p-2 bg-base-100 mt-1 min-h-30 max-h-30 overflow-y-scroll no-scrollbar" >{
                                skills.map((element, index) => (
                                    <p key={index}  className="max-w-fit max-h-min py-1 px-3 rounded-md bg-base-300 relative">
                                        {element} 
                                        <button className="absolute cursor-pointer right-0 top-0 -translate-y-1/2 translate-x-1/2"
                                        type="button"
                                        value="cancel"
                                        onClick={(e)=>{handleSkillsRemove(index)}}>
                                            <FaTimes />
                                        </button>
                                    </p>
                                ))}
                                {skills.length < 20 ?
                                <><label htmlFor="my_modal_6" className="btn max-h-min max-w-min py-1 px-3 rounded-md bg-base-300" onClick={()=>{setIsClickedSkills(true)}}><FaPlus/></label>

                                <input type="checkbox" checked={isClickedSkills} className="modal-toggle" />
                                <div className="modal " role="dialog"onKeyDown={(e)=>{
                                        if(e.key == "Enter") handleSkillsAdd(e);
                                    }}>
                                    <div className="modal-box bg-base-200/70 backdrop-blur-xs w-xs">
                                        <h3 className="text-lg font-bold">Enter Your New Skill</h3>
                                        <input  className="input outline-0 w-full my-3" 
                                        type="text"
                                        value={newSkill}
                                        onChange={(e)=>{setNewSkill(e.target.value)}}/>
                                        <p className="text-rose-400">{errorMessageSkill}</p>
                                        <div className="modal-action">
                                            <label  className="btn" 
                                            htmlFor="my_modal_6"
                                            onClick={()=>{
                                                setNewSkill("")
                                                setErrorMessageSkill("")
                                                setIsClickedSkills(false)}}><FaTimes />
                                            </label>
                                            <label  className="btn" 
                                            htmlFor="my_modal_6"
                                            onClick={handleSkillsAdd}
                                            ><FaCheck />
                                            </label>
                                        </div>
                                    </div>
                                </div></> : 
                                <></>}
                            </div>
                        </div>
                        <div className="flex min-w-2xs gap-6">
                            <a href="#slide1" className="btn btn-neutral mt-4 flex-1/2">Previous</a>
                            <a className="btn btn-info mt-4 flex-1/2" href="#slide3">Next</a>
                        </div>
                        
                    </form>
                    <form className="fieldset bg-base-200 rounded-box w-2xs p-4 max-h-full carousel-item flex flex-col justify-between" id="slide3">
                        <div>
                            <p className="text-lg font-bold">Authentication:</p>
                            <fieldset className="fieldset" >
                                <label className="label">Email</label>
                                <input  className="input validator outline-0" 
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    value={email}
                                    onChange={(e)=>{setEmail(e.target.value)}}/>
                                <p className="validator-hint hidden m-0">Required</p>
                            </fieldset>

                            <fieldset className="fieldset">
                                <span className="label">Password</span>
                                <div className="input validator relative outline-0">
                                    <input 
                                        type={passwordType} 
                                        placeholder="Password" 
                                        required 
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}/>
            
                                    <button 
                                        type="button"
                                        onClick={swapPasswordType}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                                            {passwordType ==="password" ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <span className="validator-hint hidden my-0">Required</span>
                            </fieldset>

                            <fieldset className="fieldset">
                                <span className="label">Confirm Password</span>
                                <input  className="input validator outline-0" type="password" 
                                    placeholder="Confirm Password"
                                    value={confirmPassword} 
                                    required 
                                    onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                                <span className="validator-hint hidden m-0">Required</span>
                            </fieldset>
                            <p className="text-rose-400">{passwordMatchError}</p>

                        </div>
                        <div className="flex gap-6">
                            <a className="btn btn-neutral mt-4 flex-1/2" href="#slide2">Previous</a>
                            <button className="btn btn-info mt-4 flex-1/2" type="button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup