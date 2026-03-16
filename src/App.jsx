import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Error from "./components/Error"
import Signup from "./components/Signup"
import PasswordChange from "./components/PasswordChange"

function App() {
  return (
    <>
        <Provider store={appStore}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Body />}>
                    <Route path="/" element={<Feed />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/passwordchange" element={<PasswordChange />} />
                </ Route>
                <Route path="/*" element={<Error error={{status: 500, statusText: "Page Not Found"}}/>}/>
            </Routes>
            </BrowserRouter>
        </Provider>
    </>
  )
}

export default App
