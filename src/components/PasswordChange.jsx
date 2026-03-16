import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(newPass != confirmNewPass){
                setErrorMessage("Confirm password should be same as new password");
                return;
            }
            const data = await axios.patch(`${BASE_URL}profile/changePassword`, {
                password: oldPass,
                newPassword: newPass,
                confirmNewPassword: confirmNewPass
            }, {withCredentials: true});
            alert(data.data.message);
            setOldPass("");
            setNewPass("");
            setConfirmNewPass("");
            setErrorMessage("");
            navigate("/login");
        } catch (err) {
            const {status, statusText, data} = err?.response;
            if(status == 422){
                setErrorMessage(data.message);
                return;
            }
            if(status === 401){
                alert("User must be logged in to change password!");
                setOldPass("");
                setNewPass("");
                setConfirmNewPass("");
                setErrorMessage("");
                navigate("/login");
            }  
            else return navigate("/*", {state: {status, statusText, data}});
        }
    }
    return (
        <div className="min-w-full h-fit">
            <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 shadow-[0_0_12px_rgba(147,197,253,0.3)] my-10 mx-auto" onSubmit={handleSubmit}>
                <p className="text-xl font-bold mx-auto">Password Change</p>
                <fieldset className="fieldset">
                    <label className="label">Old Password</label>
                    <input className="input validator outline-0" 
                        type="password"  
                        placeholder="Old Password" 
                        value={oldPass} 
                        required 
                        onChange={(e)=>{setOldPass(e.target.value)}}/>
                    <p className="validator-hint hidden m-0">Required</p>
                </fieldset>

                <label className="fieldset">
                    <span className="label">New Password</span>
                    <input className="input validator outline-0" 
                        type="password"  
                        placeholder="New Password" 
                        value={newPass} 
                        required 
                        onChange={(e)=>{setNewPass(e.target.value)}}/>
                    <span className="validator-hint hidden m-0">Required</span>
                </label>
                <label className="fieldset">
                    <span className="label">Confirm New Password</span>
                    <input className="input validator outline-0" 
                        type="password"  
                        placeholder="Confirm New Password" 
                        value={confirmNewPass} 
                        required 
                        onChange={(e)=>{setConfirmNewPass(e.target.value)}}/>
                    <span className="validator-hint hidden m-0">Required</span>
                </label>
                <p className="text-rose-400">{errorMessage}</p>
                <button className="btn btn-neutral mt-4" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PasswordChange