import axios from "axios";
import { BASE_URL } from "../helpers/constant";

export const userProfile = () => {
  return axios.get(
    BASE_URL + "api/user/profile",

    { withCredentials: true },
  );
};

export const userUpdateProfile = () => {
  return axios.patch(BASE_URL + "api/user/profile/update", { withCredentials: true });
};
