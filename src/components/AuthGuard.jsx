import { useSelector } from "react-redux"
import { useLocation , Navigate} from "react-router-dom"
const AuthGuard = ({children}) => {
    const user = useSelector(store => store.user.user)
    const location = useLocation();

    if(!user || user.email === ""){
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />
    }   

  return children
}

export default AuthGuard;