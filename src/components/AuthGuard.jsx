import { useSelector } from "react-redux"
import { useLocation , Navigate} from "react-router-dom"
const AuthGuard = ({children}) => {
    const user = useSelector(store => store.user.user)
    const location = useLocation();
console.log("Auth guard is execute")
    if(!user){
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />
    }   

  return children
}

export default AuthGuard;