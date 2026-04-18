import axios from "axios";
import { BASE_URL } from "../helpers/constant";

export const login = (email, password) => {
  return axios.post(
    BASE_URL + "api/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true },
  );
};

export const signup = (name , email , password) => {
  return axios.post(BASE_URL + "api/auth/signup" , {name , email , password} , {withCredentials:true})
}

export const logout = () => {
  return axios.post(BASE_URL + "api/auth/logout" , {} , {withCredentials : true});
};
