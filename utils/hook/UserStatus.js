import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../actions/setUserDetails";

const UserStatus = () => {
  const dispatch = useDispatch();

  function loadUserDetails() {
    //load user details
    dispatch(setUserDetails());
  }

  return { loadUserDetails };
};

export default UserStatus;
