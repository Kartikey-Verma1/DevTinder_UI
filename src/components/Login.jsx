import axios from "axios";
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // password show logic
    const [passwordType, setPasswordType] = useState("password");
    const swapPasswordType = ()=>{
        if(passwordType === "password") setPasswordType("text");
        else setPasswordType("password");
    }

    // api call and user add logic
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("kartik.v7391@gmail.com");
    const [password, setPassword] = useState("Kartikeyverma@13022006");
    const apiCallLogin = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(
                "http://localhost:3000/authProfile/login",
                {
                    email,
                    password
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            setPassword("");
            setEmail("");

            return navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <p className="text-xl font-bold mx-auto">Login</p>
            <fieldset className="fieldset">
                <label className="label">Email</label>
                <input 
                    type="email" 
                    className="input validator outline-0" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}/>

                <p className="validator-hint hidden my-0">Required</p>
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

            <button className="btn btn-info mt-4 font-bold" type="submit" onClick={apiCallLogin}>Login</button>
            <button className="btn btn-ghost mt-1" type="reset" 
                onClick={()=>{
                    setEmail("")
                    setPassword("")
                }}>Reset</button>
        </form>
    )
}

export default Login