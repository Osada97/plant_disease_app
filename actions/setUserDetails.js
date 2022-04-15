import { getSecureValue, clearSecureValue } from "../utils/SecureStore";
import axios from "axios";
import { API_KEY } from "@env";

export const setUserDetails = () => async (dispatch) => {
  const token = await getSecureValue("access_token");

  if (token) {
    const user = await axios.get(`${API_KEY}/user/getdetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (user.data) {
      dispatch({
        type: "SETUSER",
        payload: {
          token: token,
          userDetails: user.data,
        },
      });
    } else {
      console.warn("Token expired");
    }
  } else {
    dispatch({
      type: "REMOVEUSER",
    });
  }
};
