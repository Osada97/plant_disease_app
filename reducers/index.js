import { combineReducers } from "redux";
import adminDetailsReducer from "./adminDetails";
import userDetailsReducer from "./usersDetails";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  admin: adminDetailsReducer,
});

export default rootReducer;
