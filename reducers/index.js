import { combineReducers } from "redux";
import adminIsLogged from "./adiminIsLooged";
import adminDetailsReducer from "./adminDetails";
import userIsLogged from "./userIsLogged";
import userDetailsReducer from "./usersDetails";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  userIsLoggedIn: userIsLogged,
  admin: adminDetailsReducer,
  adminIsLoggedIn: adminIsLogged,
});

export default rootReducer;
