import { getSecureValue, clearSecureValue } from "../utils/SecureStore";
import axios from "axios";
import { API_KEY } from "@env";
import {
  SetAdminLoggedInStatus,
  SetAdminLoggedOutStatus,
} from "./AdminLoggedStatus";

export const setAdminDetails = () => async (dispatch) => {
  const token = await getSecureValue("access_token");
  const user_role = await getSecureValue("user_role");

  if (token && user_role === "admin") {
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
        dispatch(SetAdminLoggedInStatus());
      })
      .catch(async () => {
        dispatch({
          type: "REMOVEADMIN",
        });
        await clearSecureValue("access_token");
        dispatch(SetAdminLoggedOutStatus());
      });
  } else {
    dispatch({
      type: "REMOVEADMIN",
    });
  }
};
