import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user)
    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            <div className="flex mx-5 items-center justify-center gap-5">
                <ThemeController />
                {user ? 
                    <div className="flex items-center gap-2">
                        <div>{`Welcome, ${user.firstName}`}</div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={user.photourl} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 border">
                                <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><div onClick={()=>{dispatch(removeUser())}}>Logout</div></li>
                            </ul>
                        </div>
                    </div> : 
                    <div> 
                        <Link to="/login">Login</Link> or Signup 
                    </div>}
            </div>
        </div>
    )
}

export default NavBar;