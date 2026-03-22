import { useLocation } from "react-router-dom"

const Error = ({error = null}) => {
    const location = useLocation();
    const apiError = location?.state;
    console.log(apiError);
    console.log(error);
    const {status, statusText, data} = apiError || error || {
        status: 500,
        statusText: "Unknown Error",
        data: { message : "Something Went Wrong" }
    }
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl">
            <div className="flex flex-col gap-3">
                <p>❌ OOPS SORRY FOR INCONVENIENCE</p>
                <p>{`STATUS: ${status || 500}`}</p>
                <p>{ data?.message || "Something Went Wrong" }</p>
                <p>{statusText || "Unknown Error" }</p>
            </div>    
        </div>
    )
}

export default Error