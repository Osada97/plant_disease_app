import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../actions/setAdminDetails";
import { setUserDetails } from "../../actions/setUserDetails";

const UserStatus = () => {
  const dispatch = useDispatch();

  function loadUserDetails() {
    //load user details
    dispatch(setUserDetails());
  }
  function loadAdminDetails() {
    //load user details
    dispatch(setAdminDetails());
  }

  return { loadUserDetails, loadAdminDetails };
};

export default UserStatus;
