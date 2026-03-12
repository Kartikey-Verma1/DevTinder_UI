import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
            <ThemeController />
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar;