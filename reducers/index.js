import { combineReducers } from "redux";
import adminDetailsReducer from "./adminDetails";
import userIsLogged from "./userIsLogged";
import userDetailsReducer from "./usersDetails";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  userIsLoggedIn: userIsLogged,
  admin: adminDetailsReducer,
});

export default rootReducer;
