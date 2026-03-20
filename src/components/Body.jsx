import { Outlet, useSearchParams } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import Request from "./Request"
import Connections from "./Connections"
import { useState } from "react"

const Body = () => {
    const [drawerType, setDrawerType] = useState("");

    return (
        <div className="drawer drawer-end">
            <input  className="drawer-toggle"
                id="my_drawer" 
                type="checkbox"/>
            <div className="min-h-screen flex flex-col drawer-content">
                <NavBar setDrawerType={setDrawerType}/>
                <div className="flex-1 relative">
                    <Outlet />
                </div>
                <Footer />
            </div>
            {drawerType === "requests" && <Request/>}
            {drawerType === "connections" && <Connections/>}
        </div>
    )
}

export default Body