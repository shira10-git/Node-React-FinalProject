import {jwtDecode} from "jwt-decode"
const useAuth = () => {
    const token =localStorage.getItem("token")|| ""
    if (token) {
        const userDecoded = jwtDecode(token)
        console.log("userDecoded", userDecoded)
        const {_id,name,userName,phone, role,email} = userDecoded
        return { _id,name,userName,phone,role,email}
    }
    return { _id: '', userName: '',role: '',phone:'',name:'', email:''}
}
export default useAuth
