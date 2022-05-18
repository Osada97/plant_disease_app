import { getSecureValue, clearSecureValue } from "../utils/SecureStore";
import axios from "axios";
import { API_KEY } from "@env";
import {
  SetUserLoggedInStatus,
  SetUserLoggedOutStatus,
} from "./UserLoggedStatus";

export const setUserDetails = () => async (dispatch) => {
  const token = await getSecureValue("access_token");

  if (token) {
    await axios
      .get(`${API_KEY}/user/getdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //set user
        dispatch({
          type: "SETUSER",
          payload: {
            token: token,
            type: "user",
            userDetails: res.data,
          },
        });
        //set user loggedIn status
        dispatch(SetUserLoggedInStatus());
      })
      .catch(async () => {
        dispatch({
          type: "REMOVEUSER",
        });
        dispatch(SetUserLoggedOutStatus());
        await clearSecureValue("access_token");
      });
  } else {
    dispatch({
      type: "REMOVEUSER",
    });
  }
};
