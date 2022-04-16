import { getSecureValue, clearSecureValue } from "../utils/SecureStore";
import axios from "axios";
import { API_KEY } from "@env";

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
        dispatch({
          type: "SETUSER",
          payload: {
            token: token,
            userDetails: res.data,
          },
        });
      })
      .catch(async () => {
        dispatch({
          type: "REMOVEUSER",
        });
        await clearSecureValue("access_token");
      });
  } else {
    dispatch({
      type: "REMOVEUSER",
    });
  }
};
