import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../actions/setUserDetails";

const UserStatus = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);

  function loadUserDetails() {
    //load user details
    dispatch(setUserDetails());
  }

  function isLogged() {
    dispatch(setUserDetails());

    if (Object.keys(userDetails).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return { loadUserDetails, isLogged };
};

export default UserStatus;
