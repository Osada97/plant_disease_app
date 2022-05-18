import { getSecureValue, clearSecureValue } from "../utils/SecureStore";
import axios from "axios";
import { API_KEY } from "@env";

export const setAdminDetails = () => async (dispatch) => {
  const token = await getSecureValue("access_token");

  if (token) {
    await axios
      .get(`${API_KEY}/admin/getdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SETADMIN",
          payload: {
            token: token,
            type: "admin",
            adminDetails: res.data,
          },
        });
      })
      .catch(async () => {
        dispatch({
          type: "REMOVEADMIN",
        });
        await clearSecureValue("access_token");
      });
  } else {
    dispatch({
      type: "REMOVEADMIN",
    });
  }
};
