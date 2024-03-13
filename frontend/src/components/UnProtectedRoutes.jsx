import { Navigate } from "react-router-dom";


const UnProtectedRoutes =({loggedIn, children})=>{
    console.log(loggedIn)
    if(loggedIn)
    {
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default UnProtectedRoutes;