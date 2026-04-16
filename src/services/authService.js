import axios from "axios";
import { BASE_URL } from "../helpers/constant";

export const login = (email, password) => {
  return axios.post(
    BASE_URL + "api/user/login",
    {
      email,
      password,
    },
    { withCredentials: true },
  );
};

